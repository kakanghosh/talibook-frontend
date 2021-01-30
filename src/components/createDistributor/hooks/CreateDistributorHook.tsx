import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SchemaOf, object, string } from 'yup';
import client from '../../../api/restClient';
import { Distributor } from '../../../models';
import { addToDistributorList } from '../../../store/slices/distributorSlice';

type CreateDistributorData = {
  name: string;
};

const validationSchema: SchemaOf<CreateDistributorData> = object().shape({
  name: string().trim().required('Name is required'),
});

function useCreateDistributor(onClose: () => void) {
  const [errorMessage, setErrorMessage] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const form = useFormik<CreateDistributorData>({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setErrorMessage(null);
        const { data } = await client.post<Distributor>(
          'api/v1/distributors',
          values
        );
        dispatch(addToDistributorList(data));
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
      title: 'Distributor created successfully.',
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

export default useCreateDistributor;
