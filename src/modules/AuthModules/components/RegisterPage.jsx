import React, { useEffect } from 'react';
import { RegisterForm } from './RegisterForm';
import { useRouter } from 'next/router';

export default function RegisterPage() {
  const router = useRouter();

  // Redirect user jika sudah login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.replace('/home');
    }
  }, [router]);

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10'>
      <div className='w-full max-w-sm md:max-w-5xl'>
        <RegisterForm />
      </div>
    </div>
  );
}
