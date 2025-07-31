import React from 'react';
import NavbarApp from './navbar/NavbarApp';
import ProfileSection from '@/modules/HomeModules/components/ProfileSection';
import { useRouter } from 'next/router';

export function AppLayouts({ children }) {
  const router = useRouter();
  const { pathname } = router;

  // Daftar halaman yang boleh menampilkan ProfileSection
  const showProfile = ['/home', '/transaction', '/topup'].includes(pathname);

  return (
    <>
      <div className='mx-auto max-w-screen-xl'>
        <main className='mx-auto flex flex-col items-center justify-between py-20'>
          <NavbarApp />
          {showProfile && <ProfileSection />}
          {children}
        </main>
      </div>
    </>
  );
}

export function AuthLayouts({ children }) {
  return (
    <>
      <div id='Auth'>{children}</div>
    </>
  );
}
