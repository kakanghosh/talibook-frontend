import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SchemaOf, object, number } from 'yup';
import client from '../../../api/restClient';
import { NewTransaction, Shop } from '../../../models';
import { updateTransactionHistoryInShop } from '../../../store/slices/transactionSlice';

type CreateShopData = {
  amount: number;
  type: number;
};

const validationSchema: SchemaOf<CreateShopData> = object().shape({
  amount: number().min(1).required('Amount is required'),
  type: number().oneOf([0, 1]).required('Type is required'),
});

interface Props {
  distributorId: number;
  shopId: number;
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
