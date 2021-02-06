import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
import notification from 'antd/lib/notification';
import Card from 'antd/lib/card';

import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import useLoginForm from './hooks/LoginFormHook';
import NextLink from 'next/link';

const LoginForm = () => {
  const formItemLayout = {};
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const {
    form: loginForm,
    showPlainPassword,
    isFormInvalid,
    loginFailed,
    tryingToLogin,
    updateShowPlainPassword,
  } = useLoginForm({
    onSuccess: onSuccessfulLogin,
  });
  const { values, handleBlur, handleChange, handleSubmit } = loginForm;

  const getEyeIconForPassword = (values: boolean) => {
    return values ? (
      <EyeInvisibleFilled onClick={updateShowPlainPassword} />
    ) : (
      <EyeFilled onClick={updateShowPlainPassword} />
    );
  };

  function onSuccessfulLogin() {
    notification.success({
      message: t(keys.Login_Succesful),
    });
  }

  return (
    <Row
      justify='center'
      align='middle'
      style={{ height: '100vh', marginLeft: '5vw', marginRight: '5vw' }}
    >
      <Col xs={24} md={10}>
        {loginFailed && (
          <Alert
            message={t(keys.Email_Password_Incorrct)}
            type='error'
            showIcon
          />
        )}
        <Card>
          <Form
            {...formItemLayout}
            layout='vertical'
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item label={t(keys.Email_Address)} name='email'>
              <Input
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                type='email'
              />
            </Form.Item>
            <Form.Item label={t(keys.Password)} name='password'>
              <Input
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                type={showPlainPassword ? 'text' : 'password'}
                suffix={getEyeIconForPassword(showPlainPassword)}
              />
            </Form.Item>

            <Input.Group compact>
              <Form.Item>
                <Button
                  loading={tryingToLogin}
                  type='primary'
                  disabled={isFormInvalid}
                  htmlType='submit'
                >
                  {t(keys.Login)}
                </Button>
              </Form.Item>
              <Form.Item>
                <NextLink href='/auth/create-account'>
                  <a>
                    <Button type='link'>{t(keys.Create_New_Account)}</Button>
                  </a>
                </NextLink>
              </Form.Item>
            </Input.Group>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
