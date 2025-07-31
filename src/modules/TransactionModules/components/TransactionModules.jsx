import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { resetSelectedService } from '@/store/slices/selectedServiceSlice'; // impor action reset
import TransactionPayment from './TransactionPayment';
import TransactionList from './TransactionList';

export default function TransactionModules() {
  const service = useSelector((state) => state.selectedService);
  const dispatch = useDispatch();
  const router = useRouter();

  // reset saat keluar dari /transaction
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (!url.startsWith('/transaction')) {
        dispatch(resetSelectedService());
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [dispatch, router]);

  return (
    <div className='flex w-full flex-col px-6'>
      {service ? <TransactionPayment service={service} /> : <TransactionList />}
    </div>
  );
}
