"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";
import { Session } from "next-auth";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <UserProvider session={session}>{children}</UserProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
