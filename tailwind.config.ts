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
        background: '#0e2439',
        text: '#98B3CD',
        body: '#19334C',
        main: '#FFB800',
        accent: 'rgb(39,114,189)',
        dull: '#2E4D6B',
        dullText: 'A6CDF2',
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
        zl: 'rgba(255, 184, 0, 0.24) 0px 3px 8px',
        cl: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        al: 'rgba(152 ,179 ,205, 0.4) 0px 2px 4px, rgba(152, 179, 205, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
      },
      animation: {
        search: 'search 2s linear 1',
        brands: 'scroll 100s linear infinite',
        loader1: 'loader1 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite',
        heart: 'heart 1.2s 1 cubic-bezier(0.215, 0.61, 0.355, 1)',
        ring: 'ring 1.2s linear infinite',
        slideIn: 'slideIn 2s linear 1',
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
        loader1: {
          '0%': { top: '8px', height: '64px' },
          '50%': { top: '24px', height: '32px' },
          '100%': { top: '24px', height: '32px' },
        },
        heart: {
          '0%': { transform: 'scale(0.95)' },
          '5%': { transform: 'scale(1.1)' },
          '39%': { transform: 'scale(0.85)' },
          '45%': { transform: 'scale(1)' },
          '60%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(0.9)' },
        },
        ring: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slideIn: {
          '0%': { width: '0%', opacity: '0', transform: 'translateX(-50%)' },
          '50%': { width: '50%', opacity: '0.5' },
          '100%': { width: '100%', opacity: '1' },
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
