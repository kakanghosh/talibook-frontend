import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
interface Props {
  onSuccess: () => void;
}

function useLoginForm(props: Props) {
  const { login, setUser } = useAuth();
  const [showPlainPassword, setShowPlainPassword] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const { t } = useTranslation();
  const [tryingToLogin, setTryingToLogin] = useState(false);

  const form = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setTryingToLogin(true);
        setLoginFailed(false);
        const user = await login(values.email, values.password);
        props.onSuccess();
        setTimeout(() => {
          setUser(user);
          window.location.pathname = '/';
          setTryingToLogin(false);
        }, 2000);
      } catch ({ response }) {
        setTryingToLogin(false);
        if (response.status == 401) {
          setLoginFailed(true);
        }
      }
    },
  });

  function updateShowPlainPassword() {
    setShowPlainPassword(!showPlainPassword);
  }

  const { errors, touched } = form;

  const isFormInvalid =
    Object.keys(errors).length > 0 || Object.keys(touched).length == 0;

  return {
    showPlainPassword,
    form,
    isFormInvalid,
    loginFailed,
    tryingToLogin,
    updateShowPlainPassword,
  };
}

export default useLoginForm;
