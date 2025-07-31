import React from 'react';
import NavbarApp from './navbar/NavbarApp';
import ProfileSection from '@/modules/HomeModules/components/ProfileSection';

export function AppLayouts({ children }) {
  return (
    <>
      <div className='mx-auto max-w-screen-xl'>
        <main className='mx-auto flex flex-col items-center justify-between py-20'>
          <NavbarApp />
          <ProfileSection />
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
