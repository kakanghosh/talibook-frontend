import ShowTransactionView from '../../../../../features/transaction/showTransaction';
import { useRouter } from 'next/router';
import { Stack } from '@chakra-ui/react';
import Navbar from '../../../../../components/navbar/Navbar';

const TransactionPage = () => {
  const router = useRouter();
  const { id, shopId } = router.query;
  return (
    <>
      {id && shopId && (
        <Stack wrap='wrap'>
          <Navbar></Navbar>
          <ShowTransactionView
            distributorId={id}
            shopId={shopId}
          ></ShowTransactionView>
        </Stack>
      )}
    </>
  );
};

export default TransactionPage;
