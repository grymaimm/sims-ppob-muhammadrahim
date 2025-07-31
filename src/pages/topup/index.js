import withAuth from '@/lib/withAuth';
import TopupModules from '@/modules/TopupModules';

function Topup() {
  return (
    <>
      <TopupModules />
    </>
  );
}

export default withAuth(Topup);
