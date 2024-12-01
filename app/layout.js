import { ThemeProvider } from './context/ThemeContext';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Telegram Web',
  description: 'Telegram Web Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
