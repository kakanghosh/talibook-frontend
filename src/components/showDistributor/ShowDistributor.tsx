import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Link,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import Moment from 'react-moment';
import CreateDistributorModal from '../createDistributor';
import TitleAction from '../titleAction';
import useShowDistributor from './hooks/ShowDistributorHook';

const ShowDistributor = () => {
  const { distributors } = useShowDistributor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = () => {
    onOpen();
  };
  return (
    <>
      <TitleAction
        title='Distributors'
        value=''
        actionTitle='Create Distributor'
        clickHandler={openModal}
      ></TitleAction>
      <CreateDistributorModal
        isOpen={isOpen}
        onClose={onClose}
      ></CreateDistributorModal>
      <Table size='sm' fontSize='xl'>
        <Thead>
          <Tr>
            <Th>
              <Text fontSize='md'>Distributor Name</Text>
            </Th>
            <Th>
              <Text fontSize='md'>Created At</Text>
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
                <Text fontSize='md'>
                  <Moment date={distributor.createdAt} />
                </Text>
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
