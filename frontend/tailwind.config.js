/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'starnox-primary': '#6b46c1',   // Purple accent for Starnox (inspired by Starry Night)
        'starnox-secondary': '#ecc94b', // Yellow accent for Starnox (comic book feel)
        'starnox-dark': '#1a202c',      // Dark blue/black for main text/backgrounds
        'starnox-light': '#f0f2f5',     // Light background for general pages
        'starnox-text-dark': '#333',    // General dark text
        'starnox-text-light': '#fff',   // General light text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Set Inter as default sans-serif font
        hero: ['Bebas Neue', 'sans-serif'], // Example for a heroic font (you'd need to import this via Google Fonts or similar)
      },
      backgroundImage: {
        'hero-pattern': "url('/images/bg_starnox.png')", // Path to your background image in public/images
      },
      boxShadow: {
        'hero-glow': '0 0 15px rgba(107, 70, 193, 0.6)', // Purple glow effect
        'hero-yellow-glow': '0 0 15px rgba(236, 201, 75, 0.6)', // Yellow glow effect
      }
    },
  },
  plugins: [],
}
