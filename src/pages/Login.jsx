import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { Container, VStack, Heading } from '@chakra-ui/react';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <Container centerContent>
      <VStack spacing={4} mt={10}>
        <Heading>Login</Heading>
        <SupabaseAuthUI />
      </VStack>
    </Container>
  );
};

export default Login;