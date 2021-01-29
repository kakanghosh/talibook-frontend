import { Box, Flex, Stack } from '@chakra-ui/react';
import Navbar from '../../../components/navbar/Navbar';
import TransactionTable from '../../../components/transactionTable';

const ShowTransactionView = ({ distributorId, shopId }) => {
  return (
    <>
      {' '}
      <Stack wrap='wrap'>
        <Navbar></Navbar>
        <TransactionTable
          distributorId={distributorId}
          shopId={shopId}
        ></TransactionTable>
      </Stack>
    </>
  );
};

export default ShowTransactionView;
