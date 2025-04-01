/** @type {import('tailwindcss').Config} */

import prelinePlugin from 'preline/plugin.js';

export default {
  content: [
    "./src/*.svelte", 
    "./src/**/*.svelte", 
    "./src/**/*.html", 
    "./src/*.html",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: 'none',
  theme: {
    extend: {},
  },
  plugins: [
    prelinePlugin,
  ],
}

