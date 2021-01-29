import { useEffect, useState } from 'react';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';

const useShowDistributorShops = (distributorId) => {
  const [shops, setShops] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchDistributor() {
      client.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: shops } = await client.get(
        `api/v1/distributors/${distributorId}/shops`
      );
      setShops(shops);
    }
    fetchDistributor();
  }, []);

  return { shops };
};

export default useShowDistributorShops;
