import type { ReactNode } from 'react';

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
