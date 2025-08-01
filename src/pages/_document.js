import React from 'react';
import { cn } from '@/lib/utils';
import { fontSans } from '@/styles/fonts';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  return (
    <Html lang='en' className='scroll-smooth'>
      <Head>
        <meta name='author' content='Muhammad Rahim' />
        <meta name='title' content='SIMS PPOB - Muhammad Rahim' />
        <meta property='og:title' content='SIMS PPOB - Muhammad Rahim' />
        <meta property='og:image' content={`${baseUrl}bg.png`} />
        <meta property='og:image:secure_url' content={`${baseUrl}bg.png`} />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:alt' content='SIMS PPOB - Muhammad Rahim' />
        <meta property='og:image:width' content={1216} />
        <meta property='og:image:height' content={898} />
        <meta property='og:type' content='website' />
        <meta property='og:url' content={`${baseUrl}`} />
        <meta property='og:site_name' content='SIMS PPOB - Muhammad Rahim' />
        <link
          rel='preload'
          href='/bg.png'
          as='image'
          type='image/png'
          crossOrigin='anonymous'
        />
        <link rel='icon' href='/asset/Logo.png' sizes='any' />
      </Head>
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
