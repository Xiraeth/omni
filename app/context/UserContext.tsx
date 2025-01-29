"use client";

import { createContext, useContext, ReactNode } from "react";
import { UserType } from "@/app/common/types";
import { Session } from "next-auth";

type UserContextType = {
  user: UserType | null;
};

type UserProviderProps = {
  session: Session | null;
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ session, children }: UserProviderProps) {
  const user = session?.user ?? null;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
