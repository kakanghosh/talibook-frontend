import { AddIcon } from '@chakra-ui/icons';
import {
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
  Flex,
  Center,
  Badge,
  Spacer,
  ButtonGroup,
  Button,
  IconButton,
  Spinner,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import useFetchDistributor from '../showDistributor/hooks/DistributorHook';
import useShowDistributorShops from './hooks/distributorShopsHook';

const ShowDistributorShops = ({ distributorId }) => {
  const { shops } = useShowDistributorShops(distributorId);
  const { distributor } = useFetchDistributor(distributorId);

  if (!shops || !distributor) {
    return (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    );
  }

  return (
    <>
      <Flex p='5px' wrap='wrap'>
        <Center p='3px'>
          <Text textTransform='initial' fontSize='xl' m='3px'>
            {' '}
            Distributor Name:
          </Text>
          <Badge variant='solid' colorScheme='green'>
            <Text textTransform='initial' fontSize='md'>
              {distributor.name}
            </Text>
          </Badge>
        </Center>
        <Spacer></Spacer>
        <ButtonGroup
          size='sm'
          isAttached
          variant='outline'
          colorScheme='green'
          onClick={() => {
            alert('You clicked');
          }}
        >
          <Button mr='-px'>Create Shop</Button>
          <IconButton aria-label='Add to friends' icon={<AddIcon />} />
        </ButtonGroup>
      </Flex>

      <Table size='sm' fontSize='xl'>
        <Thead>
          <Tr>
            <Th>
              <Text fontSize='xl'>Shop Name</Text>
            </Th>
            <Th>
              <Text fontSize='xl'>Created At</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {shops.map((shop) => (
            <Tr key={shop.id}>
              <Td>
                <Text fontSize='md'>{shop.name}</Text>
              </Td>
              <Td>
                <Text fontSize='md'>{shop.createdAt}</Text>
              </Td>
              <Td>
                <Text fontSize='md'>
                  <NextLink
                    href={`/distributors/${distributorId}/shops/${shop.id}/transaction`}
                  >
                    <Link color='teal.500'>Show Transactions</Link>
                  </NextLink>
                </Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default ShowDistributorShops;
