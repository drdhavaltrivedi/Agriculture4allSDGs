/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#1b4332',
          950: '#081c15',
        },
        sage: {
          50: '#f4f7f4',
          100: '#e5ece5',
          200: '#ccd9cc',
          300: '#a6bfa6',
          400: '#7d9f7d',
          500: '#5c805c',
          600: '#476547',
          700: '#385038',
          800: '#2f412f',
          900: '#283628',
        },
        earth: {
          50: '#faf8f5',
          100: '#f4efe6',
          200: '#e7ddcb',
          300: '#d6c4a8',
          400: '#c2a784',
          500: '#b28f68',
          600: '#a47e5b',
          700: '#89654c',
          800: '#6f5241',
          900: '#5a4336',
        },
        sdg: {
          1: '#E5243B',
          2: '#DDA63A',
          3: '#4C9F38',
          4: '#C5192D',
          5: '#FF3A21',
          6: '#26BDE2',
          7: '#FCC30B',
          8: '#A21942',
          9: '#FD6925',
          10: '#DD1367',
          11: '#FD9D24',
          12: '#BF8B2E',
          13: '#3F7E44',
          14: '#0A97D9',
          15: '#56C02B',
          16: '#00689D',
          17: '#19486A',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'card': '0 4px 20px -2px rgba(27, 67, 50, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 12px 32px -4px rgba(27, 67, 50, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
