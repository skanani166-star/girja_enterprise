import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'BrandForge — Corporate Merchandise',
  description: 'Premium corporate t-shirts, caps, and bags with custom branding. Minimum order 10 pieces. Pan-India delivery.',
  keywords: 'corporate tshirts, custom caps, branded bags, corporate merchandise India',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="grain antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
