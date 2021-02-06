import { AxiosError } from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';
import keys from '../../../i18n/translations/keys';
import { TransactionData } from '../../../models';
import {
  deleteTransactionHistoryInShop,
  populateTransactionOfShop,
  selectTransactionByShopId,
} from '../../../store/slices/transactionSlice';

interface Props {
  distributorId: number;
  shopId: number;
  defaultDate: moment.Moment;
}

const useFetchTransaction = ({ distributorId, shopId, defaultDate }: Props) => {
  const dispatch = useDispatch();
  const transaction = useSelector(selectTransactionByShopId(shopId));
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    filterByMonthOfTheYear(defaultDate);
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

  async function filterByMonthOfTheYear(date: moment.Moment) {
    try {
      const { data } = await client.get<TransactionData>(
        `api/v1/distributors/${distributorId}/shops/${shopId}/transactions?month=${
          date.month() + 1
        }&year=${date.year()}&timeZoneOffset=${new Date().getTimezoneOffset()}`
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
      } else if (response.status == 401) {
        logout();
      }
    }
  }

  return { transaction, deleteTransaction, filterByMonthOfTheYear };
};

export default useFetchTransaction;
