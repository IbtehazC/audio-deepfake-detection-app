import React, { useEffect, useState } from "react";
import { Box, VStack, HStack, Text, Avatar, Button } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
}

interface ContactListScreenProps {
  onSelectContact: (contact: Contact) => void;
}

const ContactListScreen: React.FC<ContactListScreenProps> = ({
  onSelectContact,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { logout, user } = useAuth();

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const contactList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          name: doc.data().name || doc.data().phoneNumber, // Use phone number as name if no name is provided
          phoneNumber: doc.data().phoneNumber,
          avatar: doc.data().avatar,
        }))
        .filter((contact) => contact.id !== user?.uid); // Exclude the current user
      setContacts(contactList);
    };

    fetchContacts();
  }, [user]);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
    >
      <Box
        bg="green.500"
        p={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontSize="xl"
          fontWeight="bold"
          color="white"
        >
          Contacts
        </Text>
        <Button
          colorScheme="red"
          size="sm"
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
      <VStack
        spacing={0}
        align="stretch"
        overflowY="auto"
        flex={1}
      >
        {contacts.map((contact) => (
          <HStack
            key={contact.id}
            p={4}
            borderBottomWidth={1}
            borderColor="gray.200"
            _hover={{ bg: "gray.100" }}
            cursor="pointer"
            onClick={() => onSelectContact(contact)}
          >
            <Avatar
              name={contact.name}
              src={contact.avatar}
              size="md"
            />
            <Text fontWeight="semibold">{contact.name}</Text>
            <Text
              color="gray.500"
              ml="auto"
            >
              {contact.phoneNumber}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default ContactListScreen;
