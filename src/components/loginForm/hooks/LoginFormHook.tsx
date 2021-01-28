import { useFormik } from 'formik';
import { useState } from 'react';
import { SchemaOf, object, string } from 'yup';

type LoginData = {
  email: string;
  password: string;
};

const validationSchema: SchemaOf<LoginData> = object({
  email: string()
    .trim()
    .email('Email is not valid')
    .required('Email is required'),
  password: string().trim().required('Password is required'),
});

function useLoginForm() {
  const [showPlainPassword, setShowPlainPassword] = useState(false);

  const loginForm = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  function updateShowPlainPassword() {
    setShowPlainPassword(!showPlainPassword);
  }

  const { errors, touched } = loginForm;

  const isFormValid =
    Object.keys(errors).length > 0 || Object.keys(touched).length == 0;

  return { showPlainPassword, loginForm, isFormValid, updateShowPlainPassword };
}

export default useLoginForm;
