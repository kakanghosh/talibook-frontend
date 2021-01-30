import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SchemaOf, object, string } from 'yup';
import client from '../../../api/restClient';
import { Distributor, Shop } from '../../../models';
import { addShopInDistributor } from '../../../store/slices/shopSlice';

type CreateShopData = {
  name: string;
};

const validationSchema: SchemaOf<CreateShopData> = object().shape({
  name: string().trim().required('Name is required'),
});

function useCreateShop(distributorId: number, onClose: () => void) {
  const [errorMessage, setErrorMessage] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const form = useFormik<CreateShopData>({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setErrorMessage(null);
        const { data } = await client.post<Shop>(
          `api/v1/distributors/${distributorId}/shops`,
          values
        );
        form.resetForm();
        dispatch(
          addShopInDistributor({
            distributorId,
            shop: data,
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
      title: 'Shop created successfully.',
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

export default useCreateShop;
