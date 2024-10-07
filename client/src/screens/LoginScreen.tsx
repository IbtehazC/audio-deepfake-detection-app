import React from "react";
import { Box, Button, VStack, Heading } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const LoginScreen: React.FC = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in the database
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        // If user doesn't exist, create a new document
        await setDoc(docRef, {
          email: user.email,
          phoneNumber: "", // This will be updated in the RegisterScreen
        });
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
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
          <Heading size="lg">Login</Heading>
          <Button
            colorScheme="red"
            width="full"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginScreen;
