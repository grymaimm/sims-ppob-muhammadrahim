import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { cn } from '@/lib/utils';
import { loginUser } from '@/store/slices/loginSlice';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/shadcnui/form';
import { Input } from '@/components/shadcnui/input';
import { Button } from '@/components/shadcnui/button';
import { Card, CardContent } from '@/components/shadcnui/card';

const formSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Kata sandi minimal 8 karakter'),
});

export function LoginForm({ className, ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, user, error } = useSelector((state) => state.login);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (user) {
      toast('Login berhasil!');
      router.push('/home');
    }
  }, [user]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardContent className='grid p-0 md:grid-cols-2'>
          {/* Form Login */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-6 p-6 md:p-10 md:py-16'
            >
              {/* Header */}
              <div className='mb-4 flex flex-col items-center text-center'>
                <div className='mb-6 flex items-center gap-2'>
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

              {/* Input Email */}
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

              {/* Input Password */}
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

              {/* Tombol Submit */}
              <Button
                type='submit'
                className='w-full'
                variant='destructive'
                disabled={loading}
              >
                {loading ? 'Masuk...' : 'Masuk'}
              </Button>

              {/* Error Message */}
              {error && (
                <p className='text-center text-sm text-red-500'>{error}</p>
              )}

              {/* Link ke registrasi */}
              <div className='text-center text-sm'>
                Belum punya akun? registrasi{' '}
                <Link
                  href='/registration'
                  className='font-semibold text-red-600 underline underline-offset-4'
                >
                  disini
                </Link>
              </div>
            </form>
          </Form>

          {/* Ilustrasi */}
          <div className='relative hidden bg-muted md:block'>
            <img
              src='/asset/Illustrasi Login.png'
              alt='Login Illustration'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms & Privacy */}
      <div className='*:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary text-balance text-center text-xs text-muted-foreground'>
        Dengan melanjutkan, Anda menyetujui <a href='#'>Syarat Layanan</a> dan{' '}
        <a href='#'>Kebijakan Privasi</a>.
      </div>
    </div>
  );
}
