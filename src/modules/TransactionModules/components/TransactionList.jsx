import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Minus, Plus } from 'lucide-react';
import { fetchTransactionHistory } from '@/store/slices/historySlice';

import { Card, CardDescription } from '@/components/shadcnui/card';
import { Skeleton } from '@/components/shadcnui/skeleton';
import { ScrollArea } from '@/components/shadcnui/scroll-area';
import { Button } from '@/components/shadcnui/button';

export default function TransactionList() {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.history);

  const LIMIT = 5;
  const [offset, setOffset] = useState(0);

  // Initial fetch
  useEffect(() => {
    dispatch(fetchTransactionHistory({ offset: 0, limit: LIMIT }));
  }, [dispatch]);

  // show more handler
  const handleShowMore = () => {
    const nextOffset = offset + LIMIT;
    dispatch(fetchTransactionHistory({ offset: nextOffset, limit: LIMIT }));
    setOffset(nextOffset);
  };

  // Render loading skeletons
  const renderSkeletons = (count = 5) =>
    Array.from({ length: count }).map((_, index) => (
      <Card key={index} className='w-full space-y-2'>
        <div className='flex items-start justify-between gap-4 px-6 py-4'>
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-8 w-[150px]' />
            <Skeleton className='h-4 w-[100px]' />
          </div>
          <Skeleton className='h-4 w-[100px]' />
        </div>
      </Card>
    ));

  // Render transaction card
  const renderTransactionCard = (item) => {
    const isTopup = item.transaction_type === 'TOPUP';
    const Icon = isTopup ? Plus : Minus;
    const colorClass = isTopup ? 'text-green-600' : 'text-red-600';

    return (
      <Card key={item.invoice_number}>
        <div className='flex items-start justify-between gap-4 px-6 py-4'>
          <div className='space-y-1'>
            <div
              className={`flex items-center gap-2 text-xl font-semibold ${colorClass}`}
            >
              <Icon size={18} />
              <span>Rp {item.total_amount.toLocaleString('id-ID')}</span>
            </div>
            <CardDescription>{formatDateTime(item.created_on)}</CardDescription>
          </div>
          <p className='text-sm text-muted-foreground'>{item.description}</p>
        </div>
      </Card>
    );
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    return `${formattedDate}, ${formattedTime}`;
  };

  return (
    <section>
      <header className='flex flex-col py-6'>
        <span className='mt-4 text-xl font-semibold'>Semua Transaksi</span>
      </header>

      {/* Loading State */}
      {loading && records.length === 0 && (
        <div className='w-full space-y-6'>{renderSkeletons()}</div>
      )}

      {/* Error State */}
      {error && <div className='w-full space-y-6'>{renderSkeletons()}</div>}

      {/* Empty State */}
      {!loading && records.length === 0 && !error && (
        <p className='mt-6 text-center text-muted-foreground'>
          Belum ada transaksi.
        </p>
      )}

      {/* Success State */}
      {!loading && records.length > 0 && (
        <>
          <ScrollArea className='h-[500px] w-full'>
            <div className='flex flex-col gap-4'>
              {records.map(renderTransactionCard)}
            </div>
          </ScrollArea>

          <div className='mt-6 flex justify-center'>
            <Button
              variant='ghost'
              onClick={handleShowMore}
              className='text-red-500 hover:text-red-600'
            >
              Show More
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
