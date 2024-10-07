import React, { useState } from "react";
import { Box, Button, VStack, Input, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

const RegisterScreen: React.FC = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUserInfo } = useAuth();

  const handleRegister = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      await updateUserInfo({
        name,
        phoneNumber,
      });
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
    >
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="md"
      >
        <VStack spacing={4}>
          <Heading size="lg">Complete Registration</Heading>
          <Text>Please enter your name and phone number</Text>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
          <Button
            colorScheme="green"
            width="full"
            onClick={handleRegister}
            isLoading={isLoading}
            loadingText="Registering"
          >
            Register
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default RegisterScreen;
