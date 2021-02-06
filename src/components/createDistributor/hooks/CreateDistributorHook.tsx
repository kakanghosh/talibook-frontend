import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SchemaOf, object, string } from 'yup';
import client from '../../../api/restClient';
import keys from '../../../i18n/translations/keys';
import { Distributor } from '../../../models';
import { addToDistributorList } from '../../../store/slices/distributorSlice';

type CreateDistributorData = {
  name: string;
};

const validationSchema: SchemaOf<CreateDistributorData> = object().shape({
  name: string().trim().required('Name is required'),
});

interface Props {
  onClose?: () => void;
}

function useCreateDistributor(props: Props) {
  const [errorMessage, setErrorMessage] = useState(null);
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
        if (props.onClose) {
          props.onClose();
        }
      } catch ({ response }) {
        if (response.data.statusCode == 422) {
          setErrorMessage(response.data.message);
        }
      }
    },
  });

  return {
    form,
    errorMessage,
  };
}

export default useCreateDistributor;
