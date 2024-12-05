/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        colorOne: "#0014dc",
        colorTwo: "#b825a4 ",
        whiteColor: "#fff"
      },
    backgroundImage: {
      'register-image': "url(https://res.cloudinary.com/dvxkeeeqs/image/upload/v1729229000/image3_1_ac1jk3.jpg)"
    }
    },
    fontFamily: {
      'play': ['Playfair Display']
    }
  },
  plugins: [],
}

