import ShowTransactionView from '../../../../../features/transaction/showTransaction';
import { useRouter } from 'next/router';

const TransactionPage = () => {
  const router = useRouter();
  const { id, shopId } = router.query;
  return (
    <>
      {id && shopId && (
        <ShowTransactionView
          distributorId={id}
          shopId={shopId}
        ></ShowTransactionView>
      )}
    </>
  );
};

export default TransactionPage;
