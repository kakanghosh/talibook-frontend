import { useAuth } from '../../contexts/auth';
import { Stack, Button } from '@chakra-ui/react';
import { ArrowLeftIcon } from '@chakra-ui/icons';

const DashBoardlayout = ({ children }) => {
  const { logout } = useAuth();
  return (
    <div>
      <Stack direction='row' spacing={4}>
        <Button
          onClick={logout}
          leftIcon={<ArrowLeftIcon />}
          colorScheme='pink'
          variant='solid'
        >
          Logout
        </Button>
      </Stack>
      {children}
    </div>
  );
};

export default DashBoardlayout;
