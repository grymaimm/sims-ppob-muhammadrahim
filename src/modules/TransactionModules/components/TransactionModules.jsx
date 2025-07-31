import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { resetSelectedService } from '@/store/slices/selectedServiceSlice';
import TransactionPayment from './TransactionPayment';
import TransactionList from './TransactionList';

export default function TransactionModules() {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedService = useSelector((state) => state.selectedService);

  // Reset selected service jika keluar dari halaman /transaction
  useEffect(() => {
    const handleRouteChange = (url) => {
      const isTransactionRoute = url.startsWith('/transaction');
      if (!isTransactionRoute) {
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
      {selectedService ? (
        <TransactionPayment service={selectedService} />
      ) : (
        <TransactionList />
      )}
    </div>
  );
}
