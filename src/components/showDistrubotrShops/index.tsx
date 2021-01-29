import {
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
  Spinner,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Skeleton from 'react-loading-skeleton';
import useFetchDistributor from '../showDistributor/hooks/DistributorHook';
import TitleAction from '../titleAction';
import useShowDistributorShops from './hooks/distributorShopsHook';

const ShowDistributorShops = ({ distributorId }) => {
  const { shops } = useShowDistributorShops(distributorId);
  const { distributor } = useFetchDistributor(distributorId);
  const createShop = () => {
    console.log('Create Shop');
  };

  if (!shops || !distributor) {
    return <Skeleton height={40} count={5} />;
  }

  return (
    <>
      <TitleAction
        title='Distributor Name:'
        value={distributor.name}
        actionTitle='Create Shop'
        clickHandler={createShop}
      ></TitleAction>

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
