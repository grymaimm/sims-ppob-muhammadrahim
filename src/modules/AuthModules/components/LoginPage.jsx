import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LoginForm } from './LoginForm';

export default function LoginPage() {
  const router = useRouter();

  // Redirect user jika sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/home');
    }
  }, [router]);

  return (
    <section className='flex min-h-svh items-center justify-center bg-muted px-6 py-10'>
      <div className='w-full max-w-sm md:max-w-3xl'>
        <LoginForm />
      </div>
    </section>
  );
}
