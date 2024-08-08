import { Box, Flex, Heading, Text, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

function Todos({ transactions, onRemoveTransaction, selectedDate }) {
  // Tarihi formatlamak için bir fonksiyon
  const formatDate = (date) => {
    if (!date) return '';
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <Box
      p="6"
      border="1px solid"
      borderColor="gray.100"
      overflow="hidden"
      borderRadius="10"
      background="#B670F4"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="300px"
      data-aos="fade-right"
    >
      <Heading size="md" mb="4" color="white">
        Todos
      </Heading>
      {selectedDate && (
        <Text color="white" mb="4">
          {formatDate(selectedDate)}
        </Text>
      )}
      {transactions.length === 0 ? (
        <Text color="white">No todos available.</Text>
      ) : (
        transactions.map((transaction, index) => (
          <Flex
            key={index}
            p="4"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            mb="2"
            background="white"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              flex="1"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {transaction}
            </Text>
            <IconButton
              icon={<CloseIcon />}
              size="sm"
              variant="ghost"
              color="red.500"
              onClick={() => onRemoveTransaction(index)}
            />
          </Flex>
        ))
      )}
    </Box>
  );
}

export default Todos;
