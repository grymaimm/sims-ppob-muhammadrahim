'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/shadcnui/input';
import { Button } from '@/components/shadcnui/button';
import { Card, CardContent } from '@/components/shadcnui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcnui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/slices/loginSlice';
import { useRouter } from 'next/router';

const FormSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, { message: 'Kata sandi minimal 8 karakter' }),
});

export function LoginForm({ className, ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, user, error } = useSelector((state) => state.login);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (user) {
      alert('Login berhasil!');
      router.push('/dashboard'); // ubah ke halaman yang kamu inginkan
    }
  }, [user]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 p-6 md:p-10 md:py-16'
            >
              <div className='flex flex-col gap-4'>
                <div className='mb-4 flex flex-col items-center text-center'>
                  <div className='mb-6 flex items-center justify-center gap-2'>
                    <img
                      src='/asset/Logo.png'
                      alt='logo'
                      width={28}
                      height={28}
                    />
                    <h1 className='text-lg font-semibold'>SIMS PPOB</h1>
                  </div>
                  <h5 className='text-xl font-bold leading-tight'>
                    Masuk atau buat akun <br /> untuk memulai
                  </h5>
                </div>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          type='email'
                          placeholder='Masukkan email anda'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          id='password'
                          type='password'
                          placeholder='Masukkan password anda'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  className='w-full'
                  variant='destructive'
                  disabled={loading}
                >
                  {loading ? 'Masuk...' : 'Masuk'}
                </Button>
                {error && (
                  <p className='text-center text-sm text-red-500'>{error}</p>
                )}
                <div className='text-center text-sm'>
                  Belum punya akun? registrasi{' '}
                  <Link
                    href='/registration'
                    className='font-semibold text-red-600 underline underline-offset-4'
                  >
                    disini
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className='relative hidden bg-muted md:block'>
            <img
              src='/asset/Illustrasi Login.png'
              alt='Image'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>
      <div className='*:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance text-center text-xs text-muted-foreground'>
        By clicking continue, you agree to our <a href='#'>Terms of Service</a>{' '}
        and <a href='#'>Privacy Policy</a>.
      </div>
    </div>
  );
}
