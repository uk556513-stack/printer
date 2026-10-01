import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { QrCode } from 'lucide-react';

const receiptsData = [
  {
    type: 'ticket',
    id: '0128034399434',
    title: 'Thank you!',
    subtitle: 'Your ticket has been issued successfully',
    amount: '$99.99',
    date: '19 Aug 2026 - 20:17',
    status: 'CONFIRMED',
    name: 'Usman Shams',
    card: '•••• 8237',
    logoType: 'icon',
    printerColor: 'from-amber-500 via-amber-400 to-amber-500',
    printerBorder: 'border-amber-600',
    bgImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    type: 'apple',
    id: 'W164210491823',
    receiptNo: 'AAP-8042704',
    title: 'Apple Store',
    subtitle: '5th Avenue • New York',
    amount: '$1,199.00',
    date: '19 Aug 2026 - 20:17',
    status: 'PAID IN FULL',
    name: 'Usman Shams',
    card: 'Apple Pay •••• 9012',
    logoType: 'apple',
    printerColor: 'from-slate-700 via-slate-600 to-slate-700',
    printerBorder: 'border-slate-800',
    bgImage: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=1200&q=80'
  },
  {
    type: 'cafe',
    id: 'CF-84920418',
    tableNo: 'Table #08 • Order Ready',
    title: 'Artisan Roasters',
    subtitle: 'Fresh Brew & Bakery',
    amount: '$14.50',
    date: '19 Aug 2026 - 20:17',
    status: 'SERVED',
    name: 'Usman Shams',
    card: 'VISA •••• 4152',
    logoType: 'cafe',
    printerColor: 'from-sky-700 via-sky-600 to-sky-700',
    printerBorder: 'border-sky-800',
    bgImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function ReceiptPrinter() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const triggerConfetti = () => {
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.45 },
      colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899']
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % receiptsData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentReceipt = receiptsData[currentIndex];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#a3c299] p-4 overflow-hidden">
      
      {/* Outer Preview Card Frame with Blur Background */}
      <div className="relative w-[360px] h-[480px] rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-start border border-black/10">
        
        {/* Dynamic Blurred Background Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={currentReceipt.bgImage}
            src={currentReceipt.bgImage}
            alt="background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover filter blur-md brightness-75 scale-110 z-0"
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Printer Slot Machine */}
        <div className={`relative z-20 top-6 w-72 h-8 bg-gradient-to-r ${currentReceipt.printerColor} rounded-lg shadow-md border-b-2 ${currentReceipt.printerBorder} flex items-center justify-center transition-colors duration-500`}>
          <div className="w-60 h-2 bg-black/50 rounded-full shadow-inner" />
        </div>

        {/* Printing Receipt Area */}
        <div className="relative z-10 top-6 w-72 h-[380px] overflow-hidden flex justify-center">
          <AnimatePresence mode="wait" onExitComplete={triggerConfetti}>
            <motion.div
              key={currentReceipt.id}
              initial={{ y: -350, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 380, opacity: 0, rotate: 2 }}
              transition={{ duration: 1.3, ease: [0.25, 1, 0.5, 1] }}
              className="w-64 bg-white rounded-b-lg shadow-xl p-4 flex flex-col justify-between border-t border-gray-100"
            >
              {/* Header Logos & Titles */}
              <div className="text-center">
                {currentReceipt.logoType === 'icon' && (
                  <div className="w-7 h-7 mx-auto mb-1 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">
                    🎟
                  </div>
                )}
                {currentReceipt.logoType === 'apple' && (
                  <div className="text-xl mb-0.5 text-black font-bold"></div>
                )}
                {currentReceipt.logoType === 'cafe' && (
                  <div className="w-7 h-7 mx-auto mb-1 rounded-full bg-amber-800 text-white flex items-center justify-center font-bold text-xs">
                    ☕
                  </div>
                )}

                <h2 className="text-lg font-bold text-slate-800 leading-tight">{currentReceipt.title}</h2>
                <p className="text-[10px] text-gray-400 mt-0.5">{currentReceipt.subtitle}</p>
                {currentReceipt.tableNo && (
                  <p className="text-[9px] text-gray-400 font-medium">{currentReceipt.tableNo}</p>
                )}
              </div>

              {/* ID & Amount Section */}
              <div className="flex justify-between items-start mt-2 text-left">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider block font-semibold">
                    {currentReceipt.type === 'apple' ? 'ORDER NO' : currentReceipt.type === 'cafe' ? 'ORDER ID' : 'TICKET ID'}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-800">{currentReceipt.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider block font-semibold">AMOUNT</span>
                  <span className="text-sm font-extrabold text-slate-900">{currentReceipt.amount}</span>
                </div>
              </div>

              {/* Date & Status Section */}
              <div className="flex justify-between items-center my-1.5 text-left">
                <div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider block font-semibold">DATE & TIME</span>
                  <span className="text-[11px] font-semibold text-slate-700">{currentReceipt.date}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-400 uppercase tracking-wider block font-semibold mb-0.5">STATUS</span>
                  <span className={`inline-block text-[8px] font-bold px-2 py-0.5 rounded-full ${
                    currentReceipt.status === 'PAID IN FULL' 
                      ? 'text-blue-700 bg-blue-100' 
                      : currentReceipt.status === 'SERVED' 
                      ? 'text-emerald-700 bg-emerald-100' 
                      : 'text-teal-700 bg-teal-100'
                  }`}>
                    {currentReceipt.status}
                  </span>
                </div>
              </div>

              {/* User Details */}
              <div className="my-1 pt-1.5 border-t border-dashed border-gray-200">
                <p className="text-xs font-bold text-slate-800">{currentReceipt.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {currentReceipt.type === 'ticket' && (
                    <div className="flex -space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 opacity-80" />
                    </div>
                  )}
                  <span className="text-[10px] text-gray-500 font-mono">{currentReceipt.card}</span>
                </div>
              </div>

              {/* Bottom Element (QR Code for Apple, SVG Barcode for Others) */}
              <div className="mt-1 pt-1 border-t border-gray-100 text-center">
                {currentReceipt.type === 'apple' ? (
                  <div className="flex flex-col items-center py-1">
                    <QrCode className="w-10 h-10 text-slate-800" />
                    <span className="text-[7px] text-gray-400 font-mono mt-0.5">SCAN TO VERIFY AUTHENTICITY</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-full h-8 mx-auto" viewBox="0 0 200 40">
                      <rect x="0" y="0" width="4" height="40" fill="#1e293b" />
                      <rect x="6" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="12" y="0" width="6" height="40" fill="#1e293b" />
                      <rect x="22" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="28" y="0" width="4" height="40" fill="#1e293b" />
                      <rect x="36" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="42" y="0" width="8" height="40" fill="#1e293b" />
                      <rect x="54" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="60" y="0" width="4" height="40" fill="#1e293b" />
                      <rect x="68" y="0" width="6" height="40" fill="#1e293b" />
                      <rect x="78" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="84" y="0" width="4" height="40" fill="#1e293b" />
                      <rect x="92" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="98" y="0" width="6" height="40" fill="#1e293b" />
                      <rect x="108" y="0" width="4" height="40" fill="#1e293b" />
                      <rect x="116" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="122" y="0" width="6" height="40" fill="#1e293b" />
                      <rect x="132" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="138" y="0" width="4" height="40" fill="#1e293b" />
                      <rect x="146" y="0" width="8" height="40" fill="#1e293b" />
                      <rect x="158" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="164" y="0" width="4" height="40" fill="#1e293b" />
                      <rect x="172" y="0" width="6" height="40" fill="#1e293b" />
                      <rect x="182" y="0" width="2" height="40" fill="#1e293b" />
                      <rect x="188" y="0" width="4" height="40" fill="#1e293b" />
                      <rect x="196" y="0" width="4" height="40" fill="#1e293b" />
                    </svg>
                    <span className="text-[8px] text-gray-400 font-mono tracking-widest block">
                      2 8917261 273618
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}