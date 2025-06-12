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
  title: 'InterGods',
  description:
    'InterGods is all about interwoven together.',
  openGraph: {
    type: 'website',
    url: 'https://intergods.vercel.app',
    title: 'InterGods',
    description:
      'InterGods is all about interwoven together.',
    images: [
      {
        url: 'https://intergods.vercel.app/images/Embed.webp',
        width: 1200,
        height: 630,
        alt: 'InterGods Share Image'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InterGods',
    description:
      'InterGods is all about interwoven together.',
    images: ['https://intergods.vercel.app/images/Embed.webp']
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
