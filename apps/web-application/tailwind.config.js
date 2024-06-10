/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-text-color':'var(--primary-text-color)',
        'secondary-text-color':'var(--secondary-text-color)',
        'primary-background-color':'var(--primary-background-color)',
        'secondary-background-color':'var(--secondary-background-color)',
        'tertiary-background-color':'var(--tertiary-background-color)',
        'primary-active-color':'var(--primary-active-color)',
        'primary-secondary-color':'var(--secondary-active-color)',
      },
      gridTemplateColumns:{
        '21': 'repeat(auto-fill, minmax(96vw, 1fr))',
        '22': 'repeat(auto-fill, minmax(48vw, 1fr))',
      },
      gridAutoColumns: {
        '2fr': 'minmax(255px, 1fr)',
      }
    },
  },
  plugins: [],
};