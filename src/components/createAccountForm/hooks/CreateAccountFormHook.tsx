import { useFormik } from 'formik';
import { useState } from 'react';
import { SchemaOf, object, string, ref } from 'yup';
import client from '../../../api/restClient';
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

interface Props {
  onSuccess: () => void;
}

function useCreateAccountForm(props: Props) {
  const [plainPassword, setPlainPassword] = useState(false);
  const [plainRepassword, setPlainRepassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [submitForm, setSubmitForm] = useState(false);

  const form = useFormik<CreateAccountData>({
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
      setSubmitForm(true);
      try {
        setErrorMessage(null);
        await client.post<User>('api/v1/users', payload);
        props.onSuccess();
        setTimeout(() => {
          setSubmitForm(false);
          window.location.pathname = '/auth/login';
        }, 2000);
      } catch ({ response }) {
        setSubmitForm(false);
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

  const { errors, touched } = form;

  const isFormInValid =
    Object.keys(errors).length > 0 || Object.keys(touched).length == 0;

  return {
    plainPassword,
    plainRepassword,
    form,
    isFormInValid,
    errorMessage,
    submitForm,
    togglePlainPassword,
    togglePlainRePassword,
  };
}

export default useCreateAccountForm;
