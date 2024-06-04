import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import { Modal } from "./components/modals/Modal";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import getCurrentUSer from "./actions/getCurrentUser";

const inter = Inter({ subsets: ["latin"] });
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function  RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentuser = await getCurrentUSer()
  return (
    <html lang="en">
      {/* Clientonly component  fixes hydration error thats caused by the app folder routing somehow */}
      <body className={nunito.className}>
      <ClientOnly>
      <ToasterProvider />
      <RegisterModal />
      <RentModal />
      <LoginModal />
      <Navbar currentUser={currentuser} />
      </ClientOnly>
        {children}
        </body>
    </html>
  );
}
