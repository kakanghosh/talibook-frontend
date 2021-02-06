import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { SchemaOf, object, string } from 'yup';
import client from '../../../api/restClient';
import keys from '../../../i18n/translations/keys';
import { Shop } from '../../../models';
import { addShopInDistributor } from '../../../store/slices/shopSlice';

type CreateShopData = {
  name: string;
};

const validationSchema: SchemaOf<CreateShopData> = object().shape({
  name: string().trim().required('Name is required'),
});

interface Props {
  distributorId: number;
  onCancel?: () => void;
}

function useCreateShop(props: Props) {
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const form = useFormik<CreateShopData>({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setErrorMessage(null);
        const { data } = await client.post<Shop>(
          `api/v1/distributors/${props.distributorId}/shops`,
          values
        );
        form.resetForm();
        dispatch(
          addShopInDistributor({
            distributorId: props.distributorId,
            shop: data,
          })
        );
        if (props.onCancel) {
          props.onCancel();
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

export default useCreateShop;
