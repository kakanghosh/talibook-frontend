import { Stack } from '@chakra-ui/react';
import Navbar from '../../components/navbar/Navbar';
import ShowDistributor from '../../components/showDistributor/ShowDistributor';

function DashBoardView() {
  return (
    <Stack wrap='wrap'>
      <Navbar></Navbar>
      <ShowDistributor></ShowDistributor>
    </Stack>
  );
}

export default DashBoardView;
