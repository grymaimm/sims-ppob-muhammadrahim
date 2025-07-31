import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LiaMoneyCheckAltSolid } from 'react-icons/lia';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcnui/form';
import { Input } from '@/components/shadcnui/input';
import { Button } from '@/components/shadcnui/button';

import { fetchBalance } from '@/store/slices/userSlice';
import { postTopup } from '@/store/slices/topupSlice';
import { useRouter } from 'next/router';

// Validation Schema
const TopupSchema = z.object({
  top_up_amount: z
    .string()
    .min(1, { message: 'Nominal tidak boleh kosong' })
    .transform((val) => parseInt(val))
    .refine((val) => val >= 10_000, {
      message: 'Minimum top up adalah Rp10.000',
    })
    .refine((val) => val <= 1_000_000, {
      message: 'Maksimum top up adalah Rp1.000.000',
    }),
});

export default function TopupForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.topup);

  const form = useForm({
    resolver: zodResolver(TopupSchema),
    defaultValues: {
      top_up_amount: '',
    },
    mode: 'onChange',
  });

  const isSubmitDisabled =
    !form.formState.isValid || !form.watch('top_up_amount');

  const handleSubmit = (values) => {
    dispatch(postTopup(values));
  };

  const handleQuickAmount = (amount) => {
    form.setValue('top_up_amount', amount.toString(), {
      shouldValidate: true,
    });
  };

  useEffect(() => {
    if (data) {
      toast('Top up berhasil!');
      form.reset();
      dispatch(fetchBalance());
      router.push('/topup');
    }

    if (error) {
      toast('Top up gagal: ' + (error?.message || error));
    }
  }, [data, error]);

  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      {/* Form Topup */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full space-y-4'
        >
          <FormField
            control={form.control}
            name='top_up_amount'
            render={({ field }) => (
              <FormItem>
                <div className='relative'>
                  <FormLabel className='absolute left-3 top-3'>
                    <LiaMoneyCheckAltSolid />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='0'
                      className='pl-10'
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full'
            variant='destructive'
            disabled={isSubmitDisabled || loading}
          >
            {loading ? 'Memproses...' : 'Top Up'}
          </Button>
        </form>
      </Form>

      {/* Quick Nominal Buttons */}
      <div className='grid grid-cols-3 grid-rows-2 gap-4'>
        {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
          <Button
            key={amount}
            type='button'
            variant='outline'
            className='px-6'
            onClick={() => handleQuickAmount(amount)}
          >
            Rp{amount.toLocaleString('id-ID')}
          </Button>
        ))}
      </div>
    </div>
  );
}
