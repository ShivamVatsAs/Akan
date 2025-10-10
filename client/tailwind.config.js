/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom pinkish palette
        'akanksha-pink-lightest': '#FCE7F6', // Very light pink
        'akanksha-pink-lighter': '#F8C8EC',  // Lighter pink
        'akanksha-pink-light': '#F2A9E0',    // Light pink
        'akanksha-pink': '#EB8BCF',          // Main pink
        'akanksha-pink-dark': '#D46AB8',     // Darker pink
        'akanksha-pink-darkest': '#B14594',  // Very dark pink
        'akanksha-purple': '#A052AC',        // A touch of purple
        'akanksha-gold': '#FFD700',          // Gold for accents
        'akanksha-cream': '#FFFDD0',         // Creamy off-white
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'], // You'll need to import this in index.css
        'parisienne': ['Parisienne', 'cursive'], // A romantic script font
        'great-vibes': ['Great Vibes', 'cursive'], // Another elegant script
      }
    },
  },
  plugins: [],
}