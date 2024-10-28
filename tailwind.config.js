/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "node_modules/daisyui/dist/**/*.js",
    ],
    theme: {
      extend: {
        colors: {
          'custom-green': '#0C6355',
        },
        fontFamily: {
          fantasy: ['fantasy'],
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
  
  