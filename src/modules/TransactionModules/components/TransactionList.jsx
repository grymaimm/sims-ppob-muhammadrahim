import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/shadcnui/card';
import { fetchTransactionHistory } from '@/store/slices/historySlice';
import { Minus, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TransactionList() {
  const dispatch = useDispatch();
  const { records, loading, error } = useSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchTransactionHistory());
  }, [dispatch]);

  return (
    <div>
      <div className='flex flex-col py-6'>
        <span className='mt-4 text-xl font-semibold'>Semua Transaksi</span>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <div className='w-full space-y-6'>
        {records.map((item) => {
          const isTopup = item.transaction_type === 'TOPUP';
          const color = isTopup ? 'text-green-600' : 'text-red-600';
          const Icon = isTopup ? Plus : Minus;

          return (
            <Card key={item.invoice_number}>
              <div className='flex items-start justify-between gap-4 px-6 py-4'>
                <div className='space-y-1'>
                  <div
                    className={`flex items-center gap-2 text-xl font-semibold ${color}`}
                  >
                    <Icon size={18} />
                    <span>Rp {item.total_amount.toLocaleString()}</span>
                  </div>
                  <CardDescription>
                    {new Date(item.created_on).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    ,{' '}
                    {new Date(item.created_on).toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </CardDescription>
                </div>
                <p className='text-sm text-muted-foreground'>
                  {item.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
