import NavBar from '../../components/navbar/NavBar.component';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Grid from 'antd/lib/grid';
import Card from 'antd/lib/card';
import { useTranslation } from 'react-i18next';

import { PlusOutlined } from '@ant-design/icons';
import Typography from 'antd/lib/typography';
import keys from '../../i18n/translations/keys';
import { useState } from 'react';
import CreateTransactionForm from '../../components/createTransaction/CreateTransactionForm.component';
import useFetchShop from '../../components/createTransaction/hooks/FetchShopHook';
import TransactionsTable from '../../components/transactionsTable/TransactionsTable.component';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const ShowTransactionView = ({ distributorId, shopId }) => {
  const { t } = useTranslation();
  const breakPoints = useBreakpoint();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const { shop } = useFetchShop(distributorId, shopId);

  return (
    <div>
      <NavBar></NavBar>
      <Row
        style={{ height: '10vh', marginTop: '2vh', marginBottom: '1vh' }}
        align='middle'
      >
        <Col offset={breakPoints.xs ? 1 : 1} sm={10} xs={22}>
          <Title style={{ marginBottom: '0' }} level={4}>
            {t(keys.Shop_Name)}: {shop?.name}
          </Title>
        </Col>
        <Col
          style={{
            marginTop: breakPoints.xs ? '2vh' : 0,
            display: 'flex',
            justifyContent: breakPoints.xs ? 'flex-start' : 'flex-end',
          }}
          offset={breakPoints.xs ? 1 : 2}
          sm={10}
          xs={22}
        >
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size='large'
            disabled={showTransactionForm}
            onClick={() => setShowTransactionForm(true)}
          >
            {t(keys.Create_Transaction)}
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '3vh', marginBottom: '1vh' }}>
        <Col offset={breakPoints.xs ? 1 : 11} sm={10} xs={22}>
          {showTransactionForm && (
            <Card>
              <CreateTransactionForm
                distributorId={distributorId}
                shopId={shopId}
                onCancel={() => setShowTransactionForm(false)}
              ></CreateTransactionForm>
            </Card>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: '3vh', marginBottom: '1vh' }}>
        <Col offset={1} span={22}>
          <TransactionsTable
            distributorId={distributorId}
            shopId={shopId}
          ></TransactionsTable>
        </Col>
      </Row>
    </div>
  );
};

export default ShowTransactionView;
