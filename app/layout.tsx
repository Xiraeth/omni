import { Geist, Geist_Mono, Lato, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { ToggleThemeButton } from "./components/ToggleThemeButton";
import Navbar from "./components/Navbar";
import { Suspense } from "react";
import Providers from "./components/Providers";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Omni",
  description: "An app for many things",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  // Initialize theme variables
  let initialTheme = "light"; // Default theme

  // Check if running on the client side
  if (typeof window !== "undefined") {
    // Get the saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    initialTheme = savedTheme || systemTheme;
  }

  return (
    <html lang="en" suppressHydrationWarning className={initialTheme}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || '${initialTheme}';
                  document.documentElement.classList.add(theme);
                  document.body.setAttribute("data-theme", theme);
                } catch (e) {
                  document.documentElement.classList.add('light');
                }
              })()
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${roboto.variable} ${lato.variable} min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200 antialiased`}
        suppressHydrationWarning
      >
        <Providers session={session}>
          <ToggleThemeButton />
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
