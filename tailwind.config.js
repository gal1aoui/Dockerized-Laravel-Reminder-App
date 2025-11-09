/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/views/**/*.{blade,php,jsx,tsx}",
    "./resources/js/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',    // Blue
        secondary: '#6366f1',  // Indigo
      },
    },
  },
  plugins: [],
}