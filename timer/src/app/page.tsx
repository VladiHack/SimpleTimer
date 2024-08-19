import { ChakraProvider, Box } from '@chakra-ui/react';
import Timer from '../components/Timer';

export default function Home() {
  return (
    <ChakraProvider>
      <Box
        bgGradient="linear(to-r, teal.400, blue.500)" // Gradient background from teal to blue
        minH="100vh" // Ensure the box covers the full height of the viewport
        p={6} // Add padding to the Box
      >
        <main className="flex min-h-screen flex-col items-center justify-center">
          <Timer />
        </main>
      </Box>
    </ChakraProvider>
  );
}
