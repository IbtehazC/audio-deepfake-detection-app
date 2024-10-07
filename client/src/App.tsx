import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ContactListScreen from "./screens/ContactListScreen";
import CallScreen from "./screens/CallScreen";

interface Contact {
  id: string;
  name: string;
  phoneNumber: string;
  avatar?: string;
}

const AppContent: React.FC = () => {
  const { user, loading, userInfo } = useAuth();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <LoginScreen />;
  }

  if (!userInfo?.phoneNumber) {
    return <RegisterScreen />;
  }

  if (selectedContact) {
    return (
      <CallScreen
        contact={selectedContact}
        onEndCall={() => setSelectedContact(null)}
      />
    );
  }

  return <ContactListScreen onSelectContact={setSelectedContact} />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
