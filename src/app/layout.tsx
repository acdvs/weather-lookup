import type { Metadata } from 'next';

import './globals.css';
import ReactQueryProvider from './components/QueryProvider';

export const metadata: Metadata = {
  title: 'Current Weather',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <body className="bg-gray-900">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
