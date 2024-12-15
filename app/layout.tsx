import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato, Montserrat, Roboto } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";
import { ToggleThemeButton } from "./components/ToggleThemeButton";
import Navbar from "./components/Navbar";
import { Suspense } from "react";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.classList.add(theme);
                  } else {
                    document.documentElement.classList.add('light');
                  }
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
        <ThemeProvider>
          <ToggleThemeButton />
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
          </Suspense>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
