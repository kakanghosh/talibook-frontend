import { Stack } from '@chakra-ui/react';
import Navbar from '../components/navbar/Navbar';
import DashBoardView from '../features/dashboardView/DashBoardView';

function Index() {
  return (
    <Stack wrap='wrap'>
      <Navbar></Navbar>
      <DashBoardView></DashBoardView>
    </Stack>
  );
}

export default Index;
