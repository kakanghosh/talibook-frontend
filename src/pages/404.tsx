import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';
import Result from 'antd/lib/result';
import NextLink from 'next/link';
import NavBar from '../components/navbar/NavBar.component';
import { useTranslation } from 'react-i18next';
import keys from '../i18n/translations/keys';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <NavBar></NavBar>
      <Row
        style={{ height: '82vh', marginTop: '2vh', marginBottom: '1vh' }}
        align='middle'
        justify='center'
      >
        <Col>
          <Result
            status='404'
            title='404'
            subTitle={t(keys.Page_Not_Found)}
            extra={
              <Button type='primary'>
                <NextLink href='/'>
                  <a>{t(keys.Back_To_Home)}</a>
                </NextLink>
              </Button>
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default ErrorPage;
