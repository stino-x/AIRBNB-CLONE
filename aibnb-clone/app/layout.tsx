import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Modal } from "./components/modals/Modal";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Clientonly component  fixes hydration error thats caused by the app folder routing somehow */}
      <ClientOnly>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Navbar />
      </ClientOnly>
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
