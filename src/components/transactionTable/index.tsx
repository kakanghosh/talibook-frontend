import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Box,
  Spinner,
} from '@chakra-ui/react';
import Skeleton from 'react-loading-skeleton';
import useFetchShop from '../showDistrubotrShops/hooks/shopHook';
import TitleAction from '../titleAction';
import useFetchTransaction from './hooks/fetchTransactionHook';

const TransactionTable = ({ distributorId, shopId }) => {
  const { transaction, transactionType } = useFetchTransaction(
    distributorId,
    shopId
  );
  const { shop } = useFetchShop(distributorId, shopId);

  const addTransaction = () => {
    console.log('addTransaction');
  };

  if (!transaction || !shop) {
    return <Skeleton height={40} count={5} />;
  }

  return (
    <>
      <TitleAction
        title='Shop Name:'
        value={shop.name}
        actionTitle='Add Transaction'
        clickHandler={addTransaction}
      ></TitleAction>
      <Flex justifyContent='flex-end'>
        <Box p='5px'>
          <Stat>
            <StatLabel>Total Purchase</StatLabel>
            <StatNumber>&#2547; {transaction.totalPurchase}</StatNumber>
          </Stat>
        </Box>
        <Box p='5px'>-</Box>
        <Box p='5px'>
          <Stat>
            <StatLabel>Total Deposite</StatLabel>
            <StatNumber>&#2547; {transaction.totalDeposite}</StatNumber>
          </Stat>
        </Box>
        <Box p='5px'>=</Box>
        <Box p='5px'>
          <Stat>
            <StatLabel>Remaining</StatLabel>
            <StatNumber>
              &#2547; {transaction.totalPurchase - transaction.totalDeposite}
            </StatNumber>
          </Stat>
        </Box>
      </Flex>
      <Table size='sm' fontSize='xl'>
        <Thead>
          <Tr>
            <Th>
              <Text fontSize='xl'>Date</Text>
            </Th>
            <Th>
              <Text fontSize='xl'>Amount</Text>
            </Th>
            <Th>
              <Text fontSize='xl'>Type</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transaction.transactions?.map((tran) => (
            <Tr key={tran.id}>
              <Td>
                <Text fontSize='md'>{tran.createdAt}</Text>
              </Td>
              <Td>
                <Text fontSize='md'>&#2547; {tran.amount}</Text>
              </Td>
              <Td>
                <Text fontSize='md'>{transactionType(tran.type)}</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default TransactionTable;
