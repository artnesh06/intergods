import type { ReactNode } from 'react';

export const metadata = {
  title: 'InterGods',
  description:
    'InterGods is all about interwoven together.',
  openGraph: {
    type: 'website',
    url: 'https://intergods.xyz',
    title: 'InterGods',
    description:
      'InterGods is all about interwoven together.',
    images: [
      {
        url: 'https://intergods.xyz/images/Embed.webp',
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
    images: ['https://intergods.xyz/images/Embed.webp']
  }
};

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex">
      <main className="h-screen w-full">
        <div className="mx-auto h-full w-screen 2xl:max-w-[1920px]">{children}</div>
      </main>
    </div>
  );
}
