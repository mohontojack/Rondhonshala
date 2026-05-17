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
      <nav className="sticky top-0 z-50 glass border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center group-hover:rotate-6 transition-all shadow-premium border border-white/20">
               <img 
                 src="https://i.ibb.co.com/pjbz5RTt/image.png" 
                 alt="রন্ধনশালা" 
                 className="h-10 w-auto object-contain brightness-0 invert"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-display font-black text-charcoal tracking-tighter leading-none mb-1">রন্ধনশালা</h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-primary font-black opacity-60">Premium Catering</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.3em] text-charcoal/40">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "relative py-2 transition-all hover:text-primary group/nav",
                  activeTab === item.id ? "text-primary" : "text-charcoal/40"
                )}
              >
                <span className="relative z-10">{item.label}</span>
                {activeTab === item.id ? (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  />
                ) : (
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary/20 group-hover/nav:w-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] uppercase font-black text-secondary tracking-[0.2em] opacity-60">WhatsApp & Call</span>
              <span className="text-base font-black text-primary tracking-tighter">{CONTACT.phone}</span>
            </div>
            
            <button 
              onClick={() => setActiveTab('admin')}
              className={cn(
                "w-12 h-12 rounded-2xl transition-all flex items-center justify-center border",
                activeTab === 'admin' ? "bg-primary text-white border-primary shadow-premium" : "bg-white border-accent/20 text-charcoal/40 hover:text-primary hover:border-primary/40 shadow-sm"
              )}
            >
              <User className="w-5 h-5" />
            </button>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-primary hover:bg-primary/5 p-3 rounded-2xl transition-colors border border-accent/20">
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
