import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, UtensilsCrossed, ShoppingBag, Image as ImageIcon, MessageSquare, ShieldCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebase';

import { CONTACT } from '@/constants';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'হোম', icon: UtensilsCrossed },
    { id: 'menu', label: 'মেনু', icon: ShoppingBag },
    { id: 'packages', label: 'প্যাকেজ', icon: UtensilsCrossed },
    { id: 'order', label: 'অর্ডার', icon: ShoppingBag },
    { id: 'gallery', label: 'গ্যালারি', icon: ImageIcon },
    { id: 'reviews', label: 'রিভিউ', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Operation Notice Banner */}
      <div className="bg-primary text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest py-2 px-4 text-center border-b border-accent/20">
        অর্ডার গ্রহণ চলছে: শুধুমাত্র শুক্রবার ও শনিবার ডেলিভারি | ইভেন্টের অন্তত ৭ দিন আগে অর্ডার করুন
      </div>
      <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
               <img 
                 src="https://i.ibb.co.com/pjbz5RTt/image.png" 
                 alt="রন্ধনশালা" 
                 className="h-8 w-auto object-contain"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-primary tracking-tight leading-none">রন্ধনশালা</h1>
              <p className="text-[9px] uppercase tracking-widest text-secondary font-bold">Premium Home Catering</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-charcoal/60">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "relative py-1 transition-all hover:text-primary",
                  activeTab === item.id ? "text-primary" : "text-charcoal/60 hover:translate-y-[-1px]"
                )}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end border-r border-accent/20 pr-4 mr-1">
              <span className="text-[10px] uppercase font-bold text-secondary tracking-widest">WhatsApp & Call</span>
              <span className="text-sm font-bold text-primary">{CONTACT.phone}</span>
            </div>
            
            <button 
              onClick={() => setActiveTab('admin')}
              className={cn(
                "p-2 rounded-full transition-all flex items-center gap-2",
                activeTab === 'admin' ? "bg-primary text-white" : "bg-primary/5 text-primary hover:bg-primary/10"
              )}
            >
              <User className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold hidden xl:block">Admin</span>
            </button>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-primary hover:bg-primary/5 p-2 rounded-lg transition-colors">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-accent/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    activeTab === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-charcoal hover:bg-primary/5"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </div>
  );
}
