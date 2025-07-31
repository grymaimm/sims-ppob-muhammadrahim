import React from 'react';
import ServiceSection from './ServiceSection';
import BannerSection from './BannerSection';
export default function HomeModules() {
  return (
    <div className='flex w-full flex-col'>
      <ServiceSection />
      <BannerSection />
    </div>
  );
}
