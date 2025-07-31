import TopupForm from './TopupForm';

export default function TopupModules() {
  return (
    <>
      <div className='flex w-full flex-col px-6'>
        <div className='flex flex-col py-6'>
          <span className='mt-4 text-xl'>Silahkan masukan</span>
          <h3 className='text-3xl font-semibold'>Nominal Top Up</h3>
        </div>
        <TopupForm />
      </div>
    </>
  );
}
