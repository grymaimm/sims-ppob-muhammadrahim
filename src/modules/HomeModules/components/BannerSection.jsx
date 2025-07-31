import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners } from '@/store/slices/bannerSlice';
import { ScrollArea, ScrollBar } from '@/components/shadcnui/scroll-area';
import Image from 'next/image';
import { Skeleton } from '@/components/shadcnui/skeleton';

export default function BannerSection() {
  const dispatch = useDispatch();
  const skeletonCount = 5;

  const {
    data: banners,
    loading,
    error,
  } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const renderTitle = () => {
    if (loading || error) {
      return <Skeleton className='h-4 w-[200px]' />;
    }

    return <h3 className='text-xl font-bold'>Temukan promo menarik</h3>;
  };

  const renderContent = () => {
    if (loading || error) {
      return [...Array(skeletonCount)].map((_, index) => (
        <div key={index} className='flex flex-col items-center space-y-2'>
          <Skeleton className='h-[121px] w-[270px] rounded-xl' />
        </div>
      ));
    }

    return banners.map((banner, index) => (
      <figure key={index} className='shrink-0'>
        <div className='overflow-hidden rounded-md'>
          <Image
            src={banner.banner_image}
            alt={banner.banner_name}
            width={270}
            height={121}
            className='h-[121px] w-[270px] object-cover'
          />
        </div>
      </figure>
    ));
  };

  return (
    <div className='flex flex-col gap-4 p-6'>
      {renderTitle()}

      <ScrollArea className='w-full whitespace-nowrap rounded-md'>
        <div className='flex w-max gap-2 space-x-4 pb-4'>{renderContent()}</div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}
