import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Prestige Bali Leisure',
  description: 'Complete CMS for Prestige Bali Leisure',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
