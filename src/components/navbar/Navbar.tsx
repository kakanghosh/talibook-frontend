import { SettingsIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spacer,
  Stack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth';

const Navbar = () => {
  const { logout, user } = useAuth();

  return (
    <Flex backgroundColor='#256'>
      <Box p='4' color='white'>
        <Heading as='h2' size='xl'>
          <Link href='/'>
            <a>Talibook</a>
          </Link>
        </Heading>
      </Box>
      <Spacer />
      <Box p='4'>
        <Flex>
          <Center>
            <Box p='5px'>
              <Wrap>
                <Avatar
                  textColor='white'
                  name={`${user.firstName} ${user.lastName}`}
                  src=''
                />
              </Wrap>
            </Box>
            <Box p='5px'>
              <Button
                size='sm'
                onClick={logout}
                leftIcon={<SettingsIcon />}
                variant='solid'
              >
                Logout
              </Button>
            </Box>
          </Center>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Navbar;
