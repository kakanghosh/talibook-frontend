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
  Select,
  Stack,
} from '@chakra-ui/react';
import useCreateTransaction from './hooks/CreateTransactionHook';

type CreateDistributorModalProps = {
  distributorId: number;
  shopId: number;
  isOpen: boolean;
  onClose: () => void;
};

function CreateTransactionModal({
  distributorId,
  shopId,
  isOpen,
  onClose,
}: CreateDistributorModalProps) {
  const { form, isFormInvalid, errorMessage } = useCreateTransaction(
    distributorId,
    shopId,
    onClose
  );
  const { values, handleSubmit, handleChange, handleBlur } = form;

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
          <ModalHeader>Create Transaction</ModalHeader>
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
              <FormControl id='amount' pb='3px'>
                <FormLabel>Amount</FormLabel>
                <Input
                  type='number'
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl id='type' pt='3px' pb='3px'>
                <FormLabel>Type</FormLabel>
                <Select
                  placeholder='Select Type'
                  type='number'
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value='0'>Deposite</option>
                  <option value='1'>Purchase</option>
                </Select>
              </FormControl>
              <Flex justifyContent='space-between' alignItems='flex-end'>
                <Button
                  mt={4}
                  colorScheme='teal'
                  type='submit'
                  disabled={isFormInvalid}
                >
                  Save
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
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTransactionModal;
