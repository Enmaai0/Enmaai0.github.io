/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vista-blue': '#0078d7',
        'vista-green': '#4cc265',
        'vista-accent': '#5fb2ef',
        'glass-bg': 'rgba(255, 255, 255, 0.7)',
        'glass-border': 'rgba(255, 255, 255, 0.9)',
        'glass-shadow': 'rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'vista-gradient': 'linear-gradient(to bottom, #7eb6e9, #4cc265)',
        'button-gradient': 'linear-gradient(to bottom, #f0f0f0, #e1e1e1)',
        'button-hover': 'linear-gradient(to bottom, #e9e9e9, #d5d5d5)',
        'button-active': 'linear-gradient(to bottom, #d5d5d5, #e9e9e9)',
      },
      boxShadow: {
        'vista': '0 4px 15px rgba(0, 0, 0, 0.1)',
        'vista-inset': 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'vista': '8px',
      },
    },
  },
  plugins: [],
}