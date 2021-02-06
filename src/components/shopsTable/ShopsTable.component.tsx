import Table from 'antd/lib/table';
import { Distributor, Shop } from '../../models';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import Moment from 'react-moment';
import useFetchDistributorShops from './hooks/FetchDistributorShopsHook';

interface Props {
  distributorId: number;
}

const ShopsTable = (props: Props) => {
  const { shops } = useFetchDistributorShops(props.distributorId);
  const { t } = useTranslation();
  const columns = [
    {
      title: t(keys.Name),
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: t(keys.Date),
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (date) => <Moment date={date} />,
    },
    {
      title: '',
      render: (data: Shop) => {
        return (
          <NextLink
            href={`/distributors/${props.distributorId}/shops/${data.id}/transaction`}
          >
            <a>{t(keys.Transactions)}</a>
          </NextLink>
        );
      },
    },
  ];

  return <Table rowKey='id' columns={columns} dataSource={shops}></Table>;
};

export default ShopsTable;
