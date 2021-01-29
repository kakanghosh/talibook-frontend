import { Box, Flex, Stack } from '@chakra-ui/react';
import Navbar from '../../../components/navbar/Navbar';
import ShowDistributorShops from '../../../components/showDistrubotrShops';

const ShowShopsView = ({ distributorId }) => {
  return (
    <>
      {' '}
      <Stack wrap='wrap'>
        <Navbar></Navbar>
        <ShowDistributorShops
          distributorId={distributorId}
        ></ShowDistributorShops>
      </Stack>
    </>
  );
};

export default ShowShopsView;
