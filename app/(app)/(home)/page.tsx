"use client";

import WlModal from "@/components/modal/wl-checker-modal";
import { useWlModal } from "@/hooks/useWlModal";
import { useTooltip } from "@/hooks/useTooltip";
import { MoveRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Particles } from "@/components/magicui/particles";

export default function HomePage() {

  const { isOpen, openModal, toggleModal } = useWlModal();
  const { showTooltip, hideTooltip, isTooltipActive } = useTooltip();

  return <div className="relative w-full h-full">
    <Particles
        className="absolute inset-0 z-[9999]"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    <SmoothCursor />
    <WlModal showTrigger={false} isOpen={isOpen} onOpenChange={toggleModal} />
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent to-black z-10"></div>
    <div className="w-full h-full bg-[url('/images/background.png')] bg-cover bg-top">
    </div>

    <div className="absolute top-3 w-[95%] left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative flex bg-[#222]/50 backdrop-blur-md rounded-full p-4 px-8 items-center justify-center md:!justify-between text-white font-hanson">
        <div className="flex items-center gap-8">
          <div className="group group-intergods">
            <a
              href="#"
              className="md:!hidden flex items-center gap-4"
              onClick={openModal}
            >
              <img src="/images/logo.png" className="h-[30px]" />
              <span>Intergods</span>
            </a>
            <a
              href="#"
              className="hidden md:!flex items-center gap-4"
              onMouseEnter={() => showTooltip('intergods')}
              onMouseLeave={hideTooltip}
            >
              <img src="/images/logo.png" className="h-[30px]" />
              <span>Intergods</span>
            </a>
          </div>
          <div className="hidden md:!block group group-stake">
            <a
              href="#"
              data-tooltip-id="stake-tooltip"
              className="flex items-center gap-2"
              onMouseEnter={() => showTooltip('stake')}
              onMouseLeave={hideTooltip}
            >
              Stake
            </a>
          </div>
          <a href="#" className="hidden md:!block" onClick={openModal}>WL Checker</a>
        </div>
        <div className="hidden md:!block group group-mint">
          <a
            href="https://intergaze.xyz" target="_blank"
            data-tooltip-id="mint-tooltip"
            className="flex items-center gap-2"
            onMouseEnter={() => showTooltip('mint')}
            onMouseLeave={hideTooltip}
          >
            Mint Now <MoveRight size={16} />
          </a>
        </div>
      </div>
    </div>

    {/* Intergods Tooltip */}
    <div className={`text-nowrap absolute top-20 left-1/2 transform w-[95%] transition-all duration-100 pointer-events-none transform -translate-x-1/2 ${isTooltipActive('intergods') ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
      <div className="bg-[#222]/50 backdrop-blur-md max-w-max rounded-full p-4 px-8 font-hanson text-white">
        In InterGods, all things are interwoven.
      </div>
    </div>

    {/* Stake Tooltip */}
    <div className={`text-nowrap absolute top-20 left-1/2 transform w-[95%] transition-all duration-100 pointer-events-none transform -translate-x-1/2 ${isTooltipActive('stake') ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
      <div className="bg-[#222]/50 backdrop-blur-md max-w-max rounded-full p-4 px-8 font-hanson text-white">
        Stake in Odds Garden to earn $GOD and join the activity.
      </div>
    </div>

    {/* Mint Tooltip */}
    <div className={`text-nowrap absolute top-20 left-1/2 transform w-[95%] transition-all duration-100 pointer-events-none transform -translate-x-1/2 ${isTooltipActive('mint') ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
      <div className="bg-[#222]/50 backdrop-blur-lg max-w-max rounded-full p-4 px-8 font-hanson text-white float-end">
        You&apos;re still early
      </div>
    </div>

    <div className="absolute left-0 bottom-0 right-0 z-10 py-4">
      <Marquee speed={100}>
        {
          Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
            return (
              <div key={i} className="mx-1 flex items-center gap-2">
                <MoveRight size={16} />
                <span className="font-bold font-hanson text-[#C3C3C3]">Mint on Intergaze 25/06/2025</span>
              </div>
            )
          })
        }
      </Marquee>
    </div>
  </div>
}