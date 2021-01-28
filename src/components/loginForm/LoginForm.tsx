import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import useLoginForm from './hooks/LoginFormHook';

function LoginForm() {
  const {
    showPlainPassword,
    loginForm,
    isFormValid,
    updateShowPlainPassword,
  } = useLoginForm();

  const { values, handleSubmit, handleChange, handleBlur } = loginForm;

  return (
    <div>
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
        <Button mt={4} colorScheme='teal' type='submit' disabled={isFormValid}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
