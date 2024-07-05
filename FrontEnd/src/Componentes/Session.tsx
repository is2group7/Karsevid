import React, { createContext, useContext, useState, useEffect } from 'react';

interface SessionContextType {
  sessionUUID: string | null;
  setSessionUUID: (uuid: string) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export const SesionUsuario: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessionUUID, setSessionUUID] = useState<string | null>(() => {
    return sessionStorage.getItem('sessionUUID');
  });

  useEffect(() => {
    if (sessionUUID) {
      sessionStorage.setItem('sessionUUID', sessionUUID);
    }
  }, [sessionUUID]);

  return (
    <SessionContext.Provider value={{ sessionUUID, setSessionUUID }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};