/** @type {import('tailwindcss').Config} */
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}



// module.exports = {
//   darkMode: 'media',
//   content: [
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'primary-text-color':'var(--primary-text-color)',
//         'secondary-text-color':'var(--secondary-text-color)',
//         'primary-background-color':'var(--primary-background-color)',
//         'secondary-background-color':'var(--secondary-background-color)',
//         'tertiary-background-color':'var(--tertiary-background-color)',
//         'primary-active-color':'var(--primary-active-color)',
//         'primary-secondary-color':'var(--secondary-active-color)',
//       },
//       gridTemplateColumns:{
//         '21': 'repeat(auto-fill, minmax(96vw, 1fr))',
//         '22': 'repeat(auto-fill, minmax(48vw, 1fr))',
//       },
//       gridAutoColumns: {
//         '2fr': 'minmax(255px, 1fr)',
//       }
//     },
//   },
//   plugins: [],
// };