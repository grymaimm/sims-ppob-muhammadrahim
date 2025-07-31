import withAuth from '@/lib/withAuth';
import TransactionModules from '@/modules/TransactionModules';

function Transaction() {
  return <TransactionModules />;
}

export default withAuth(Transaction);
