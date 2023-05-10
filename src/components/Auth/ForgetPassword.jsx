import { React, useEffect, useState } from 'react';
import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  const { loading, message, error } = useSelector(state => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMesssage' });
      navigate('/login');
    }
  }, [dispatch, error, message, navigate]);

  return (
    <Container py="16" h="90vh">
      <form onSubmit={submitHandler}>
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
          <Button
            isLoading={loading}
            type="submit"
            width={'full'}
            colorScheme="yellow"
          >
            Send Reset link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
