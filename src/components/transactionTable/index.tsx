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
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import Moment from 'react-moment';
import keys from '../../i18n/translations/keys';
import CreateTransactionModal from '../createTransaction';
import useFetchShop from '../showDistrubotrShops/hooks/shopHook';
import TitleAction from '../titleAction';
import useFetchTransaction from './hooks/fetchTransactionHook';

const TransactionTable = ({ distributorId, shopId }) => {
  const { transaction, transactionType } = useFetchTransaction(
    distributorId,
    shopId
  );
  const { shop } = useFetchShop(distributorId, shopId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const openModal = () => {
    onOpen();
  };

  if (!transaction || !shop) {
    return <Skeleton height={40} count={5} />;
  }
  const remaining = transaction.totalPurchase - transaction.totalDeposite;

  return (
    <>
      <TitleAction
        title={`${t(keys.Shop_Name)}:`}
        value={shop.name}
        actionTitle={t(keys.Add_Transaction)}
        clickHandler={openModal}
      ></TitleAction>
      <CreateTransactionModal
        distributorId={distributorId}
        shopId={shopId}
        isOpen={isOpen}
        onClose={onClose}
      ></CreateTransactionModal>
      <Flex justifyContent='center' p='5px'>
        <Box p='5px'>
          <Stat>
            <StatLabel>{t(keys.Total_Purchase)}</StatLabel>
            <StatNumber color='#e01111'>
              &#2547; {transaction.totalPurchase}
            </StatNumber>
          </Stat>
        </Box>
        <Box p='5px'> — </Box>
        <Box p='5px'>
          <Stat>
            <StatLabel>{t(keys.Total_Deposite)}</StatLabel>
            <StatNumber color='#0ca04f'>
              &#2547; {transaction.totalDeposite}
            </StatNumber>
          </Stat>
        </Box>
        <Box p='5px'>=</Box>
        <Box p='5px'>
          <Stat>
            <StatLabel>{t(keys.Remaining)}</StatLabel>
            <StatNumber color={remaining > 0 ? '#e01111' : '#0ca04f'}>
              &#2547; {remaining}
            </StatNumber>
          </Stat>
        </Box>
      </Flex>
      <Table size='sm' fontSize='xl'>
        <Thead>
          <Tr>
            <Th>
              <Text fontSize='xl'>{t(keys.Date)}</Text>
            </Th>
            <Th>
              <Text fontSize='xl'>{t(keys.Amount)}</Text>
            </Th>
            <Th>
              <Text fontSize='xl'>{t(keys.Type)}</Text>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transaction.transactions?.map((tran) => (
            <Tr key={tran.id}>
              <Td>
                <Text fontSize='md'>
                  <Moment date={tran.createdAt} />
                </Text>
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
