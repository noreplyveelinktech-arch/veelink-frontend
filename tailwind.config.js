/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d8eeff',
          200: '#b6defe',
          300: '#85c7ff',
          400: '#49a1ff',
          500: '#0f7bff',
          600: '#0b63d0',
          700: '#0a4ea3',
          900: '#082a54',
        },
      },
      boxShadow: {
        premium: '0 24px 60px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top, rgba(59,130,246,0.14), transparent 35%), linear-gradient(135deg, rgba(15,118,110,0.08), rgba(59,130,246,0.1))',
      },
    },
  },
  plugins: [],
}
