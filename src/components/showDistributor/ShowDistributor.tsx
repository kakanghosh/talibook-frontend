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
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment';
import keys from '../../i18n/translations/keys';
import CreateDistributorModal from '../createDistributor';
import TitleAction from '../titleAction';
import useShowDistributor from './hooks/ShowDistributorHook';

const ShowDistributor = () => {
  const { distributors } = useShowDistributor();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const openModal = () => {
    onOpen();
  };
  return (
    <>
      <TitleAction
        title={t(keys.Distributors)}
        value=''
        actionTitle={t(keys.Create_Distributor)}
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
              <Text fontSize='md'>{t(keys.Distributor_Name)}</Text>
            </Th>
            <Th>
              <Text fontSize='md'>{t(keys.Date)}</Text>
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
                      {t(keys.Show_Shop)}
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
