/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'custom-green': '#0C6355',
        },
      },
    },
    daisyui: {
      themes: false,
    },
    plugins: [
      require('daisyui'),
    ],
  }
  
  