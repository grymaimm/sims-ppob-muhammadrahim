import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, fetchBalance } from '@/store/slices/userSlice';
import Image from 'next/image';
import { Skeleton } from '@/components/shadcnui/skeleton';

export default function ProfileSection() {
  const dispatch = useDispatch();
  const [showBalance, setShowBalance] = useState(false);
  const { profile, balance, loading, error } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const handleToggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  if (loading || error) {
    return (
      <div className='flex w-full flex-col justify-between gap-6 p-6 md:flex-row'>
        <div className='flex flex-col'>
          <Skeleton className='size-28 rounded-full' />
          <div className='mt-4 space-y-2'>
            <Skeleton className='h-4 w-[150px]' />
            <Skeleton className='h-8 w-[200px]' />
          </div>
        </div>
        <Skeleton className='h-[183px] w-full rounded-xl md:w-[670px]' />
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col justify-between gap-6 p-6 md:flex-row'>
      <div className='flex flex-col'>
        <div className='relative size-28 w-max rounded-full border'>
          <Image
            src={
              !profile?.profile_image || profile.profile_image.includes('null')
                ? '/asset/Profile Photo.png'
                : profile.profile_image
            }
            alt='Profile Photo'
            width={112}
            height={112}
            className='size-28 rounded-full object-cover'
          />
        </div>
        <span className='mt-4 text-xl'>Selamat datang,</span>
        <h3 className='text-3xl font-semibold'>
          {profile?.first_name} {profile?.last_name}
        </h3>
      </div>

      <div className='relative'>
        <img
          src='/asset/Background Saldo.png'
          alt='Background Saldo'
          className='h-32 w-full rounded-xl object-cover md:h-full'
        />
        <div className='absolute inset-0 flex flex-col justify-center gap-2 px-6 text-white md:gap-4'>
          <span className='text-md md:text-xl'>Saldo anda</span>
          <h3 className='text-2xl font-bold md:text-3xl'>
            {showBalance
              ? `Rp. ${balance?.balance?.toLocaleString('id-ID') || '0'}`
              : 'Rp. ******'}
          </h3>
          <span
            className='text-md cursor-pointer underline md:text-xl'
            onClick={handleToggleBalance}
          >
            {showBalance ? 'Sembunyikan saldo' : 'Lihat saldo'}
          </span>
        </div>
      </div>
    </div>
  );
}
