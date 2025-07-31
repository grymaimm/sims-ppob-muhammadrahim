// components/forms/RegisterForm.jsx

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { registerUser, resetState } from '@/store/slices/registerSlice';

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

// Validasi form menggunakan Zod
const FormSchema = z
  .object({
    first_name: z.string().nonempty('Nama depan wajib diisi'),
    last_name: z.string().nonempty('Nama belakang wajib diisi'),
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(8, 'Kata sandi minimal 8 karakter'),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirm_password'],
  });

export function RegisterForm({ className, ...props }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, success, error } = useSelector((state) => state.register);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  // Submit form
  const onSubmit = (data) => {
    const { confirm_password, ...payload } = data;
    dispatch(registerUser(payload));
  };

  // Redirect setelah registrasi berhasil
  useEffect(() => {
    if (success) {
      toast('Registrasi berhasil! Silakan login.');
      dispatch(resetState());
      setTimeout(() => router.push('/'), 2000);
    }
  }, [success, dispatch, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className='overflow-hidden p-0'>
        <CardContent className='grid p-0 md:grid-cols-2'>
          {/* Form Section */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6 p-6 md:p-10 md:py-16'
            >
              <div className='flex flex-col gap-4'>
                {/* Header */}
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
                    Lengkapi data untuk <br /> membuat akun
                  </h5>
                </div>

                {/* Input Fields */}
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                  <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Depan</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Nama depan anda' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Belakang</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Nama belakang anda' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          {...field}
                          placeholder='Email anda'
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
                          type='password'
                          {...field}
                          placeholder='Password anda'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='confirm_password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          {...field}
                          placeholder='Ulangi password anda'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type='submit'
                  className='w-full'
                  variant='destructive'
                  disabled={loading}
                >
                  {loading ? 'Mendaftarkan...' : 'Daftar'}
                </Button>

                {/* Error Message */}
                {error && (
                  <p className='text-center text-sm text-red-500'>{error}</p>
                )}

                {/* Link ke Login */}
                <div className='text-center text-sm'>
                  Sudah punya akun? Login{' '}
                  <Link
                    href='/'
                    className='font-semibold text-red-600 underline underline-offset-4'
                  >
                    disini
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          {/* Image Section */}
          <div className='relative hidden bg-muted md:block'>
            <img
              src='/asset/Illustrasi Login.png'
              alt='Ilustrasi'
              className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
          </div>
        </CardContent>
      </Card>

      {/* Terms of Service */}
      <div className='*:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary text-center text-xs text-muted-foreground'>
        Dengan mendaftar, Anda menyetujui <a href='#'>Syarat & Ketentuan</a> dan{' '}
        <a href='#'>Kebijakan Privasi</a>.
      </div>
    </div>
  );
}
