import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import keys from '../../i18n/translations/keys';
import useCreateShop from './hooks/CreateShopHook';

type CreateDistributorModalProps = {
  distributorId: number;
  isOpen: boolean;
  onClose: () => void;
};

function CreateShopModal({
  distributorId,
  isOpen,
  onClose,
}: CreateDistributorModalProps) {
  const { form, isFormInvalid, errorMessage } = useCreateShop(
    distributorId,
    onClose
  );
  const { values, handleSubmit, handleChange, handleBlur } = form;
  const { t } = useTranslation();

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={() => {
          form.resetForm();
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t(keys.Create_Shop)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {errorMessage && (
              <Stack spacing={3}>
                <Alert status='error' textColor='black'>
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              </Stack>
            )}
            <form onSubmit={handleSubmit} noValidate>
              <FormControl id='name'>
                <FormLabel>{t(keys.Name)}</FormLabel>
                <Input
                  type='text'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <Flex justifyContent='space-between' alignItems='flex-end'>
                <Button
                  mt={4}
                  colorScheme='teal'
                  type='submit'
                  disabled={isFormInvalid}
                >
                  {t(keys.Save)}
                </Button>
              </Flex>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                form.resetForm();
                onClose();
              }}
            >
              {t(keys.Cancel)}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateShopModal;
