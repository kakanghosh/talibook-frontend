import Table from 'antd/lib/table';
import Button from 'antd/lib/button';
import Tag from 'antd/lib/tag';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { DeleteFilled, DeleteOutlined } from '@ant-design/icons';
import { Transaction } from '../../models';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import Moment from 'react-moment';
import useFetchTransaction from './hooks/TransactionHook';
import TransactionState from '../transactionStat/TransactionState.component';

interface Props {
  distributorId: number;
  shopId: number;
}

const TransactionsTable = (props: Props) => {
  const { transaction, deleteTransaction } = useFetchTransaction(
    props.distributorId,
    props.shopId
  );
  const { t } = useTranslation();

  const transactionType = (type: number) => {
    switch (type) {
      case 0:
        return <Tag color='#87d068'>{t(keys.Deposite)}</Tag>;
      case 1:
        return <Tag color='#f50'>{t(keys.Purchase)}</Tag>;
      default:
        return 'N/A';
    }
  };

  const columns = [
    {
      title: t(keys.Date),
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (data: Transaction) => <Moment date={data.createdAt} />,
    },
    {
      title: t(keys.Amount),
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: t(keys.Type),
      key: 'type',
      dataIndex: 'type',
      render: (type) => transactionType(type),
    },
    {
      render: (data: Transaction) => {
        return (
          <Button
            type='dashed'
            icon={<DeleteOutlined />}
            onClick={() => deleteTransaction(props.shopId, data.id)}
          />
        );
      },
    },
  ];

  return (
    <>
      <Row style={{ marginBottom: '3vh' }}>
        <Col span={24}>
          <TransactionState
            totalDeposite={transaction?.totalDeposite}
            totalPurchase={transaction?.totalPurchase}
          ></TransactionState>
        </Col>
      </Row>
      <Row style={{ marginTop: '3vh' }}>
        <Col span={24}>
          <Table
            rowKey='id'
            columns={columns}
            dataSource={transaction?.transactions}
          ></Table>
        </Col>
      </Row>
    </>
  );
};

export default TransactionsTable;