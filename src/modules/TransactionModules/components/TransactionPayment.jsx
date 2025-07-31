import { Button } from '@/components/shadcnui/button';
import { Input } from '@/components/shadcnui/input';
import { Label } from '@/components/shadcnui/label';
import { postPayment } from '@/store/slices/paymentSlice';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LiaMoneyCheckAltSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function TransactionPayment({ service }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.payment);

  const onSubmit = (e) => {
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
      window.location.reload();
    } else if (error) {
      toast(error.message || 'Pembayaran gagal');
    }
  }, [data, error]);

  return (
    <div>
      <div className='flex flex-col py-6'>
        <span className='mt-4 text-xl font-semibold'>Pembayaran</span>
      </div>
      <div className='flex items-center gap-4 pb-4'>
        <Image
          src={service.service_icon}
          alt={service.service_name}
          width={34}
          height={34}
        />
        <div>
          <h2 className='text-xl font-bold'>{service.service_name}</h2>
        </div>
      </div>
      <div className='w-full'>
        <form onSubmit={onSubmit} className='flex w-full flex-col gap-4'>
          <div className='relative'>
            <Label className='absolute left-3 top-3'>
              <LiaMoneyCheckAltSolid />
            </Label>
            <Input
              name='service_code'
              className='hidden'
              value={service.service_code}
              readOnly
            />
            <Input
              name='service_tariff'
              className='pl-10 disabled:opacity-80'
              placeholder='0'
              disabled
              value={service.service_tariff}
            />
          </div>
          <Button type='submit' variant='destructive' disabled={loading}>
            {loading ? 'Memproses...' : 'Bayar'}
          </Button>
        </form>
      </div>
    </div>
  );
}
