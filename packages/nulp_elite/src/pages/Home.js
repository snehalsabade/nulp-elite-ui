// Home.js
import React from "react";
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box textAlign="center" padding="10">
      <Heading as="h1" size="2xl" marginBottom="4">
        Welcome to Our Learning Portal
      </Heading>

      <Text fontSize="xl" marginBottom="8">
        Enhance your knowledge and skills with our diverse range of courses and
        content.
      </Text>
      <Button colorScheme="blue" size="lg">
        Explore Courses
      </Button>
    </Box>
  );
};

export default Home;
