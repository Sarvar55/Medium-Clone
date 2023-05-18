import './globals.css';
import { Inter } from 'next/font/google';
import AuthNavbar from '../../components/AuthNavbar';
import UnAuthNavbar from '@/components/UnAuthNavbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Medium',
  description: 'Medium Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="antialiased"
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
