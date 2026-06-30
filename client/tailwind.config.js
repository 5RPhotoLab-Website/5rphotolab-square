/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBackground: "#7FFF00",
        purple: "#8a2be2",
        pink: "#ff1493",
        whiteCustom: "#f5f5f5",
        blue: "#01B2FE",
        orange: "#FF5C2C",
        priceTitleBlue: "#095290",
        yellow: "#FFD101",
      },
      fontFamily: {
        bubblicious: ["Bubblicious", "sans-serif"],
        futura: ["Futura", "sans-serif"],
        futuraMaxi: ["Futura Maxi CG Bold", "sans-serif"],
        futurabt: ["FuturaBT-Medium", "sans-serif"],
      },
      borderColor: {
        main: "rgba(0, 0, 0, 1)",
        contact: "#095290",
      },
      clipPath: {
        buttonPolygon: "polygon(95% 0%, 80% 50%, 95% 100%, 25% 100%, 5% 50%, 25% 0%)",
      },
    },
  },
  plugins: [require('tailwind-clip-path'), require('tailwind-scrollbar'),],
}
