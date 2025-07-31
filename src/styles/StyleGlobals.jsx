import { firaCode, fontSans, manropeSans } from '@/styles/fonts';

export default function StyleGlobals() {
  return (
    <style jsx global>{`
      html {
        --firaCode-font: ${firaCode.style.fontFamily};
        --font-sans: ${fontSans.style.fontFamily};
      }
    `}</style>
  );
}
