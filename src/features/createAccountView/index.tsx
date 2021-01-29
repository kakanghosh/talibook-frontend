import { Center } from '@chakra-ui/react';
import CreateAccountForm from '../../components/createAccountForm';

const CreateAccountView = () => {
  return (
    <Center bg='#256' h='100vh' color='white'>
      <CreateAccountForm></CreateAccountForm>
    </Center>
  );
};

export default CreateAccountView;
