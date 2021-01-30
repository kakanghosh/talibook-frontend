import {
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
} from '@chakra-ui/react';
import useCreateDistributor from './hooks/CreateDistributorHook';

type CreateDistributorModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CreateDistributorModal({
  isOpen,
  onClose,
}: CreateDistributorModalProps) {
  const { form, isFormInvalid } = useCreateDistributor(onClose);
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
          <ModalHeader>Create Distributor</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit} noValidate>
              <FormControl id='name'>
                <FormLabel>Name</FormLabel>
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

export default CreateDistributorModal;
