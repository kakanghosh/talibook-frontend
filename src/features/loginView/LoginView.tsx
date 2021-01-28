import React from 'react';
import { Center } from '@chakra-ui/react';
import LoginForm from '../../components/loginForm/LoginForm';

function LoginView() {
  return (
    <Center bg='#256' h='100vh' color='white'>
      <LoginForm></LoginForm>
    </Center>
  );
}

export default LoginView;
