import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import { Space } from 'antd';
import useCreateTransaction from './hooks/CreateTransactionHook';
import moment from 'moment';

const { Option } = Select;

interface Props {
  distributorId: number;
  shopId: number;
  transactionDate: moment.Moment;
  onCancel: () => void;
}

const CreateTransactionForm = (props: Props) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { form: trnasactionForm, isFormSubmitted } = useCreateTransaction({
    distributorId: props.distributorId,
    shopId: props.shopId,
    transactionDate: props.transactionDate,
    onClose: cancelhandler,
  });

  const {
    values,
    isValid,
    dirty,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = trnasactionForm;

  function cancelhandler() {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  return (
    <Form
      initialValues={{
        ...values,
        type: values.type.toString(),
      }}
      layout='vertical'
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item label={t(keys.Amount)} name='amount'>
        <Input
          value={values.amount}
          onBlur={handleBlur}
          onChange={handleChange}
          type='number'
        />
      </Form.Item>
      <Form.Item label={t(keys.Type)} name='type'>
        <Select value={values.type} onChange={(e) => setFieldValue('type', e)}>
          <Option value='0'>{t(keys.Deposite)}</Option>
          <Option value='1'>{t(keys.Purchase)}</Option>
        </Select>
      </Form.Item>
      <Space direction='horizontal'>
        <Form.Item>
          <Button
            type='primary'
            disabled={!(isValid && dirty)}
            htmlType='submit'
            loading={isFormSubmitted}
          >
            {t(keys.Create_Transaction)}
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

export default CreateTransactionForm;
