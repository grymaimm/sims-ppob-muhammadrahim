import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '@/store/slices/serviceSlice';
import { ScrollArea, ScrollBar } from '@/components/shadcnui/scroll-area';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { setSelectedService } from '@/store/slices/selectedServiceSlice';

export default function ServiceSection() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { services, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSelectService = (service) => {
    dispatch(setSelectedService(service));
    router.push('/transaction');
  };

  if (loading) return <p>Loading layanan...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <ScrollArea className='my-4 w-full rounded-md p-6'>
        <div className='flex w-full justify-between space-x-4'>
          {services.map((item) => (
            <div
              key={item.service_code}
              className='w-20 cursor-pointer'
              onClick={() => handleSelectService(item)}
            >
              <div className='overflow-hidden'>
                <Image
                  src={item.service_icon}
                  alt={item.service_name}
                  className='mx-auto mb-2 h-12 w-12'
                  width={48}
                  height={48}
                />
              </div>
              <div className='whitespace-wrap text-center text-xs font-semibold text-muted-foreground'>
                {item.service_name}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </>
  );
}
