import withAuth from '@/lib/withAuth';
import AccountModels from '@/modules/AccountModules';

function Account() {
  return <AccountModels />;
}

export default withAuth(Account);
