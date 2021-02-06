import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Alert from 'antd/lib/alert';
import notification from 'antd/lib/notification';
import Card from 'antd/lib/card';
import Grid from 'antd/lib/grid';

import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import useCreateAccountForm from './hooks/CreateAccountFormHook';
import styles from './CreateAccountForm.module.scss';
import NextLink from 'next/link';

const { useBreakpoint } = Grid;

const CreateAccountForm = () => {
  const formItemLayout = {};
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const {
    form: createAccountForm,
    plainPassword,
    plainRepassword,
    isFormInValid,
    submitForm,
    errorMessage,
    togglePlainPassword,
    togglePlainRePassword,
  } = useCreateAccountForm({
    onSuccess: onSuccessUserCreation,
  });
  const { values, handleBlur, handleChange, handleSubmit } = createAccountForm;
  const screens = useBreakpoint();

  const getEyeIconForPassword = (values: boolean) => {
    return values ? (
      <EyeInvisibleFilled onClick={togglePlainPassword} />
    ) : (
      <EyeFilled onClick={togglePlainPassword} />
    );
  };

  const getEyeIconForRePassword = (values: boolean) => {
    return values ? (
      <EyeInvisibleFilled onClick={togglePlainRePassword} />
    ) : (
      <EyeFilled onClick={togglePlainRePassword} />
    );
  };

  function onSuccessUserCreation() {
    notification.success({
      message: t(keys.Account_Creation_Successful),
    });
  }

  return (
    <Row justify='center' align='middle' className={styles.create_account}>
      <Col>
        <Card>
          {errorMessage && (
            <Alert message={errorMessage} type='error' showIcon />
          )}
          <Form
            {...formItemLayout}
            layout='vertical'
            form={form}
            onFinish={handleSubmit}
          >
            <Input.Group compact={!screens.xs}>
              <Form.Item
                label={t(keys.First_Name)}
                name='firstName'
                className={styles['ant-form-item']}
              >
                <Input
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                label={t(keys.Last_Name)}
                name='lastName'
                className={styles['ant-form-item']}
              >
                <Input
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Form.Item>
            </Input.Group>
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
                type={plainPassword ? 'text' : 'password'}
                suffix={getEyeIconForPassword(plainPassword)}
              />
            </Form.Item>
            <Form.Item label={t(keys.Re_Password)} name='repassword'>
              <Input
                value={values.repassword}
                onBlur={handleBlur}
                onChange={handleChange}
                type={plainRepassword ? 'text' : 'password'}
                suffix={getEyeIconForRePassword(plainRepassword)}
              />
            </Form.Item>
            <Input.Group compact>
              <Form.Item>
                <Button
                  loading={submitForm}
                  type='primary'
                  disabled={isFormInValid}
                  htmlType='submit'
                >
                  {t(keys.Create_Account)}
                </Button>
              </Form.Item>
              <Form.Item>
                <NextLink href='/auth/login'>
                  <a>
                    <Button type='link'>
                      {t(keys.Already_Have_An_Account)}
                    </Button>
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

export default CreateAccountForm;
