import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MenuItem } from '@/types';
import { ShoppingCart, Plus, Minus, Info, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

import { CATEGORIES } from '@/constants';

interface MenuSectionProps {
  onOrderClick?: () => void;
}

export function MenuSection({ onOrderClick }: MenuSectionProps) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('সব');

  const categories = CATEGORIES;

  useEffect(() => {
    async function fetchItems() {
      try {
        const q = query(collection(db, 'menuItems'), where('isAvailable', '==', true));
        const snapshot = await getDocs(q);
        const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
        setItems(fetchedItems);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, []);

  const filteredItems = filter === 'সব' ? items : items.filter(i => i.category === filter);

  // Mock items if none in DB initially
  const displayItems = items.length > 0 ? filteredItems : [
    { id: '1', name: 'খাসির রেজালা (দিনাজপুর স্পেশাল)', price: 280, category: 'মাংস', description: 'দিনাজপুরের ঐতিহ্যবাহী মশলায় রান্না করা শাহী খাসির রেজালা।', imageUrl: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=400', isAvailable: true },
    { id: '2', name: 'দেশি মুরগির রোস্ট', price: 150, category: 'মাংস', description: 'দেশি মুরগির ঘিয়ে ভাজা মুচমুচে রোস্ট।', imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400', isAvailable: true },
    { id: '3', name: 'কাচ্চি বিরিয়ানি (বাসমতী)', price: 380, category: 'বিরিয়ানি', description: 'খাঁটি বাসমতী চালে রান্না করা প্রিমিয়াম খাসির কাচ্চি।', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400', isAvailable: true },
    { id: '4', name: 'চিনিগুঁড়া পোলাও ও মুরগি ভুনা', price: 220, category: 'বিরিয়ানি', description: 'দিনাজপুরের বিখ্যাত চিনিগুঁড়া চালের পোলাও।', imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=400', isAvailable: true },
    { id: '5', name: 'রুই মাছের রাজকীয় ভুনা', price: 120, category: 'মাছ', description: 'আড়িয়াল বিলের তাজা রুই মাছের ঝাল ভুনা।', imageUrl: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=400', isAvailable: true },
    { id: '6', name: 'সবজি মালাই কারি', price: 80, category: 'সবজি', description: 'নানা পদের টাটকা সবজির নারিকেলি স্বাদ।', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400', isAvailable: true },
  ].filter(i => filter === 'সব' || i.category === filter);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-primary/10 text-primary rounded-full border border-primary/20 mb-6">
            <UtensilsCrossed className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Pure Taste</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-charcoal mb-6 tracking-tight text-balance">আমাদের <span className="text-primary italic">স্পেশাল মেনু</span></h2>
          <p className="text-charcoal/50 max-w-xl mx-auto font-sans font-light text-lg leading-relaxed">প্রতিটি পদ আমরা তৈরি করি সেরা উপকরণ ও ভালোবাসা দিয়ে। আপনার পছন্দের আইটেমটি বেছে নিন।</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-20 px-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all border",
                filter === cat 
                  ? "bg-primary text-white border-primary shadow-premium scale-105" 
                  : "bg-white text-charcoal border-accent/20 hover:border-primary/40 hover:text-primary shadow-sm"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-accent/10 hover:border-primary/20 shadow-premium hover:shadow-strong transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden shrink-0">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6">
                  <span className="glass-dark text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-2xl font-display font-medium text-charcoal group-hover:text-primary transition-colors leading-tight mb-3">{item.name}</h3>
                  <p className="text-charcoal/40 text-xs font-light line-clamp-2 leading-relaxed mb-6 italic">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-accent/5">
                  <span className="text-3xl font-display font-black text-primary tracking-tighter">৳{item.price}</span>
                  <button 
                    onClick={onOrderClick}
                    className="w-12 h-12 bg-cream text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95 border border-accent/10 flex items-center justify-center group/btn"
                  >
                    <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {displayItems.length === 0 && !loading && (
          <div className="text-center py-20 text-charcoal/40">
            <Info className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-xl">এই মূহুর্তে এই ক্যাটাগরিতে কোনো খাবার নেই।</p>
          </div>
        )}
      </div>
    </section>
  );
}
