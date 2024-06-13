const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",              //(1)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",            //(2)
    "./components/**/*.{js,ts,jsx,tsx,mdx}",       //(3)
    'node_modules/flowbite-react/lib/esm/**/*.js', //(4)
    flowbite.content(),
  ],
  theme: {
    extend: {colors: {
      'light-green': '#606C38',
      'dark-green': '#283618',
      'sage': '#afb38c',
      'white-egg': '#FEFAE0',
      'light-orange': '#DDA15E',
      'dark-brown': '#BC6C25',
    },},
  },
  plugins: [
    require('flowbite/plugin'),               //(5)
    flowbite.plugin(),
  ],
}

