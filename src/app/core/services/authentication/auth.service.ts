import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoginUser, RegisterUser } from '@model/authentication/auth.model';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { BaseReturn } from '@model/base/base.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
  ) {}

  async registerUser(registerData: RegisterUser): Promise<BaseReturn> {
    this.setLoading(true);

    try {
      const isEmailExist = await this.validateUserEmail(registerData.email);

      if (isEmailExist) {
        return { isSuccess: false, message: 'Email Sudah Terdaftar!' };
      }

      const userCredential = await this.fireAuth.createUserWithEmailAndPassword(
        registerData.email,
        registerData.password,
      );

      const user = userCredential.user;

      if (user != null) {
        await this.fireStore.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          displayName: registerData.fullName,
        });

        await user.updateProfile({
          displayName: registerData.fullName,
        });

        await user.sendEmailVerification();

        return { isSuccess: true, message: 'Register Akun Berhasil!' };
      }

      return { isSuccess: false, message: 'Register Akun Gagal!' };
    } catch (error) {
      return { isSuccess: false, message: 'Exception!' };
    } finally {
      this.setLoading(false);
    }
  }

  async loginUser(loginData: LoginUser): Promise<BaseReturn> {
    this.setLoading(true);
    try {
      const userData = await this.fireAuth.signInWithEmailAndPassword(
        loginData.email,
        loginData.password,
      );

      if (!userData.user?.emailVerified) {
        return {
          isSuccess: false,
          message: 'Verifikasi Email Terlebih Dahulu!',
        };
      }

      return { isSuccess: true, message: 'Login Account Berhasil!' };
    } catch (error) {
      return { isSuccess: false, message: 'Invalid Account!' };
    } finally {
      this.setLoading(false);
    }
  }

  async resetPasswordUser(email: string): Promise<BaseReturn> {
    try {
      await this.fireAuth.sendPasswordResetEmail(email);

      return { isSuccess: true, message: 'Password Reset Berhasil Dikirim!' };
    } catch (error) {
      return { isSuccess: false, message: 'Gagal Mengirim Reset Password!' };
    }
  }

  private async validateUserEmail(email: string): Promise<boolean> {
    const userData = this.fireStore.collection('users', (x) =>
      x.where('email', '==', email),
    );

    const userResult = await lastValueFrom(userData.get());

    return !userResult.empty;
  }

  private setLoading(status: boolean) {
    this.isLoadingSubject.next(status);
  }
}
