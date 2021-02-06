import NavBar from '../../components/navbar/NavBar.component';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Grid from 'antd/lib/grid';
import Card from 'antd/lib/card';
import Typography from 'antd/lib/typography';
import { PlusOutlined } from '@ant-design/icons';

import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import useFetchDistributorById from '../../components/distributorTable/hooks/FetchDistributorByIDHook';
import ShopsTable from '../../components/shopsTable/ShopsTable.component';
import { useState } from 'react';
import CreateShopForm from '../../components/createShop/CreateShopForm.component';

const { Title } = Typography;
const { useBreakpoint } = Grid;

const ShowShopsView = ({ distributorId }) => {
  const { t } = useTranslation();
  const breakPoints = useBreakpoint();
  const { distributor } = useFetchDistributorById(distributorId);
  const [showCreateShopForm, setShowCreateShopForm] = useState(false);

  return (
    <div>
      <NavBar></NavBar>
      <Row
        style={{ height: '10vh', marginTop: '2vh', marginBottom: '1vh' }}
        align='middle'
      >
        <Col offset={breakPoints.xs ? 1 : 1} sm={10} xs={22}>
          <Title style={{ marginBottom: '0' }} level={4}>
            {t(keys.Distributor_Name)}: {distributor?.name}
          </Title>
        </Col>
        <Col offset={breakPoints.xs ? 1 : 5} sm={2} xs={22}>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size='large'
            disabled={showCreateShopForm}
            onClick={() => setShowCreateShopForm(true)}
          >
            {t(keys.Create_Shop)}
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '3vh', marginBottom: '1vh' }}>
        <Col offset={breakPoints.xs ? 1 : 11} sm={10} xs={22}>
          {showCreateShopForm && (
            <Card>
              <CreateShopForm
                distributorId={distributorId}
                onCancel={() => setShowCreateShopForm(false)}
              ></CreateShopForm>
            </Card>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: '3vh', marginBottom: '1vh' }}>
        <Col offset={1} span={22}>
          <ShopsTable distributorId={distributorId}></ShopsTable>
        </Col>
      </Row>
    </div>
  );
};

export default ShowShopsView;
