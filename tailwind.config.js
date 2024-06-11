/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        "todo-primary": "#A18AFF",
        "todo-secondary": "#CA8BFE",
        "todo-background": "#F5F5F5",
        "todo-info": "#3FD4F4",
      },
    },
  },
  plugins: [],
};
