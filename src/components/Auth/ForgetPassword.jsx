import { React, useState } from 'react';
import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <Container py="16" h="90vh">
      <form>
        <Heading
          children="Forget Password"
          my="16"
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing="8">
          <Input
            required
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="test@email.com"
            type={'email'}
            focusBorderColor="yellow.500"
          />
          <Button type="submit" width={'full'} colorScheme="yellow">
            Send Reset link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
