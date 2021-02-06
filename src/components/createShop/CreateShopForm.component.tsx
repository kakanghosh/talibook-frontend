import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import { Space } from 'antd';
import useCreateShop from './hooks/CreateShopHook';

interface Props {
  distributorId: number;
  onCancel?: () => void;
}

const CreateShopForm = (props: Props) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { form: createDistributorForm, errorMessage } = useCreateShop({
    distributorId: props.distributorId,
    onCancel: cancelhandler,
  });

  const {
    values,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
  } = createDistributorForm;

  function cancelhandler() {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  return (
    <Form layout='vertical' form={form} onFinish={handleSubmit}>
      <Form.Item label={t(keys.Shop_Name)} name='name'>
        <Input
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          type='text'
        />
      </Form.Item>
      <Space direction='horizontal'>
        <Form.Item>
          <Button
            type='primary'
            disabled={!(isValid && dirty)}
            htmlType='submit'
          >
            {t(keys.Create_Shop)}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={cancelhandler} danger>
            {t(keys.Cancel)}
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default CreateShopForm;
