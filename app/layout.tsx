import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'Hyper Wizard',
  description:
    '2500 unique collectible characters with proof of ownership stored on the Hyperliquid blockchain, powered by LiquidFi. Each wizard is individually generated, ensuring no two are exactly alike, and can be collected by anyone interacting with the EVM.',
  openGraph: {
    type: 'website',
    url: 'https://upri.world',
    title: 'Hyper Wizard',
    description:
      '2500 unique collectible characters with proof of ownership stored on the Hyperliquid blockchain, powered by LiquidFi. Each wizard is individually generated, ensuring no two are exactly alike, and can be collected by anyone interacting with the EVM.',
    images: [
      {
        url: 'https://upri.world/images/thumbnail.webp',
        width: 1200,
        height: 630,
        alt: 'Hyper Wizard Share Image'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hyper Wizard',
    description:
      '2500 unique collectible characters with proof of ownership stored on the Hyperliquid blockchain, powered by LiquidFi. Each wizard is individually generated, ensuring no two are exactly alike, and can be collected by anyone interacting with the EVM.',
    images: ['https://upri.world/images/thumbnail.webp']
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
