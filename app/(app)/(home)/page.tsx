"use client";

import WlModal from "@/components/modal/wl-checker-modal";
import { useWlModal } from "@/hooks/useWlModal";
import { MoveRight } from "lucide-react";
import Marquee from "react-fast-marquee";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function HomePage() {

  const { isOpen, openModal, toggleModal } = useWlModal();

  return <div className="relative w-full h-full">
    <WlModal showTrigger={false} isOpen={isOpen} onOpenChange={toggleModal} />
    <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-transparent to-black z-10"></div>
    <div className="w-full h-full bg-[url('/images/background.png')] bg-cover bg-center">
    </div>

    <div className="absolute top-3 bg-[#111]/50 backdrop-blur-md rounded-full p-5 px-8 w-[98%] left-1/2 transform -translate-x-1/2 z-50">
      <div className="flex items-center justify-between text-white font-hanson">
        <div className="flex items-center gap-8">
          <div>
            <a href="#" data-tooltip-id="intergods-tooltip" className="flex items-center gap-2">Intergods</a>
            <Tooltip
              id="intergods-tooltip"
              place="top-end"
              style={{ background: 'none' }}
            >
              <div className="bg-[#111]/70 backdrop-blur-md rounded-full p-5 px-8 mt-2 font-aesthetic text-[32px]">
                InterGods is all about interwoven together.
              </div>
            </Tooltip>
          </div>
          <div>
            <a href="#" data-tooltip-id="stake-tooltip" className="flex items-center gap-2">Stake</a>
            <Tooltip
              id="stake-tooltip"
              place="top-end"
              style={{ background: 'none' }}
            >
              <div className="bg-[#111]/70 backdrop-blur-md rounded-full p-5 px-8 mt-2 font-aesthetic text-[32px]">
                Stake on Odds Garden to earn $GODS and join activity.
              </div>
            </Tooltip>
          </div>
          <a href="#" onClick={openModal}>WL Checker</a>
        </div>
        <div>
          <a href="#" data-tooltip-id="mint-tooltip" className="flex items-center gap-2">Mint Now <MoveRight size={16} /></a>
          <Tooltip
            id="mint-tooltip"
            place="top-end"
            style={{ background: 'none' }}
          >
            <div className="bg-[#111]/70 backdrop-blur-md rounded-full p-5 px-8 mt-2 font-aesthetic text-[32px]">
              YOU ARE STILL EARLY
            </div>
          </Tooltip>
        </div>
      </div>
    </div>

    <div className="absolute left-0 bottom-0 right-0 z-10 py-4">
      <Marquee speed={100}>
        {
          Array.from({ length: 15 }, (_, i) => i + 1).map(() => {
            return (
              <div className="mx-1 flex items-center gap-2">
                <MoveRight size={16} />
                <span className="font-bold font-hanson">Mint on Intergaze 25/05/2025</span>
              </div>
            )
          })
        }
      </Marquee>
    </div>
  </div>
}