/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",              //(1)
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",            //(2)
    "./components/**/*.{js,ts,jsx,tsx,mdx}",       //(3)
    'node_modules/flowbite-react/lib/esm/**/*.js', //(4)
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),               //(5)
  ],
}

