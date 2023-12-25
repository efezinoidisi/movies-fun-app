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
      fontFamily: {
        'ibm-mono': ['var(--font-ibm-mono)'],
      },
      colors: {
        background: '#fef0fc',
        text: '#2e2e2e',
        body: '#FEE7FA',
        main: '#FFB800',
        accent: '#8c0674',
        grey: {
          100: '#f9f9f9',
          600: '#9ca4ab',
          700: '#78828a',
        },
        cGreen: '#00925d',
        cpink: '#BE123C',
        'deep-purple': 'rgba(149, 117, 205, 0.56)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        inner: 'linear-gradient(0deg, #E6EEF8 0%, #E6EEF8 100%), #CFD8DC',
      },
      boxShadow: {
        inner:
          '4px 4px 12px 0px rgba(187, 195, 206, 0.60) inset, -4px -4px 12px 0px rgba(253, 255, 255, 0.80) inset',
        outer:
          '16px 16px 40px 0px rgba(187, 195, 206, 0.60), -16px -16px 40px 0px rgba(253, 255, 255, 0.80)',
        ml: ' 4px 4px 12px 0px rgba(187, 195, 206, 0.60), -4px -4px 12px 0px rgba(253, 255, 255, 0.80)',
        ul: '0px 10px 20px 0px rgba(140, 6, 116, 0.50)',
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
