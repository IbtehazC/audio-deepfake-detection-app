import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Avatar,
  HStack,
  IconButton,
  Progress,
  Flex,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { PhoneXMarkIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
}

interface CallScreenProps {
  contact: Contact;
  onEndCall: () => void;
}

const CallScreen: React.FC<CallScreenProps> = ({ contact, onEndCall }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [detectionResult, setDetectionResult] = useState<null | boolean>(null);
  const [detectionConfidence, setDetectionConfidence] = useState(0);

  useEffect(() => {
    // Simulate detection process
    const timer = setTimeout(() => {
      const isFake = Math.random() < 0.5;
      setDetectionResult(isFake);
      setDetectionConfidence(Math.random() * 100);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box
        bg="green.500"
        p={4}
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="white"
        >
          Call with {contact.name}
        </Text>
      </Box>
      <VStack
        flex={1}
        justifyContent="center"
        bg="gray.100"
        spacing={6}
      >
        <Avatar
          name={contact.name}
          src={contact.avatar}
          size="2xl"
        />
        <Text
          fontSize="2xl"
          fontWeight="semibold"
        >
          {contact.name}
        </Text>
        <Text color="gray.600">{contact.phoneNumber}</Text>
        <Text color="gray.600">Calling...</Text>

        {/* Deepfake Detection Results */}
        <Box
          bg="white"
          p={4}
          rounded="md"
          shadow="md"
          width="80%"
          maxWidth="400px"
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={2}
          >
            Deepfake Detection
          </Text>
          {detectionResult === null ? (
            <Flex align="center">
              <Text mr={2}>Analyzing call...</Text>
              <Progress
                size="xs"
                isIndeterminate
                width="100%"
              />
            </Flex>
          ) : (
            <VStack
              align="stretch"
              spacing={2}
            >
              <Flex align="center">
                <Icon
                  as={detectionResult ? ShieldExclamationIcon : ShieldCheckIcon}
                  color={detectionResult ? "red.500" : "green.500"}
                  boxSize={6}
                  mr={2}
                />
                <Text fontWeight="bold">
                  {detectionResult
                    ? "Potential Deepfake Detected"
                    : "No Deepfake Detected"}
                </Text>
              </Flex>
              <Progress
                value={detectionConfidence}
                size="sm"
                colorScheme={detectionResult ? "red" : "green"}
              />
              <Text
                fontSize="sm"
                color="gray.500"
              >
                Confidence: {detectionConfidence.toFixed(2)}%
              </Text>
            </VStack>
          )}
        </Box>
      </VStack>
      <HStack
        justifyContent="center"
        p={6}
        bg="white"
        spacing={6}
      >
        <IconButton
          aria-label="Mute"
          icon={<Icon as={MicrophoneIcon} />}
          onClick={() => setIsMuted(!isMuted)}
          colorScheme={isMuted ? "red" : "gray"}
          rounded="full"
          size="lg"
        />
        <IconButton
          aria-label="End Call"
          icon={<Icon as={PhoneXMarkIcon} />}
          onClick={onEndCall}
          colorScheme="red"
          rounded="full"
          size="lg"
        />
      </HStack>
    </Box>
  );
};

export default CallScreen;
