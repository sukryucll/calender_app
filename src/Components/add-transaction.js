import {
  Button,
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
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function TransactionForm({ onClose, isOpen, onAddTransaction }) {
  const [description, setDescription] = useState("");

  const handleAddTransaction = () => {
    if (description.trim()) {
      onAddTransaction(description);
      setDescription("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel htmlFor="description">Todo</FormLabel>
            <Input
              id="description"
              placeholder="Enter todo"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleAddTransaction}>
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
