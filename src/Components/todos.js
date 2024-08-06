import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Todos({ transactions }) {
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
    >
      <Heading size="md" mb="4" color="white">
        Todos
      </Heading>
      {transactions.length === 0 ? (
        <Text color="white">No todos available.</Text>
      ) : (
        transactions.map((transaction, index) => (
          <Box
            key={index}
            p="4"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            mb="2"
            background="white"
            width="100%"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
          >
            {transaction}
          </Box>
        ))
      )}
    </Box>
  );
}

export default Todos;
