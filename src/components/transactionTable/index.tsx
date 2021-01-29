import { AddIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Tag,
  Stat,
  StatLabel,
  StatNumber,
  Flex,
  Box,
  Spinner,
  Center,
  Badge,
  Spacer,
  ButtonGroup,
  Button,
  IconButton,
} from '@chakra-ui/react';
import useFetchShop from '../showDistrubotrShops/hooks/shopHook';
import useFetchTransaction from './hooks/fetchTransactionHook';

const TransactionTable = ({ distributorId, shopId }) => {
  const { transaction, transactionType } = useFetchTransaction(
    distributorId,
    shopId
  );
  const { shop } = useFetchShop(distributorId, shopId);

  if (!transaction || !shop) {
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    );
  }

  return (
    <>
      <Flex p='5px' wrap='wrap'>
        <Center p='3px'>
          <Text textTransform='initial' fontSize='xl' m='3px'>
            {' '}
            Shop Name:
          </Text>
          <Badge variant='solid' colorScheme='green'>
            <Text textTransform='initial' fontSize='md'>
              {shop.name}
            </Text>
          </Badge>
        </Center>
        <Spacer></Spacer>
        <ButtonGroup
          size='sm'
          isAttached
          variant='outline'
          colorScheme='green'
          onClick={() => {
            alert('You clicked');
          }}
        >
          <Button mr='-px'>Add Transaction</Button>
          <IconButton aria-label='Add to friends' icon={<AddIcon />} />
        </ButtonGroup>
      </Flex>
      <Flex justifyContent='flex-end'>
        <Box p='5px'>
          <Stat>
            <StatLabel>Total Deposite</StatLabel>
            <StatNumber>&#2547; {transaction.totalDeposite}</StatNumber>
          </Stat>
        </Box>
        <Box p='5px'>-</Box>
        <Box p='5px'>
          <Stat>
            <StatLabel>Total Purchase</StatLabel>
            <StatNumber>&#2547; {transaction.totalPurchase}</StatNumber>
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
