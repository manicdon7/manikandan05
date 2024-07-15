/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}",flowbite.content()],
  theme: {
    extend: {
      colors:{
        primary:'#FF4900' ,
        secondary : '#1C2336',
        dark:'#242424',
      },
      fontFamily: {
        'sans': ['Titillium Web', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

