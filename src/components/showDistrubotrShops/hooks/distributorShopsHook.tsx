import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../api/restClient';
import { Shop } from '../../../models';
import {
  populateShopsInDistributor,
  selectShopsbyDistributorId,
} from '../../../store/slices/shopSlice';

const useShowDistributorShops = (distributorId) => {
  const dispatch = useDispatch();
  const shops = useSelector(selectShopsbyDistributorId(distributorId));
  const router = useRouter();

  useEffect(() => {
    async function fetchDistributor() {
      try {
        const { data } = await client.get<Shop[]>(
          `api/v1/distributors/${distributorId}/shops`
        );
        dispatch(
          populateShopsInDistributor({
            distributorId,
            shops: data,
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

  return { shops };
};

export default useShowDistributorShops;
