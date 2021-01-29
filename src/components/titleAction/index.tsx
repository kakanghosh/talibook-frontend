import { AddIcon } from '@chakra-ui/icons';
import {
  Text,
  Flex,
  Center,
  Badge,
  Spacer,
  ButtonGroup,
  Button,
  IconButton,
} from '@chakra-ui/react';

interface TitleActionProps {
  title: string;
  value: string;
  actionTitle: string;
  clickHandler: () => void;
}

const TitleAction = ({
  title,
  value,
  actionTitle,
  clickHandler,
}: TitleActionProps) => {
  return (
    <>
      {' '}
      <Flex p='5px' wrap='wrap'>
        <Center p='3px'>
          <Text textTransform='initial' fontSize='xl' m='3px'>
            {' '}
            {title}
          </Text>
          <Badge variant='solid' colorScheme='green'>
            <Text textTransform='initial' fontSize='md'>
              {value}
            </Text>
          </Badge>
        </Center>
        <Spacer></Spacer>
        <ButtonGroup
          size='sm'
          isAttached
          variant='outline'
          colorScheme='green'
          onClick={clickHandler}
        >
          <Button mr='-px'>{actionTitle}</Button>
          <IconButton aria-label='Add to friends' icon={<AddIcon />} />
        </ButtonGroup>
      </Flex>
    </>
  );
};

export default TitleAction;
