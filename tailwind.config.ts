import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sl: '500px',
      },
      colors: {
        body: '#0D0C0F',
        main: '#28262D',
        grey: {
          100: '#f9f9f9',
          600: '#9ca4ab',
          700: '#78828a',
        },
        cGreen: '#00925d',
        cpink: '#BE123C',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        search: 'search 2s linear 1',
        brands: 'scroll 100s linear infinite',
      },
      keyframes: {
        search: {
          '0%': { opacity: '0', transform: 'translateX(50%)' },
          '50%': { opacity: '0.5', transform: 'translateX(10%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scroll: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(calc(-200px * 20))' },
        },
      },

      width: {
        ml: 'calc(200px * 40)',
      },
    },
  },
  plugins: [],
};
export default config;
