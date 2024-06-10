import { useState } from "react";
import {
  Container,
  Text,
  VStack,
  Box,
  Heading,
  Flex,
  Spacer,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";
import { FaEdit, FaTrash } from "react-icons/fa";

const Events = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const toast = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({ name: "", date: "", venue_id: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEvent = async () => {
    try {
      await addEvent.mutateAsync(formData);
      toast({ title: "Event added.", status: "success" });
      setFormData({ name: "", date: "", venue_id: "" });
      setIsModalOpen(false);
    } catch (error) {
      toast({ title: "Error adding event.", status: "error" });
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent.mutateAsync({ ...currentEvent, ...formData });
      toast({ title: "Event updated.", status: "success" });
      setFormData({ name: "", date: "", venue_id: "" });
      setCurrentEvent(null);
      setIsModalOpen(false);
    } catch (error) {
      toast({ title: "Error updating event.", status: "error" });
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent.mutateAsync(id);
      toast({ title: "Event deleted.", status: "success" });
    } catch (error) {
      toast({ title: "Error deleting event.", status: "error" });
    }
  };

  const openModal = (event = null) => {
    setCurrentEvent(event);
    setFormData(event ? { name: event.name, date: event.date, venue_id: event.venue_id } : { name: "", date: "", venue_id: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentEvent(null);
    setFormData({ name: "", date: "", venue_id: "" });
    setIsModalOpen(false);
  };

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
          <Button as={Link} to="/events" variant="ghost" colorScheme="teal">
            Events
          </Button>
        </Box>
      </Flex>
      <VStack spacing={4} mt={10}>
        <Heading>Events</Heading>
        <Button colorScheme="teal" onClick={() => openModal()}>Add Event</Button>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : isError ? (
          <Text>Error loading events.</Text>
        ) : (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Date</Th>
                <Th>Venue</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {events.map((event) => (
                <Tr key={event.id}>
                  <Td>{event.name}</Td>
                  <Td>{event.date}</Td>
                  <Td>{event.venue_id}</Td>
                  <Td>
                    <IconButton
                      icon={<FaEdit />}
                      mr={2}
                      onClick={() => openModal(event)}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => handleDeleteEvent(event.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </VStack>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentEvent ? "Update Event" : "Add Event"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="date" mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="venue_id" mb={4}>
              <FormLabel>Venue ID</FormLabel>
              <Input
                type="text"
                name="venue_id"
                value={formData.venue_id}
                onChange={handleInputChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={currentEvent ? handleUpdateEvent : handleAddEvent}>
              {currentEvent ? "Update" : "Add"}
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Events;