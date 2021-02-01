import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/navbar/Navbar';
import ShowShopsView from '../../../../features/distributor/showShops';

const DistributorShops = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {id && (
        <Stack wrap='wrap'>
          <Navbar></Navbar>
          <ShowShopsView distributorId={id}></ShowShopsView>
        </Stack>
      )}
    </>
  );
};

export default DistributorShops;
