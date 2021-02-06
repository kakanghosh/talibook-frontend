import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../api/restClient';
import { Distributor } from '../../../models';
import {
  populateDistributorList,
  selectDistributors,
} from '../../../store/slices/distributorSlice';

const useFetchDistributors = () => {
  const dispatch = useDispatch();
  const distributors = useSelector(selectDistributors);
  const router = useRouter();

  useEffect(() => {
    async function fetchDistributors() {
      try {
        const { data } = await client.get<Distributor[]>('api/v1/distributors');
        dispatch(populateDistributorList(data));
      } catch (error) {
        const { response } = error as AxiosError;
        if (response.status == 422) {
          router.push('/404');
        }
      }
    }
    fetchDistributors();
  }, []);

  return { distributors };
};

export default useFetchDistributors;
