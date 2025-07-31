import {
  Fira_Code,
  Onest,
  // Plus_Jakarta_Sans,
  Manrope,
} from 'next/font/google';

const firaCode = Fira_Code({
  variable: '--firaCode-font',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const fontSans = Onest({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'fallback',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const onestSans = Onest({
  variable: '--onestSans-font',
  subsets: ['latin'],
  display: 'fallback',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

// const jakartaSans = Plus_Jakarta_Sans({
//   variable: "--jakartaSans-font",
//   subsets: ["latin"],
//   display: "fallback",
//   weight: ["200", "300", "400", "500", "600", "700", "800"],
// });

const manropeSans = Manrope({
  variable: '--manropeSans-font',
  subsets: ['latin'],
  display: 'fallback',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export {
  firaCode,
  onestSans,
  fontSans,
  // jakartaSans,
  manropeSans,
};
