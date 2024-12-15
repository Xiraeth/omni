"use client";

import { Session } from "next-auth";
import { createContext, useContext, ReactNode } from "react";

interface UserContextType {
  session: Session | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  session: Session | null;
  children: ReactNode;
}

export function UserProvider({ session, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ session }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
