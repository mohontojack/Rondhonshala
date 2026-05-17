import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MenuItem } from '@/types';
import { ShoppingCart, Plus, Minus, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

import { CATEGORIES } from '@/constants';

export function MenuSection() {
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
    { id: '1', name: 'খাসির রেজালা', price: 250, category: 'মাংস', description: 'স্পেশাল মশলা দিয়ে শাহী রেজালা', imageUrl: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=400', isAvailable: true },
    { id: '2', name: 'মুরগির রোস্ট', price: 120, category: 'মাংস', description: 'দেশি মুরগির ঘিয়ে ভাজা রোস্ট', imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=400', isAvailable: true },
    { id: '3', name: 'কাচ্চি বিরিয়ানি', price: 350, category: 'বিরিয়ানি', description: 'বাসমতী চালে খাঁটি খাসির কাচ্চি', imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=400', isAvailable: true },
    { id: '4', name: 'রুই মাছের দোপেঁয়াজো', price: 100, category: 'মাছ', description: 'তাজা রুই মাছের ঝাল ভুনা', imageUrl: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=400', isAvailable: true },
  ].filter(i => filter === 'সব' || i.category === filter);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">আমাদের স্পেশাল মেনু</h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto font-light">প্রতিটি পদ আমরা তৈরি করি সেরা উপকরণ ও ভালোবাসা দিয়ে। আপনার পছন্দের আইটেমটি বেছে নিন।</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-6 py-2 rounded-full font-medium transition-all",
                filter === cat ? "bg-primary text-white shadow-lg" : "bg-primary/5 text-charcoal hover:bg-primary/10"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-[32px] overflow-hidden border border-accent/20 hover:border-primary/40 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-accent/30">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-charcoal group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-charcoal/50 text-sm font-light mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-accent/10">
                  <span className="text-2xl font-display font-black text-primary">৳{item.price}</span>
                  <button className="p-3 bg-accent/10 text-primary rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95">
                    <Plus className="w-5 h-5" />
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
