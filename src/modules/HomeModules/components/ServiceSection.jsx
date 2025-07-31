import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { fetchServices } from '@/store/slices/serviceSlice';
import { setSelectedService } from '@/store/slices/selectedServiceSlice';

import { ScrollArea, ScrollBar } from '@/components/shadcnui/scroll-area';
import { Skeleton } from '@/components/shadcnui/skeleton';

export default function ServiceSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const skeletonCount = 12;

  const {
    data: services,
    loading,
    error,
  } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSelectService = (service) => {
    dispatch(setSelectedService(service));
    router.push('/transaction');
  };

  const renderSkeletons = () => {
    return [...Array(skeletonCount)].map((_, index) => (
      <div
        key={index}
        className='flex w-20 flex-col items-center space-y-2 pb-4'
      >
        <Skeleton className='size-12 rounded-lg' />
        <Skeleton className='h-4 w-14' />
      </div>
    ));
  };

  const renderServices = () => {
    return services.map((service, index) => (
      <div
        key={index}
        className='w-20 cursor-pointer'
        onClick={() => handleSelectService(service)}
      >
        <div className='overflow-hidden'>
          <Image
            src={service.service_icon}
            alt={service.service_name}
            width={48}
            height={48}
            className='mx-auto mb-2 h-12 w-12'
          />
        </div>
        <div className='whitespace-wrap text-center text-xs font-semibold text-muted-foreground'>
          {service.service_name}
        </div>
      </div>
    ));
  };

  return (
    <ScrollArea className='my-4 w-full rounded-md p-6'>
      <div className='flex w-full justify-between space-x-4'>
        {loading || error ? renderSkeletons() : renderServices()}
      </div>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
}
