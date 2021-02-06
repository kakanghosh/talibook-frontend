import useFetchDistributors from './hooks/FetchDistruborData';
import Table from 'antd/lib/table';
import { Distributor } from '../../models';
import NextLink from 'next/link';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import Moment from 'react-moment';

const DistributorTable = () => {
  const { distributors } = useFetchDistributors();
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
      render: (data: Distributor) => {
        return (
          <NextLink href={`/distributors/${data.id}/shops`}>
            <a>{t(keys.Show_Shop)}</a>
          </NextLink>
        );
      },
    },
  ];

  return (
    <Table rowKey='id' columns={columns} dataSource={distributors}></Table>
  );
};

export default DistributorTable;
