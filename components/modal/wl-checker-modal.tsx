'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import Confetti from 'react-confetti';

interface WlModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  showTrigger?: boolean;
}

export default function WlModal({
  isOpen,
  onOpenChange,
  showTrigger = true
}: WlModalProps) {
  const [address, setAddress] = useState('');
  const [isWhitelisted, setIsWhitelisted] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const { toast } = useToast();

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const checkWhitelist = async () => {
    if (!address || !address.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: (
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Please enter a valid address
          </div>
        )
      });
      return;
    }

    setIsLoading(true);
    setIsWhitelisted(null);

    try {
      const response = await fetch(`/api/check?address=${address.trim()}`);
      const data = await response.json();

      if (response.ok) {
        setIsWhitelisted(data.isWhitelisted);

        if (data.isWhitelisted) {
          setShowConfetti(true);
          toast({
            title: 'Congratulations!',
            description: (
              <div className="flex items-center">
                <CheckCircle2 className="mr-2 h-5 w-5" />
                Your address is whitelisted! 🎉
              </div>
            ),
            className: 'bg-green-700 border-green-800 text-white'
          });
          // Hide confetti after 5 seconds
          setTimeout(() => setShowConfetti(false), 5000);
        } else {
          toast({
            variant: 'destructive',
            title: 'Not Whitelisted',
            description: (
              <div className="flex items-center">
                <XCircle className="mr-2 h-5 w-5" />
                Sorry, your address is not on the whitelist.
              </div>
            )
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: (
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              {data.error || 'Failed to check address'}
            </div>
          )
        });
      }
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Server Error',
        description: (
          <div className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5" />
            Error connecting to server
          </div>
        )
      });
      console.error('Error checking whitelist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Confetti positioned fixed to cover entire viewport */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
          />
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        {showTrigger && (
          <DialogTrigger asChild>
            <button className="mt-4 w-full rounded-[12px] bg-cyan-400 py-2 font-miltonian text-xl text-black hover:bg-cyan-500 md:text-2xl">
              WHITELIST CHECKER
            </button>
          </DialogTrigger>
        )}
        <DialogContent className="max-w-[90%] rounded-[50px] p-0 sm:max-w-[750px]">
          <div className="md:px-34 flex flex-col items-center justify-center rounded-[50px] bg-[#222]/50 backdrop-blur-md p-8 px-10 md:px-24 md:p-16 md:pb-28">
            <span className="text-lg font-hanson text-[#F2FF7F]">
              Whitelist checker
            </span>
            <div className="hidden md:!block text-lg mt-2 mb-6 font-hanson text-center">
              Enter you address here
            </div>
            <div className="md:!hidden text-lg mt-2 font-hanson text-center">
              Enter you
            </div>
            <div className="md:!hidden text-lg mb-6 font-hanson text-center">
              address here
            </div>

            <Input
              className="border-none bg-[#616161] rounded-full text-center text-lg text-[#C3C3C3] font-bold font-hanson"
              placeholder="0x..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              className="mt-4 w-full rounded-full bg-white py-2 font-bold text-black hover:bg-gray-100 font-hanson disabled:cursor-not-allowed disabled:bg-gray-400 md:text-lg"
              onClick={checkWhitelist}
              disabled={isLoading}
            >
              {isLoading ? 'Checking...' : 'Check Now'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
