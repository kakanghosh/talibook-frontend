import { useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { SchemaOf, object, string } from 'yup';
import { useAuth } from '../../../contexts/auth';

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
  const { login, setUser } = useAuth();
  const [showPlainPassword, setShowPlainPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const toast = useToast();

  const loginForm = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoginFailed(false);
        const user = await login(values.email, values.password);
        showToast();
        setTimeout(() => {
          setUser(user);
          window.location.pathname = '/';
        }, 2000);
      } catch ({ response }) {
        if (response.status == 401) {
          setLoginFailed(true);
        }
      }
    },
  });

  function updateShowPlainPassword() {
    setShowPlainPassword(!showPlainPassword);
  }

  const { errors, touched } = loginForm;

  const isFormValid =
    Object.keys(errors).length > 0 || Object.keys(touched).length == 0;

  const showToast = () =>
    toast({
      title: 'Login Successful.',
      description: "We're redirecting you to the Dashboard.",
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right',
    });

  return {
    showPlainPassword,
    loginForm,
    isFormValid,
    loginFailed,
    updateShowPlainPassword,
  };
}

export default useLoginForm;
