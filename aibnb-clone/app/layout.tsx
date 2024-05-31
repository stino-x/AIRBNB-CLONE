import type { Metadata } from "next";
import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

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
      <Navbar />
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
