import withAuth from '@/lib/withAuth';
import HomeModules from '@/modules/HomeModules';

function Home() {
  return <HomeModules />;
}

export default withAuth(Home);
