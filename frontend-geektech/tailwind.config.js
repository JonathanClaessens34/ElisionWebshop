/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparant: 'transparant', 
        'main-bg-color': '#fff',
        'main-text-color': '#000',
        'primary-color': '#1A3760',
        'button-color': '#DE3831',
        'error-color': '#DC2626',
      },
      fontFamily:{
        'Lato': "'Lato', sans-serif", 
      }
    },
  },
  plugins: [],
}