import { useEffect, useState } from 'react';
import client from '../../../api/restClient';
import { useAuth } from '../../../contexts/auth';

const useShowDistributor = () => {
  const [distributors, setDistributors] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchDistributor() {
      client.defaults.headers.Authorization = `Bearer ${token}`;
      const { data: distributors } = await client.get('api/v1/distributors');
      setDistributors(distributors);
    }
    fetchDistributor();
  }, []);

  return { distributors };
};

export default useShowDistributor;
