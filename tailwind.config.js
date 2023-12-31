/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js, css}",
              "./index.html"],
  theme: {
    extend: {
      height:{ 'main': "calc(100% - 64px)" },
      dropShadow:{ '1xl': "0px 0px 50px -3px rgba(204,100,204,1)" },
      fontFamily:{
        'Kdam': ['Kdam Thmor Pro'],
        'Sans': ['Sans-serif']
      }
    },
    
  },
  plugins: [],
}

