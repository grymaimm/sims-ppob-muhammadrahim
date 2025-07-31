import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { LiaMoneyCheckAltSolid } from 'react-icons/lia';

import { Button } from '@/components/shadcnui/button';
import { Input } from '@/components/shadcnui/input';
import { Label } from '@/components/shadcnui/label';
import { postPayment } from '@/store/slices/paymentSlice';

export default function TransactionPayment({ service }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, data, error } = useSelector((state) => state.payment);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      service_code: service.service_code,
      service_tariff: service.service_tariff,
    };

    dispatch(postPayment(payload));
  };

  useEffect(() => {
    if (data) {
      toast(data.message || 'Pembayaran berhasil');
      router.reload();
    }
    if (error) {
      toast(error.message || 'Pembayaran gagal');
    }
  }, [data, error, router]);

  return (
    <section>
      <div className='flex flex-col py-6'>
        <h1 className='mt-4 text-xl font-semibold'>Pembayaran</h1>
      </div>

      {/* Service Info */}
      <div className='flex items-center gap-4 pb-4'>
        <Image
          src={service.service_icon}
          alt={service.service_name}
          width={34}
          height={34}
        />
        <h2 className='text-xl font-bold'>{service.service_name}</h2>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className='flex w-full flex-col gap-4'>
        <Input
          name='service_code'
          value={service.service_code}
          readOnly
          className='hidden'
        />

        <div className='relative'>
          <Label className='absolute left-3 top-3'>
            <LiaMoneyCheckAltSolid />
          </Label>
          <Input
            name='service_tariff'
            value={service.service_tariff}
            disabled
            className='pl-10 disabled:opacity-80'
            placeholder='0'
          />
        </div>

        {/* Submit button */}
        <Button type='submit' variant='destructive' disabled={loading}>
          {loading ? 'Memproses...' : 'Bayar'}
        </Button>
      </form>
    </section>
  );
}
