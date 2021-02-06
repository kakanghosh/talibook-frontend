import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Statistic from 'antd/lib/statistic';
import { ArrowDownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';

interface Props {
  totalDeposite: number;
  totalPurchase: number;
}

const TransactionState = (props: Props) => {
  const { t } = useTranslation();
  const remaing = props.totalPurchase - props.totalDeposite;
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Statistic
          valueStyle={{ color: 'red' }}
          title={t(keys.Total_Purchase)}
          value={props.totalPurchase}
        />
      </Col>
      <Col span={8}>
        <Statistic
          valueStyle={{ color: 'green' }}
          title={t(keys.Total_Deposite)}
          value={props.totalDeposite}
        />
      </Col>
      <Col span={8}>
        <Statistic
          valueStyle={{ color: remaing > 0 ? 'red' : 'green' }}
          title={t(keys.Remaining)}
          value={remaing}
        />
      </Col>
    </Row>
  );
};

export default TransactionState;
