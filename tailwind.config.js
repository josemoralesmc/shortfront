/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{css,tsx}', './src/components/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms', '@heroicons/react/24/outline')],
}


