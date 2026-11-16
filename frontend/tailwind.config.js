/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        implex: {
          blue: '#1d4ed8',
          darkblue: '#1e3a8a',
          navy: '#172554',
          orange: '#f97316',
          red: '#dc2626',
          emerald: '#16a34a',
        }
      },
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
