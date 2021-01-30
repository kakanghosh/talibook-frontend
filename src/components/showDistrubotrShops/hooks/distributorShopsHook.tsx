import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';
import { Shop } from '../../../models';
import {
  populateShopsInDistributor,
  selectShops,
} from '../../../store/slices/shopSlice';

const useShowDistributorShops = (distributorId) => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const distributorShops = useSelector(selectShops);
  const distributor = distributorShops.find(
    (ds) => ds.distributorId === distributorId
  );
  const shops = distributor?.shops;

  useEffect(() => {
    async function fetchDistributor() {
      client.defaults.headers.Authorization = `Bearer ${token}`;
      const { data } = await client.get<Shop[]>(
        `api/v1/distributors/${distributorId}/shops`
      );
      dispatch(
        populateShopsInDistributor({
          distributorId,
          shops: data,
        })
      );
    }
    fetchDistributor();
  }, []);

  return { shops };
};

export default useShowDistributorShops;
