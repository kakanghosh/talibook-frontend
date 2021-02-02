import { Tag } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../api/restClient';
import keys from '../../../i18n/translations/keys';
import { TransactionData } from '../../../models';
import {
  populateTransactionOfShop,
  selectTransactionByShopId,
} from '../../../store/slices/transactionSlice';

const useFetchTransaction = (distributorId, shopId) => {
  const dispatch = useDispatch();
  const transaction = useSelector(selectTransactionByShopId(shopId));
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    async function fetchDistributor() {
      try {
        const { data } = await client.get<TransactionData>(
          `api/v1/distributors/${distributorId}/shops/${shopId}/transactions`
        );
        dispatch(
          populateTransactionOfShop({
            shopId,
            transactionData: data,
          })
        );
      } catch (error) {
        const { response } = error as AxiosError;
        if (response.status == 422) {
          router.push('/404');
        }
      }
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
