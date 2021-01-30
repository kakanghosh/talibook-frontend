import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
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

function useCreateTransaction(
  distributorId: number,
  shopId: number,
  onClose: () => void
) {
  const [errorMessage, setErrorMessage] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const form = useFormik<CreateShopData>({
    initialValues: {
      amount: 1000,
      type: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      values.type = +values.type;
      try {
        setErrorMessage(null);
        const { data } = await client.post<NewTransaction>(
          `api/v1/distributors/${distributorId}/shops/${shopId}/transactions`,
          values
        );
        form.resetForm();
        dispatch(
          updateTransactionHistoryInShop({
            shopId,
            transactionData: data,
          })
        );
        showToast();

        if (onClose) {
          onClose();
        }
      } catch ({ response }) {
        if (response.data.statusCode == 422) {
          setErrorMessage(response.data.message);
        }
      }
    },
  });

  const showToast = () =>
    toast({
      title: 'Transaction created successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });

  const { errors, touched } = form;

  const isFormInvalid =
    Object.keys(errors).length > 0 || Object.keys(touched).length == 0;

  return {
    form,
    isFormInvalid,
    errorMessage,
  };
}

export default useCreateTransaction;
