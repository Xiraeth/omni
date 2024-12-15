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
  title: "Your Title",
  description: "Your Description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

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
