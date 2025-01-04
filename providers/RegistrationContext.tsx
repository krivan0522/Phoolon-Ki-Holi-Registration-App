// providers/RegistrationContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface RegistrationContextType {
  isRegistered: boolean;
  token: string | null;
  checkRegistration: () => Promise<void>;
}

const RegistrationContext = createContext<RegistrationContextType>({
  isRegistered: false,
  token: null,
  checkRegistration: async () => {},
});

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const checkRegistration = async () => {
    try {
      const tkn = localStorage.getItem('authToken');
      if (!tkn) return;

      const response = await axios.get('/api/register/status', {
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      });

      if (response.data.isRegistered) {
        setIsRegistered(true);
        setToken(response.data.token);
      }
    } catch (error) {
      console.error('Error checking registration status:', error);
    }
  };

  useEffect(() => {
    checkRegistration();
  }, []);

  return (
    <RegistrationContext.Provider value={{ isRegistered, token, checkRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
