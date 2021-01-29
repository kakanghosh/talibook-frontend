import { useRouter } from 'next/router';
import ShowShopsView from '../../../../features/distributor/showShops';

const DistributorShops = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>{id && <ShowShopsView distributorId={id}></ShowShopsView>}</>;
};

export default DistributorShops;
