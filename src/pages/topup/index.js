import withAuth from '@/lib/withAuth';
import TopupModules from '@/modules/TopupModules';

function Topup() {
  return (
    <>
      <title>SIMS PPOB - Top Up</title>
      <TopupModules />
    </>
  );
}

export default withAuth(Topup);
