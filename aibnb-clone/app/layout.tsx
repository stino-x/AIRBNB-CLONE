import type { Metadata } from 'next';
import { Nunito, Inter } from 'next/font/google';
import './globals.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; 
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';
import getCurrentUSer from './actions/getCurrentUser';
import SearchModal from './components/modals/SearchModal';

const inter = Inter({ subsets: ['latin'] });
const nunito = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentuser = await getCurrentUSer();
  
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ClientOnly>
          <ToasterProvider>
            <SearchModal />
            <RegisterModal />
            <RentModal />
            <LoginModal />
            <Navbar currentUser={currentuser} />
            <div className="pt-28 pb-20">
              {children}
            </div>
          </ToasterProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
