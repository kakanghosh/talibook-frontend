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
  Box,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import useLoginForm from './hooks/LoginFormHook';

function LoginForm() {
  const {
    showPlainPassword,
    loginForm,
    isFormValid,
    loginFailed,
    updateShowPlainPassword,
  } = useLoginForm();

  const { values, handleSubmit, handleChange, handleBlur } = loginForm;

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
          <FormLabel>Email address</FormLabel>
          <Input
            type='email'
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id='password'>
          <FormLabel>Password</FormLabel>
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
                {showPlainPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Flex justifyContent='space-between' alignItems='flex-end'>
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
            disabled={isFormValid}
          >
            Login
          </Button>
          <Text fontSize='md'>
            <NextLink href={`/auth/create-account`}>
              <Link
                textColor='white'
                color='teal.500'
                href={`/auth/create-account`}
              >
                Create New Account
              </Link>
            </NextLink>
          </Text>
        </Flex>
      </form>
    </div>
  );
}

export default LoginForm;
