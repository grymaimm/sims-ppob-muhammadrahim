import withAuth from '@/lib/withAuth';
import HomeModules from '@/modules/HomeModules';

function Home() {
  return (
    <>
      <title>SIMS PPOB - Home</title>
      <HomeModules />
    </>
  );
}

export default withAuth(Home);
