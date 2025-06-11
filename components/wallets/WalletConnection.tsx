'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { UserNav } from '../layout/user-nav';
import { useRouter } from 'next/navigation';

//handle wallet balance fixed to 2 decimal numbers without rounding
export function toFixed(num: number, fixed: number): string {
  const re = new RegExp(`^-?\\d+(?:\\.\\d{0,${fixed || -1}})?`);
  return num.toString().match(re)![0];
}

const WalletConnection = () => {
  const { connection } = useConnection();
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();

  const [open, setOpen] = useState<boolean>(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [userWalletAddress, setUserWalletAddress] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      'confirmed'
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (info) {
        setBalance(info?.lamports / LAMPORTS_PER_SOL);
      }
    });
  }, [publicKey, connection]);

  useEffect(() => {
    setUserWalletAddress(publicKey?.toBase58()!);
  }, [publicKey]);

  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
        setOpen(false);
      } catch (error) {
        console.log('wallet connection err : ', error);
      }
    }
  };

  const handleDisconnect = async () => {
    disconnect();
  };

  return (
    <div className="text-white">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-2">
          {!publicKey ? (
            <>
              <DialogTrigger asChild>
                <Button
                  variant={'secondary'}
                  className="z-50 w-full bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 text-black"
                >
                  {connecting ? 'connecting...' : 'Connect Wallet'}
                </Button>
              </DialogTrigger>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={'secondary'}
                  className="flex gap-2 bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 text-black"
                >
                  <div className="">
                    <div className=" w-[75px] truncate  ">
                      {publicKey.toBase58()}
                    </div>
                  </div>
                  {balance ? (
                    <div>{toFixed(balance, 2)} SOL</div>
                  ) : (
                    <div>0 SOL</div>
                  )}
                  <UserNav />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0">
                <DropdownMenuItem className="flex flex-col justify-center p-0">
                  <div className="w-full rounded rounded-md border hover:border-slate-900">
                    <Button
                      variant={'secondary'}
                      className="z-50 w-full bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 text-black"
                      onClick={handleDisconnect}
                    >
                      Disconnect
                    </Button>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DialogContent
            className="max-w-[450px] bg-black "
            style={{
              borderRadius: '12px'
            }}
          >
            <DialogHeader>
              <div className="font-slackey text-[20px] text-white">
                Select Wallet
              </div>
            </DialogHeader>
            <div className="flex w-full items-center ">
              <div className="flex w-full flex-col items-center justify-start space-y-3 overflow-y-auto">
                {wallets.map((wallet) => (
                  <Button
                    key={wallet.adapter.name}
                    //onClick={() => select(wallet.adapter.name)}
                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                    variant={'ghost'}
                    className="font-slackey group flex h-[40px] w-full items-center justify-start p-4 py-6 text-[20px] text-white hover:text-white"
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex">
                        <div className="flex">
                          <Image
                            src={wallet.adapter.icon}
                            alt={wallet.adapter.name}
                            height={30}
                            width={30}
                            className="mr-5 "
                          />
                        </div>
                        <div className="font-slackey wallet-name text-[20px] text-white">
                          {wallet.adapter.name}
                        </div>
                      </div>
                      <div className="hidden group-hover:block">
                        <ChevronRight />
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletConnection;
