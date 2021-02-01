import React from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Link,
  Flex,
  Progress,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import useLoginForm from './hooks/LoginFormHook';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';

function LoginForm() {
  const {
    showPlainPassword,
    loginForm,
    isFormValid,
    loginFailed,
    tryingToLogin,
    updateShowPlainPassword,
  } = useLoginForm();
  const { values, handleSubmit, handleChange, handleBlur } = loginForm;
  const { t } = useTranslation();

  return (
    <div>
      {loginFailed && (
        <Stack spacing={3}>
          <Alert status='error' textColor='black'>
            <AlertIcon />
            Email / Password is incorrect
          </Alert>{' '}
        </Stack>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <FormControl id='email'>
          <FormLabel>{t(keys.Email_Address)}</FormLabel>
          <Input
            type='email'
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>{t(keys.Password)}</FormLabel>
          <InputGroup>
            <Input
              type={showPlainPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <InputRightElement width='4.5rem'>
              <Button
                colorScheme='red'
                h='1.75rem'
                size='sm'
                onClick={updateShowPlainPassword}
              >
                {showPlainPassword ? t(keys.Hide) : t(keys.Show)}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Flex justifyContent='space-between' alignItems='flex-end'>
          <Button
            mt={4}
            mr={2}
            colorScheme='teal'
            type='submit'
            disabled={isFormValid || tryingToLogin}
            isLoading={tryingToLogin}
            loadingText={t(keys.Please_Wait)}
          >
            {t(keys.Login)}
          </Button>
          <Text fontSize='md' ml={2}>
            <NextLink href={`/auth/create-account`}>
              <Link
                textColor='white'
                color='teal.500'
                href={`/auth/create-account`}
              >
                {t(keys.Create_New_Account)}
              </Link>
            </NextLink>
          </Text>
        </Flex>
      </form>
    </div>
  );
}

export default LoginForm;
