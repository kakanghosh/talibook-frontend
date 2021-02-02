import { Box, Center, Flex, Stack, Text } from '@chakra-ui/react';
import Navbar from '../components/navbar/Navbar';

const ErrorPage = () => {
  return (
    <Stack>
      <Box>
        <Navbar hideAction></Navbar>
        <Center bgColor='#001' h='88vh'>
          <Flex
            textColor='white'
            wrap='wrap'
            flexDirection='column'
            w='100%'
            alignItems='center'
          >
            <Box>
              <Text fontSize='5xl'>404</Text>
            </Box>
            <Box>
              <Text fontSize='3xl'>Page Not Found!</Text>
            </Box>
          </Flex>
        </Center>
      </Box>
    </Stack>
  );
};

export default ErrorPage;
