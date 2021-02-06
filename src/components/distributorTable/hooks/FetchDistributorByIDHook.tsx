import { useEffect, useState } from 'react';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';
import { Distributor } from '../../../models';

const useFetchDistributorById = (distributorId) => {
  const [distributor, setDistributor] = useState<Distributor>(null);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchDistributor() {
      client.defaults.headers.Authorization = `Bearer ${token}`;
      const { data } = await client.get<Distributor>(
        `api/v1/distributors/${distributorId}`
      );
      setDistributor(data);
    }
    fetchDistributor();
  }, []);

  return { distributor };
};

export default useFetchDistributorById;
