import React from 'react';
import { cn } from '@/lib/utils';
import { fontSans, manropeSans } from '@/styles/fonts';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en' className='scroll-smooth'>
      <Head />
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
