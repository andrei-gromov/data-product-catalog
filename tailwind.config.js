/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Если у вас есть HTML-файл в корне
    "./src/**/*.{js,ts,jsx,tsx}", // Это основная строка, она указывает на все JS/TS/JSX/TSX файлы в папке src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}