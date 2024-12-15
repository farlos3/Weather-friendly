/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./Home/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
         sans: ['Prompt', 'Quicksand', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '32px',   // Custom value for 4xl
        '5xl': '40px',   // Custom value for 5xl
        '6xl': '48px',   // Custom value for 6xl
        '7xl': '56px',   // Custom value for 7xl
        // Add more if needed
      },
      fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '2xl': '0px 0px 10px 4px #11121374'
      }
    },
  },
  plugins: [],
};