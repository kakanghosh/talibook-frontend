import { Table, Thead, Tr, Th, Tbody, Td, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import TitleAction from '../titleAction';
import useShowDistributor from './hooks/ShowDistributorHook';

const ShowDistributor = () => {
  const { distributors } = useShowDistributor();
  const createDistributor = () => {
    console.log('createDistributor');
  };
  return (
    <>
      <TitleAction
        title='Distributors'
        value=''
        actionTitle='Create Distributor'
        clickHandler={createDistributor}
      ></TitleAction>
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
