import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';
import { Distributor } from '../../../models';
import {
  populateDistributorList,
  selectDistributors,
} from '../../../store/slices/distributorSlice';

const useShowDistributor = () => {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const distributors = useSelector(selectDistributors);

  useEffect(() => {
    async function fetchDistributors() {
      client.defaults.headers.Authorization = `Bearer ${token}`;
      const { data } = await client.get<Distributor[]>('api/v1/distributors');
      dispatch(populateDistributorList(data));
    }
    fetchDistributors();
  }, []);

  return { distributors };
};

export default useShowDistributor;
