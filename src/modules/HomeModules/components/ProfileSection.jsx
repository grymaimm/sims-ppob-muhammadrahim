import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, fetchBalance } from '@/store/slices/userSlice';

export default function ProfileSection() {
  const dispatch = useDispatch();
  const { profile, balance, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <div className='flex w-full flex-col justify-between gap-6 p-6 md:flex-row'>
      {/* Profile Section */}
      <div className='flex flex-col'>
        <img
          src='/asset/Profile Photo.png'
          alt='Profile Photo'
          width={100}
          height={100}
        />
        <span className='mt-4 text-xl'>Selamat datang,</span>
        <h3 className='text-3xl font-semibold'>
          {loading
            ? 'Loading...'
            : profile?.first_name + ' ' + profile?.last_name}
        </h3>
      </div>

      {/* Saldo Section */}
      <div className='relative'>
        <img
          src='/asset/Background Saldo.png'
          alt='Background Saldo'
          className='h-full w-full rounded-xl object-cover'
        />
        <div className='absolute inset-0 flex flex-col justify-center gap-4 px-6 text-white'>
          <span className='text-xl'>Saldo anda</span>
          <h3 className='text-3xl font-bold'>
            {loading
              ? 'Loading...'
              : `Rp. ${balance?.balance?.toLocaleString('id-ID')}`}
          </h3>
          <span className='cursor-pointer text-xl underline'>Lihat saldo</span>
        </div>
      </div>
    </div>
  );
}
