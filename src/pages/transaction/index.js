import withAuth from '@/lib/withAuth';
import TransactionModules from '@/modules/TransactionModules';

function Transaction() {
  return (
    <>
      <title>SIMS PPOB - Transaction</title>
      <TransactionModules />
    </>
  );
}

export default withAuth(Transaction);
