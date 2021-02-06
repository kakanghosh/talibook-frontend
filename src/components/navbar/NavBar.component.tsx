import { Space } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Button from 'antd/lib/button';
import Col from 'antd/lib/col';
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';
import Typography from 'antd/lib/typography';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/auth';
import keys from '../../i18n/translations/keys';
import NextLink from 'next/link';

const { Header } = Layout;
const { Title } = Typography;

const NavBar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const avatarKeyword = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <Layout className='layout'>
      <Header>
        <Row style={{ height: '100%' }} align='middle'>
          <Col xs={12}>
            <Title style={{ color: 'white', marginBottom: '0' }} level={2}>
              <NextLink href='/'>
                <a style={{ color: 'white' }}>{t(keys.App_Name)}</a>
              </NextLink>
            </Title>
          </Col>
          <Col xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Space size={10}>
              <Avatar>{avatarKeyword}</Avatar>
              <Button style={{ color: 'white' }} type='ghost' onClick={logout}>
                {t(keys.Logout)}
              </Button>
            </Space>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default NavBar;
