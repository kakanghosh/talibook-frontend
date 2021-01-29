import { Tag } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';
import { TransactionData } from '../../../models';

const useFetchTransaction = (distributorId, shopId) => {
  const [transaction, setTransaction] = useState(null as TransactionData);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchDistributor() {
      client.defaults.headers.Authorization = `Bearer ${token}`;
      const { data } = await client.get<TransactionData>(
        `api/v1/distributors/${distributorId}/shops/${shopId}/transactions`
      );
      setTransaction(data);
    }
    fetchDistributor();
  }, []);

  const transactionType = (type: number) => {
    switch (type) {
      case 0:
        return (
          <Tag size='sm' variant='solid' colorScheme='green'>
            Deposite
          </Tag>
        );
      case 1:
        return (
          <Tag size='sm' variant='solid' colorScheme='red'>
            Purchase
          </Tag>
        );
      default:
        return 'N/A';
    }
  };

  return { transaction, transactionType };
};

export default useFetchTransaction;
