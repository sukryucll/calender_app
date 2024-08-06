import { ChakraProvider } from "@chakra-ui/react";
import Calendar from "./Components/Calendar";

function App() {
  return (
    <ChakraProvider>
      <Calendar />
    </ChakraProvider>
  );
}

export default App;
