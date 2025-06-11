'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

import { MoveRight } from 'lucide-react';

interface HeaderProps {
  openWlModal: Function;
}

export default function Header({ openWlModal }: HeaderProps) {
  return (
    <header className="sticky top-6 z-50 hidden w-full md:block">
      <nav className="mx-auto flex w-[95%] items-center justify-between rounded-3xl bg-[#97fce4]/10 px-6 py-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-4">
          <a href="https://app.hyperliquid.xyz/trade" target="_blank">
            <img src="/images/logo.gif" className="w-[35px] md:w-[50px]" />
          </a>
          <span className="font-nanum text-xl font-semibold md:text-2xl">
            #TheNextLevel☝
          </span>
        </div>
        <div className="hidden items-center gap-10 px-4 md:!flex">
          <a
            onClick={() => openWlModal && openWlModal()}
            className="cursor-pointer font-nanum text-2xl font-semibold"
          >
            WL checker
          </a>
          <a
            href="https://www.oddsgarden.io"
            target="_blank"
            className="font-nanum text-2xl font-semibold"
          >
            Stake
          </a>
          <a href="#" className="font-nanum text-2xl font-semibold">
            Discord
          </a>
          <a
            href="https://x.com/HyperWizardsHL"
            target="_blank"
            className="font-nanum text-2xl font-semibold"
          >
            Twitter
          </a>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a className="group flex cursor-pointer items-center gap-2 font-nanum text-2xl font-semibold text-orange-400 transition-all duration-300 hover:gap-4">
                  Go to Launchpad{' '}
                  <MoveRight className="transition-all duration-300 group-hover:-mr-2" />
                </a>
              </TooltipTrigger>
              <TooltipContent className="bg-green-900">
                <p>You’re to Ealry</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
    </header>
  );
}
