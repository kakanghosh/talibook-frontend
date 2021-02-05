import { useRouter } from 'next/router';
import ShowShopsView from '../../../../features/showShops/ShowShopsView';

const DistributorShops = () => {
  const router = useRouter();
  const { id } = router.query;

  return <>{id && <ShowShopsView distributorId={id}></ShowShopsView>}</>;
};

export default DistributorShops;
