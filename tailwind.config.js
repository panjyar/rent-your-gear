export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1945E8', // Blue from progress bar or perhaps the logo blue
          900: '#1536b3', // Darker blue for buttons
        },
        category: {
          purple: '#4C187C',
          purpleLight: '#8A2BE2'
        },
        neutral: {
          150: '#F3F4F6',
          200: '#E5E7EB',
          250: '#D1D5DB',
          700: '#374151',
          900: '#111827',
          950: '#030712'
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          150: '#E5E7EB',
          200: '#D1D5DB',
          800: '#1F2937',
          900: '#111827'
        },
        brand: {
          green: '#9EFF00',
        }
      },
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'nav': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
