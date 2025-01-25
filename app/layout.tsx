import { Geist, Geist_Mono, Lato, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { ToggleThemeButton } from "./components/ToggleThemeButton";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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

// Create a script that will run immediately
const themeInitScript = `
  const theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.classList.add(theme);
  document.documentElement.setAttribute("data-theme", theme);
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${roboto.variable} ${lato.variable} min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-200 antialiased`}
        suppressHydrationWarning
      >
        <Providers session={session}>
          <ToggleThemeButton />
          <Navbar />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={true}
            pauseOnHover={true}
            className="select-none"
          />
        </Providers>
      </body>
    </html>
  );
}
