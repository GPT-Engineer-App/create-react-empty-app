import { Container, Text, VStack, Box, Heading, Flex, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";

const Index = () => {
  const { session, logout } = useSupabaseAuth();

  return (
    <Container maxW="container.xl">
      <Flex as="nav" bg="teal.500" color="white" padding={4}>
        <Box p="2">
          <Heading size="md">MyApp</Heading>
        </Box>
        <Spacer />
        <Box>
          <Button as={Link} to="/" variant="ghost" colorScheme="teal" mr={4}>
            Home
          </Button>
          <Button as={Link} to="/about" variant="ghost" colorScheme="teal" mr={4}>
            About
          </Button>
          <Button as={Link} to="/events" variant="ghost" colorScheme="teal">
            Events
          </Button>
          {session ? (
            <Button variant="ghost" colorScheme="teal" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button as={Link} to="/login" variant="ghost" colorScheme="teal">
              Login
            </Button>
          )}
        </Box>
      </Flex>
      <VStack spacing={4} mt={10}>
        <Heading>Welcome to MyApp</Heading>
        <Text fontSize="xl">This is a placeholder for your content.</Text>
      </VStack>
    </Container>
  );
};

export default Index;