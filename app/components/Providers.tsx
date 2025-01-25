"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../context/ThemeContext";
import { UserProvider } from "../context/UserContext";
import { Session } from "next-auth";
import QueryProvider from "../context/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <QueryProvider>
      <SessionProvider session={session}>
        <ThemeProvider>
          <UserProvider session={session}>{children}</UserProvider>
        </ThemeProvider>
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  );
}
