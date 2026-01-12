/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        turquoise: '#4FFFE3',
        mint: {
          light: '#A7F3D0',
          DEFAULT: '#6EE7B7',
          dark: '#059669',
        },
        slate: {
          light: '#F1F5F9',
          DEFAULT: '#1F2937',
          dark: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out forwards',
        fadeIn: 'fadeIn 1s ease-out forwards',
        blob: 'blob 8s infinite',
      },
    },
  },
  plugins: [],
}
