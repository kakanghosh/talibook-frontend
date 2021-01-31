import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SchemaOf, object, string, ref } from 'yup';
import client from '../../../api/restClient';
import keys from '../../../i18n/translations/keys';
import { User } from '../../../models';

type CreateAccountData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repassword: string;
};

const validationSchema: SchemaOf<CreateAccountData> = object().shape({
  firstName: string().trim().required('First Name is required'),
  lastName: string().trim().required('Last Name is required'),
  email: string()
    .trim()
    .email('Email is not valid')
    .required('Email is required'),
  password: string().trim().required('Password is required'),
  repassword: string()
    .trim()
    .required()
    .oneOf([ref('password')], 'Password must be matched'),
});

function useCreateAccountForm() {
  const [plainPassword, setPlainPassword] = useState(false);
  const [plainRepassword, setPlainRepassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const toast = useToast();
  const { t } = useTranslation();

  const createAccountForm = useFormik<CreateAccountData>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { repassword, ...payload } = values;
      try {
        setErrorMessage(null);
        await client.post<User>('api/v1/users', payload);
        showToast();
        setTimeout(() => {
          window.location.pathname = '/auth/login';
        }, 2000);
      } catch ({ response }) {
        if (response.data.statusCode == 422) {
          setErrorMessage(response.data.message);
        }
      }
    },
  });

  function togglePlainPassword() {
    setPlainPassword(!plainPassword);
  }

  function togglePlainRePassword() {
    setPlainRepassword(!plainRepassword);
  }

  const { errors, touched } = createAccountForm;

  const isFormValid =
    Object.keys(errors).length > 0 || Object.keys(touched).length == 0;

  const showToast = () =>
    toast({
      title: t(keys.Account_Creation_Successful),
      description: t(keys.Redirecting_To_Login_Page),
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });

  return {
    plainPassword,
    plainRepassword,
    createAccountForm,
    isFormValid,
    errorMessage,
    togglePlainPassword,
    togglePlainRePassword,
  };
}

export default useCreateAccountForm;
