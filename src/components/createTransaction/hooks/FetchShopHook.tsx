import { useEffect, useState } from 'react';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';
import { Shop } from '../../../models';

const useFetchShop = (distributorId, shopId) => {
  const [shop, setShop] = useState<Shop>(null);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchDistributor() {
      client.defaults.headers.Authorization = `Bearer ${token}`;
      const { data } = await client.get<Shop>(
        `api/v1/distributors/${distributorId}/shops/${shopId}`
      );
      setShop(data);
    }
    fetchDistributor();
  }, []);

  return { shop };
};

export default useFetchShop;
