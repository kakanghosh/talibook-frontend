import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../api/restClient';
import keys from '../../../i18n/translations/keys';
import { TransactionData } from '../../../models';
import {
  deleteTransactionHistoryInShop,
  populateTransactionOfShop,
  selectTransactionByShopId,
} from '../../../store/slices/transactionSlice';

const useFetchTransaction = (distributorId, shopId) => {
  const dispatch = useDispatch();
  const transaction = useSelector(selectTransactionByShopId(shopId));
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

  async function deleteTransaction(shopId: number, transactionId: number) {
    try {
      const { data } = await client.delete<{
        totalDeposite: number;
        totalPurchase: number;
      }>(
        `api/v1/distributors/${distributorId}/shops/${shopId}/transactions/${transactionId}`
      );

      dispatch(
        deleteTransactionHistoryInShop({
          shopId,
          transactionId,
          newTransactionState: data,
        })
      );
    } catch (error) {
      const { response } = error as AxiosError;
      if (response.status == 422) {
        router.push('/404');
      }
    }
  }

  return { transaction, deleteTransaction };
};

export default useFetchTransaction;
