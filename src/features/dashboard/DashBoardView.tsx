import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Grid from 'antd/lib/grid';

import { PlusOutlined } from '@ant-design/icons';
import Typography from 'antd/lib/typography';
import NavBar from '../../components/navbar/NavBar.component';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import DistributorTable from '../../components/distributorTable/DistributorTable.component';
import CreateDistributorForm from '../../components/createDistributor/CreateDistributorForm.component';
import { useState } from 'react';
import { Card } from 'antd';

const { Title } = Typography;
const { useBreakpoint } = Grid;

function DashBoardView() {
  const { t } = useTranslation();
  const breakPoints = useBreakpoint();
  const [showCreateDistributorForm, setShowCreateDistributorForm] = useState(
    false
  );

  return (
    <div>
      <NavBar></NavBar>
      <Row
        style={{ height: '10vh', marginTop: '2vh', marginBottom: '1vh' }}
        align='middle'
      >
        <Col offset={breakPoints.xs ? 1 : 1} sm={10} xs={22}>
          <Title style={{ marginBottom: '0' }} level={4}>
            {t(keys.Distributors)}
          </Title>
        </Col>
        <Col offset={breakPoints.xs ? 1 : 7} sm={2} xs={22}>
          <Button
            type='primary'
            icon={<PlusOutlined />}
            size='large'
            disabled={showCreateDistributorForm}
            onClick={() => setShowCreateDistributorForm(true)}
          >
            {t(keys.Create_Distributor)}
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '3vh', marginBottom: '1vh' }}>
        <Col offset={breakPoints.xs ? 1 : 11} sm={10} xs={22}>
          {showCreateDistributorForm && (
            <Card>
              <CreateDistributorForm
                onCancel={() => setShowCreateDistributorForm(false)}
              ></CreateDistributorForm>
            </Card>
          )}
        </Col>
      </Row>
      <Row style={{ marginTop: '3vh', marginBottom: '1vh' }}>
        <Col offset={1} span={22}>
          <DistributorTable></DistributorTable>
        </Col>
      </Row>
    </div>
  );
}

export default DashBoardView;
