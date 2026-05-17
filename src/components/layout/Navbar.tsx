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
      <div className="bg-charcoal text-accent text-[9px] font-black uppercase tracking-[0.4em] py-2.5 px-4 text-center border-b border-white/5 relative z-[60]">
        <span className="opacity-70">Exclusivity: Pre-order 7 days in advance</span>
        <span className="mx-4 text-white/20">|</span>
        <span className="text-white">Friday & Saturday Delivery Only</span>
      </div>
      <nav className="sticky top-0 z-50 glass border-b border-accent/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center gap-5 cursor-pointer group" onClick={() => setActiveTab('home')}>
            <div className="h-16 w-16 bg-primary rounded-[1.5rem] flex items-center justify-center group-hover:rotate-6 transition-all shadow-premium border border-white/20 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
               <img 
                 src="https://i.ibb.co.com/pjbz5RTt/image.png" 
                 alt="রন্ধনশালা" 
                 className="h-10 w-auto object-contain brightness-0 invert relative z-10"
                 referrerPolicy="no-referrer"
               />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-3xl font-display font-black text-charcoal tracking-tighter leading-none mb-1 group-hover:text-primary transition-colors italic">রন্ধনশালা</h1>
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-4 bg-accent" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-primary font-black opacity-60">Est. 2012</p>
              </div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12 text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/30">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "relative py-2 transition-all hover:text-primary group/nav",
                  activeTab === item.id ? "text-primary" : "text-charcoal/30 font-black"
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

          <div className="flex items-center gap-8">
            <div className="hidden xl:flex flex-col items-end">
              <span className="text-[9px] uppercase font-black text-secondary tracking-[0.3em] opacity-40 mb-1 leading-none">Inquiry Hotline</span>
              <span className="text-xl font-black text-primary tracking-tighter leading-none">{CONTACT.phone}</span>
            </div>
            
            <button 
              onClick={() => setActiveTab('admin')}
              className={cn(
                "w-14 h-14 rounded-2xl transition-all flex items-center justify-center border group",
                activeTab === 'admin' ? "bg-primary text-white border-primary shadow-premium" : "bg-white border-accent/20 text-charcoal/20 hover:text-primary hover:border-primary/40 shadow-sm"
              )}
            >
              <User className={cn("w-6 h-6 transition-transform", activeTab !== 'admin' && "group-hover:scale-110")} />
            </button>

            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-primary hover:bg-primary/5 p-4 rounded-2xl transition-colors border border-accent/20 shadow-sm bg-white">
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
