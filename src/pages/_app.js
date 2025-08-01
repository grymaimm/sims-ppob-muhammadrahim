import '@/styles/globals.css';
import StyleGlobals from '@/styles/StyleGlobals';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Toaster } from '@/components/shadcnui/sonner';
import { useRouter } from 'next/router';
import { AppLayouts, AuthLayouts } from '@/layouts/AppLayouts';
import dynamic from 'next/dynamic';

const ProgressBar = dynamic(
  () => import('@/components/shadcnui/progress-bar'),
  { ssr: false },
);

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuthRoute =
    router.pathname === '/' || router.pathname === '/registration';

  const Layouts = isAuthRoute ? AuthLayouts : AppLayouts;

  return (
    <>
      <StyleGlobals />
      <Provider store={store}>
        <Layouts>
          <ProgressBar />
          <Component {...pageProps} />
          <Toaster />
        </Layouts>
      </Provider>
    </>
  );
}
