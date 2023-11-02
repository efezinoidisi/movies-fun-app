import { IBM_Plex_Mono } from 'next/font/google';

export const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-mono',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  adjustFontFallback: false,
});
