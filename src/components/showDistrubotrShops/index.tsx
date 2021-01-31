import {
  Table,
  Text,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link,
  useDisclosure,
  Flex,
  Stack,
  Box,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import Moment from 'react-moment';
import keys from '../../i18n/translations/keys';
import CreateShopModal from '../createShop';
import useFetchDistributor from '../showDistributor/hooks/DistributorHook';
import TitleAction from '../titleAction';
import useShowDistributorShops from './hooks/distributorShopsHook';

const ShowDistributorShops = ({ distributorId }) => {
  const { shops } = useShowDistributorShops(distributorId);
  const { distributor } = useFetchDistributor(distributorId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const openModal = () => {
    onOpen();
  };

  if (!shops || !distributor) {
    return <Skeleton height={40} count={5} />;
  }

  return (
    <>
      <Stack pr='5vw' pl='5vw'>
        <Box>
          <TitleAction
            title={`${t(keys.Distributor_Name)}:`}
            value={distributor.name}
            actionTitle={t(keys.Create_Shop)}
            clickHandler={openModal}
          ></TitleAction>
        </Box>
        <Box>
          <CreateShopModal
            distributorId={distributorId}
            isOpen={isOpen}
            onClose={onClose}
          ></CreateShopModal>
        </Box>
        <Box>
          <Table size='sm' fontSize='xl'>
            <Thead>
              <Tr>
                <Th>
                  <Text fontSize='xl'>{t(keys.Shop_Name)}</Text>
                </Th>
                <Th>
                  <Text fontSize='xl'>{t(keys.Date)}</Text>
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
                    <Text fontSize='md'>
                      <Moment date={shop.createdAt} />
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize='md'>
                      <NextLink
                        href={`/distributors/${distributorId}/shops/${shop.id}/transaction`}
                      >
                        <Link color='teal.500'>{t(keys.Transactions)}</Link>
                      </NextLink>
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Stack>
    </>
  );
};

export default ShowDistributorShops;
