import { AddIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Link,
  ButtonGroup,
  Button,
  IconButton,
  Flex,
  Spacer,
  Badge,
  Center,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import useShowDistributor from './hooks/ShowDistributorHook';

const ShowDistributor = () => {
  const { distributors } = useShowDistributor();
  return (
    <>
      <Flex p='5px'>
        <Center>
          <Badge variant='solid' colorScheme='green'>
            <Text fontSize='md'>Distributors</Text>
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
          <Button mr='-px'>Create Distributor</Button>
          <IconButton aria-label='Add to friends' icon={<AddIcon />} />
        </ButtonGroup>
      </Flex>
      <Table size='sm' fontSize='xl'>
        <Thead>
          <Tr>
            <Th>
              <Text fontSize='xl'>Distributor Name</Text>
            </Th>
            <Th>
              <Text fontSize='xl'>Created At</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {distributors.map((distributor) => (
            <Tr key={distributor.id}>
              <Td>
                <Text fontSize='md'>{distributor.name}</Text>
              </Td>
              <Td>
                <Text fontSize='md'>{distributor.createdAt}</Text>
              </Td>
              <Td>
                <Text fontSize='md'>
                  <NextLink href={`/distributors/${distributor.id}/shops`}>
                    <Link
                      color='teal.500'
                      href={`/distributors/${distributor.id}/shops`}
                    >
                      Show shops
                    </Link>
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

export default ShowDistributor;
