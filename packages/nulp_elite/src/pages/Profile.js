// Profile.js
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const Profile = () => {
  return (
    <Box textAlign="center" padding="10">
      <Heading as="h1" size="2xl" marginBottom="4">
        Welcome to Our Learning Portal
      </Heading>
      <Button colorScheme="blue" size="lg">
        Log Out
      </Button>
    </Box>
  );
};

export default Profile;