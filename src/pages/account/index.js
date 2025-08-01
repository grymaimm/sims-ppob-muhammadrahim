import withAuth from '@/lib/withAuth';
import AccountModels from '@/modules/AccountModules';

function Account() {
  return (
    <>
      <title>SIMS PPOB - Account</title>
      <AccountModels />
    </>
  );
}

export default withAuth(Account);
