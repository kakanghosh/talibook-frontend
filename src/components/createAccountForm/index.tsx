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
import useCreateAccountForm from './hooks/CreateAccountFormHook';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';

function CreateAccountForm() {
  const {
    plainPassword,
    plainRepassword,
    createAccountForm,
    isFormValid,
    errorMessage,
    togglePlainPassword,
    togglePlainRePassword,
  } = useCreateAccountForm();
  const { values, handleSubmit, handleChange, handleBlur } = createAccountForm;
  const { t } = useTranslation();

  return (
    <Box p='15px'>
      {errorMessage && (
        <Stack spacing={3}>
          <Alert status='error' textColor='black'>
            <AlertIcon />
            {errorMessage}
          </Alert>{' '}
        </Stack>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <Flex>
          <FormControl id='firstName' mr='3px'>
            <FormLabel>{t(keys.First_Name)}</FormLabel>
            <Input
              type='text'
              value={values.firstName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id='lastName' ml='3px'>
            <FormLabel>{t(keys.Last_Name)}</FormLabel>
            <Input
              type='text'
              value={values.lastName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </FormControl>
        </Flex>
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
              type={plainPassword ? 'text' : 'password'}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <InputRightElement width='4.5rem'>
              <Button
                colorScheme='red'
                h='1.75rem'
                size='sm'
                onClick={togglePlainPassword}
              >
                {plainPassword ? t(keys.Hide) : t(keys.Show)}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id='repassword'>
          <FormLabel>{t(keys.Re_Password)}</FormLabel>
          <InputGroup>
            <Input
              type={plainRepassword ? 'text' : 'password'}
              value={values.repassword}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <InputRightElement width='4.5rem'>
              <Button
                colorScheme='red'
                h='1.75rem'
                size='sm'
                onClick={togglePlainRePassword}
              >
                {plainRepassword ? t(keys.Hide) : t(keys.Show)}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Flex justifyContent='space-between' alignItems='flex-end'>
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
            mr='6px'
            disabled={isFormValid}
          >
            {t(keys.Create_Account)}
          </Button>
          <Text fontSize='md'>
            <NextLink href={`/auth/login`}>
              <Link textColor='white' color='teal.500' href={`/auth/login`}>
                {t(keys.Already_Have_An_Account)}
              </Link>
            </NextLink>
          </Text>
        </Flex>
      </form>
    </Box>
  );
}

export default CreateAccountForm;
