import { Inter } from 'next/font/google'
import { ThemeProvider } from './context/ThemeContext';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Telegram Clone',
  description: 'A Telegram clone built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
