import { Container, Text, VStack, Box, Heading, Flex, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
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
          <Button as={Link} to="/about" variant="ghost" colorScheme="teal">
            About
          </Button>
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