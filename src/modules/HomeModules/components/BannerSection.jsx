import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners } from '@/store/slices/bannerSlice';
import { ScrollArea, ScrollBar } from '@/components/shadcnui/scroll-area';
import Image from 'next/image';

export default function BannerSection() {
  const dispatch = useDispatch();
  const {
    data: banners,
    loading,
    error,
  } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  if (loading) return <p>Loading banners...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className='flex flex-col gap-4 p-6'>
        <h3 className='text-xl font-bold'>Temukan promo menarik</h3>
        <ScrollArea className='w-full whitespace-nowrap rounded-md'>
          <div className='flex w-max gap-2 space-x-4 pb-4'>
            {banners.map((banner, index) => (
              <figure key={index} className='shrink-0'>
                <div className='overflow-hidden rounded-md'>
                  <Image
                    src={banner.banner_image}
                    alt={banner.banner_name}
                    className='h-[121px] w-[270px] object-cover'
                    width={270}
                    height={121}
                  />
                </div>
              </figure>
            ))}
          </div>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
    </>
  );
}
