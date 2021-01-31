import { Tag } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';
import keys from '../../../i18n/translations/keys';
import { TransactionData } from '../../../models';
import {
  populateTransactionOfShop,
  selectTransactionByShopId,
} from '../../../store/slices/transactionSlice';

const useFetchTransaction = (distributorId, shopId) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const transaction = useSelector(selectTransactionByShopId(shopId));
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchDistributor() {
      client.defaults.headers.Authorization = `Bearer ${token}`;
      const { data } = await client.get<TransactionData>(
        `api/v1/distributors/${distributorId}/shops/${shopId}/transactions`
      );
      dispatch(
        populateTransactionOfShop({
          shopId,
          transactionData: data,
        })
      );
    }
    fetchDistributor();
  }, []);

  const transactionType = (type: number) => {
    switch (type) {
      case 0:
        return (
          <Tag size='md' variant='solid' colorScheme='green'>
            {t(keys.Deposite)}
          </Tag>
        );
      case 1:
        return (
          <Tag size='md' variant='solid' colorScheme='red'>
            {t(keys.Purchase)}
          </Tag>
        );
      default:
        return 'N/A';
    }
  };

  return { transaction, transactionType };
};

export default useFetchTransaction;
