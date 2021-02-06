import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SchemaOf, object, number, date } from 'yup';
import client from '../../../api/restClient';
import { NewTransaction, Shop } from '../../../models';
import { updateTransactionHistoryInShop } from '../../../store/slices/transactionSlice';

type CreateShopData = {
  amount: number;
  type: number;
  transactionDate: Date;
  timeZoneOffset: number;
};

const validationSchema = object().shape({
  amount: number().min(1).required('Amount is required'),
  type: number().oneOf([0, 1]).required('Type is required'),
  transactionDate: date().notRequired(),
});

interface Props {
  distributorId: number;
  shopId: number;
  transactionDate: moment.Moment;
  onClose: () => void;
}

function useCreateTransaction(props: Props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const form = useFormik<CreateShopData>({
    initialValues: {
      amount: 0,
      type: 0,
      transactionDate: new Date(props.transactionDate?.toISOString()),
      timeZoneOffset: new Date().getTimezoneOffset(),
    },
    validationSchema,
    onSubmit: async (values) => {
      values.type = +values.type;
      try {
        setIsFormSubmitted(true);
        setErrorMessage(null);
        const { data } = await client.post<NewTransaction>(
          `api/v1/distributors/${props.distributorId}/shops/${props.shopId}/transactions`,
          values
        );
        form.resetForm();
        dispatch(
          updateTransactionHistoryInShop({
            shopId: props.shopId,
            transactionData: data,
          })
        );
        setIsFormSubmitted(false);
        if (props.onClose) {
          props.onClose();
        }
      } catch ({ response }) {
        setIsFormSubmitted(false);
        if (response.data.statusCode == 422) {
          setErrorMessage(response.data.message);
        }
      }
    },
  });

  return {
    form,
    errorMessage,
    isFormSubmitted,
  };
}

export default useCreateTransaction;
