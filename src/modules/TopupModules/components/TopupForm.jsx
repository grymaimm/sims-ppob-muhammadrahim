'use client';

import { Button } from '@/components/shadcnui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcnui/form';
import { Input } from '@/components/shadcnui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LiaMoneyCheckAltSolid } from 'react-icons/lia';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { postTopup } from '@/store/slices/topupSlice';

const FormSchema = z.object({
  top_up_amount: z
    .string()
    .min(1, { message: 'Nominal tidak boleh kosong' })
    .transform((val) => parseInt(val))
    .refine((val) => val >= 10000, {
      message: 'Minimum top up adalah Rp10.000',
    })
    .refine((val) => val <= 1000000, {
      message: 'Maksimum top up adalah Rp1.000.000',
    }),
});

export default function TopupForm() {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.topup);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      top_up_amount: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    dispatch(postTopup(data));
  };

  useEffect(() => {
    if (data) {
      toast('Topup berhasil!');
      form.reset();
      window.location.reload();
    }
    if (error) {
      toast('Topup gagal: ' + error?.message || error);
    }
  }, [data, error]);

  const isSubmitDisabled =
    !form.formState.isValid || !form.watch('top_up_amount');
  // Fungsi untuk handle quick button
  const handleQuickAmount = (amount) => {
    form.setValue('top_up_amount', amount.toString(), { shouldValidate: true });
  };
  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
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
                      type='number'
                      className='pl-10'
                      placeholder='0'
                      {...field}
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
            disabled={isSubmitDisabled}
          >
            Top Up
          </Button>
        </form>
      </Form>
      {/* Quick Buttons */}
      <div className='grid grid-cols-3 grid-rows-2 gap-4'>
        {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
          <Button
            type='button'
            key={amount}
            variant='outline'
            onClick={() => handleQuickAmount(amount)}
            className='px-16'
          >
            Rp{amount.toLocaleString('id-ID')}
          </Button>
        ))}
      </div>
    </div>
  );
}
