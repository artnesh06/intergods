import Link from 'next/link';

export default function Footer() {
  return (
    <div className="mx-8 flex space-x-32 rounded-[36px] bg-zinc-900 bg-[url('/images/footer.png')] bg-cover p-8 shadow-xl">
      <div className="space-y-8">
        <h1 className="bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 bg-clip-text font-londrina text-4xl text-transparent">
          JPEG.HOUSE
        </h1>
        <div className="flex space-x-4">
          <Link href="#" className="bg-zinc-800 p-2 hover:bg-zinc-700">
            <img
              src="https://www.svgrepo.com/show/353655/discord-icon.svg"
              alt="Discord"
              width={24}
              height={24}
            />
          </Link>
          <Link href="#" className="bg-zinc-800 p-2 hover:bg-zinc-700">
            <img
              src="https://cdn2.iconfinder.com/data/icons/popular-social-media-flat/48/Popular_Social_Media-10-512.png"
              alt="solana"
              width={24}
              height={24}
            />
          </Link>
        </div>
        <div className="text-xs text-gray-300">
          <span>@JPEG HOUSE 2024</span>
        </div>
      </div>
      <div className="space-y-6 text-sm">
        <h1 className="font-londrina text-xl">Explore</h1>
        <div>
          <Link href="/mint" className="text-gray-300">
            Mint
          </Link>
        </div>
        <div>
          <Link href="/staking" className="text-gray-300">
            Staking
          </Link>
        </div>
        <div>
          <Link href="/raffle" className="text-gray-300">
            Raffle
          </Link>
        </div>
      </div>
      <div className="space-y-6 text-sm">
        <h1 className="font-londrina text-xl">Support</h1>
        <div>
          <Link href="/faq" className="text-gray-300">
            Faq
          </Link>
        </div>
        <div>
          <Link href="/discord" className="text-gray-300">
            Discord
          </Link>
        </div>
      </div>
      <div className="space-y-6 text-sm">
        <h1 className="font-londrina text-xl">Info</h1>
        <div>
          <Link href="/privacy" className="text-gray-300">
            Privacy Policy
          </Link>
        </div>
        <div>
          <Link href="/term" className="text-gray-300">
            Term od Use
          </Link>
        </div>
      </div>
    </div>
  );
}
