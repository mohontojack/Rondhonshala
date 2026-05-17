import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { MenuItem } from '@/types';
import { 
  ShoppingBasket, Calendar, Users, Phone, MapPin, 
  CheckCircle2, Loader2, AlertCircle, Star, 
  ArrowRight, User, Plus, Minus, ShoppingCart 
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { CONTACT, EVENT_TYPES } from '@/constants';

const orderSchema = z.object({
  customerName: z.string().min(2, 'আপনার নাম লিখুন'),
  phone: z.string().regex(/^01[3-9]\d{8}$/, 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 01712345678)'),
  address: z.string().min(5, 'ডেলিভারি ঠিকানা অন্তত ৫ অক্ষরের হতে হবে'),
  eventDate: z.string().min(1, 'তারিখ নির্বাচন করুন'),
  guestCount: z.number().min(10, 'সর্বনিম্ন ১০ জন হতে হবে'),
  eventType: z.string().min(1, 'ইভেন্ট টাইপ দিন'),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

export function OrderForm() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<{ id: string; quantity: number; name: string; price: number }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      guestCount: 20,
      eventType: EVENT_TYPES[0],
    }
  });

  useEffect(() => {
    async function fetchItems() {
      try {
        const q = query(collection(db, 'menuItems'), where('isAvailable', '==', true));
        const snapshot = await getDocs(q);
        const fetchedItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
        setItems(fetchedItems);
      } catch (err) {
        console.error("Error fetching menu items:", err);
      }
    }
    fetchItems();
  }, []);

  const totalAmount = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleAddItem = (item: MenuItem) => {
    setSelectedItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, quantity: 1, name: item.name, price: item.price }];
    });
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const onSubmit = async (data: OrderFormData) => {
    if (selectedItems.length === 0) {
      setError("কমপক্ষে একটি খাবার পছন্দ করুন!");
      return;
    }
    setError(null);
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'orders'), {
        ...data,
        items: selectedItems.map(i => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
        totalAmount,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      setSubmitted(true);
      // WhatsApp Integration
      const itemSummary = selectedItems.map(i => `• ${i.name} (x${i.quantity})`).join('\n');
      const message = `নতুন অর্ডার - রন্ধনশালা\n------------------\nনাম: ${data.customerName}\nফোন: ${data.phone}\nতারিখ: ${data.eventDate}\nঅতিথি: ${data.guestCount}\nইভেন্ট: ${data.eventType}\n\nখাবারসমূহ:\n${itemSummary}\n------------------\nমোট: ৳${totalAmount}`;
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'orders');
      setError("অর্ডার সাবমিট করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-32 text-center max-w-xl mx-auto px-4">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }} 
          animate={{ scale: 1, rotate: 0 }} 
          className="w-24 h-24 bg-green-500 text-white rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-green-200"
        >
          <CheckCircle2 className="w-12 h-12" />
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-charcoal">অর্ডার সফল হয়েছে!</h2>
        <p className="text-charcoal/60 mb-12 text-lg font-light leading-relaxed">
          ধন্যবাদ! আপনার অর্ডারটি আমাদের কাছে পৌঁছেছে। খুব শীঘ্রই আমাদের প্রতিনিধি <span className="text-primary font-bold">{CONTACT.phone}</span> নম্বর থেকে আপনার সাথে যোগাযোগ করবেন।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-charcoal text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary transition-all shadow-xl active:scale-95"
          >
            আবার ফিরুন
          </button>
          <button 
            onClick={() => window.open(`https://wa.me/${CONTACT.whatsapp}`, '_blank')}
            className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            হোয়াটসঅ্যাপে আলাপ করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-cream/30 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-primary/20">Reservation Center</div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">আপনার ভোজের বুকিং দিন</h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg font-light italic">আমাদের সেরা রন্ধনশিল্পীদের হাতের জাদু আপনার মেহমানদের আপ্যায়নে।</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          {/* Order Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[60px] shadow-2xl border border-accent/10"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                       <User className="w-3 h-3" /> আপনার নাম
                    </label>
                    <div className="relative">
                       <ShoppingBasket className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40 group-focus-within:text-primary transition-colors" />
                       <input {...register('customerName')} className={cn("w-full pl-14 pr-6 py-5 rounded-[24px] bg-cream/30 border-2 focus:outline-none transition-all font-medium", errors.customerName ? "border-red-200 bg-red-50" : "border-transparent focus:border-primary focus:bg-white")} placeholder="যেমন: রহিম আহমেদ" />
                    </div>
                    {errors.customerName && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.customerName.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                       <Phone className="w-3 h-3" /> মোবাইল নম্বর
                    </label>
                    <div className="relative">
                       <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/40" />
                       <input {...register('phone')} className={cn("w-full pl-14 pr-6 py-5 rounded-[24px] bg-cream/30 border-2 focus:outline-none transition-all font-medium", errors.phone ? "border-red-200 bg-red-50" : "border-transparent focus:border-primary focus:bg-white")} placeholder="০১৭০০০০০০০০" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                     <MapPin className="w-3 h-3" /> ডেলিভারি ঠিকানা
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-6 w-5 h-5 text-primary/40" />
                    <textarea {...register('address')} rows={3} className={cn("w-full pl-14 pr-6 py-5 rounded-[24px] bg-cream/30 border-2 focus:outline-none transition-all font-medium", errors.address ? "border-red-200 bg-red-50" : "border-transparent focus:border-primary focus:bg-white")} placeholder="বিস্তারিত ঠিকানা (বাসা নং, রোড নং, এরিয়া)" />
                  </div>
                  {errors.address && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                       <Calendar className="w-3 h-3" /> অনুষ্ঠানের তারিখ
                    </label>
                    <input type="date" {...register('eventDate')} className={cn("w-full px-6 py-5 rounded-[24px] bg-cream/30 border-2 focus:outline-none transition-all font-medium cursor-pointer", errors.eventDate ? "border-red-200 bg-red-50" : "border-transparent focus:border-primary focus:bg-white")} />
                    {errors.eventDate && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.eventDate.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                       <Users className="w-3 h-3" /> অতিথি সংখ্যা
                    </label>
                    <input type="number" {...register('guestCount', { valueAsNumber: true })} className={cn("w-full px-6 py-5 rounded-[24px] bg-cream/30 border-2 focus:outline-none transition-all font-medium", errors.guestCount ? "border-red-200 bg-red-50" : "border-transparent focus:border-primary focus:bg-white")} />
                    {errors.guestCount && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2">{errors.guestCount.message}</p>}
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1 flex items-center gap-2">
                       ইভেন্ট টাইপ
                    </label>
                    <select {...register('eventType')} className="w-full px-6 py-5 rounded-[24px] bg-cream/30 border-2 border-transparent focus:outline-none focus:border-primary transition-all font-bold cursor-pointer">
                      {EVENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-4">
                  <button disabled={isSubmitting} type="submit" className="group w-full py-6 bg-primary text-white rounded-[32px] font-bold text-xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 active:scale-[0.98] relative overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <span>প্রক্রিয়াকরণ হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <span>বুকিং নিশ্চিত করুন</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                
                {error && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-3 text-red-500 bg-red-50 p-6 rounded-3xl border border-red-100 italic">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>

          {/* Cart & Items */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 md:p-12 rounded-[60px] shadow-2xl border border-accent/10 flex flex-col h-full sticky top-32"
            >
              <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-4 text-primary">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shadow-inner">
                  <ShoppingBasket className="w-7 h-7" />
                </div>
                খাবার নির্বাচন করুন
              </h3>
              
              <div className="flex-grow max-h-[350px] overflow-y-auto mb-10 pr-4 custom-scrollbar space-y-4">
                {items.length > 0 ? (
                  items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-3xl bg-cream/20 hover:bg-white hover:shadow-xl hover:border-accent/30 transition-all border border-transparent group">
                      <div className="flex items-center gap-4">
                         <div className="relative shrink-0">
                           <img src={item.imageUrl} className="w-14 h-14 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                           <div className="absolute -top-2 -left-2 bg-accent text-[8px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-widest">{item.category}</div>
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-sm text-charcoal">{item.name}</span>
                            <span className="text-xs text-primary font-black">৳{item.price}</span>
                         </div>
                      </div>
                      <button onClick={() => handleAddItem(item)} className="w-10 h-10 bg-primary/5 text-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90 flex items-center justify-center">
                         <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20">
                     <Loader2 className="w-10 h-10 text-primary/20 animate-spin mx-auto mb-4" />
                     <p className="text-charcoal/30 text-xs uppercase tracking-widest font-black">Loading Royal Menu...</p>
                  </div>
                )}
              </div>

              <div className="border-t-4 border-dashed border-accent/10 pt-10 mt-auto">
                <div className="flex items-center justify-between mb-8">
                   <p className="text-[10px] font-black text-charcoal/40 uppercase tracking-[0.2em] flex items-center gap-2">
                     <Star className="w-3 h-3 text-accent" /> সিলেক্টেড আইটেমস ({selectedItems.length})
                   </p>
                   {selectedItems.length > 0 && <button onClick={() => setSelectedItems([])} className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest transition-colors">Clear All</button>}
                </div>
                
                <div className="space-y-4 max-h-48 overflow-y-auto pr-2 mb-10">
                  <AnimatePresence mode="popLayout">
                    {selectedItems.map(item => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0, scale: 0.8 }}
                        layout
                        key={item.id} 
                        className="flex items-center justify-between bg-cream/40 p-4 rounded-3xl border border-accent/5"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-sm text-charcoal">{item.name}</span>
                          <span className="text-[10px] font-black text-primary/60 mt-0.5 tracking-wider">৳{item.price} × {item.quantity}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={() => handleRemoveItem(item.id)} className="w-8 h-8 flex items-center justify-center bg-white border border-primary/10 text-primary rounded-xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm active:scale-95"><Minus className="w-3 h-3" /></button>
                          <span className="font-black text-sm w-6 text-center text-primary">{item.quantity}</span>
                          <button onClick={() => handleAddItem(items.find(i => i.id === item.id)!)} className="w-8 h-8 flex items-center justify-center bg-white border border-primary/10 text-primary rounded-xl hover:bg-green-50 hover:text-green-600 transition-all shadow-sm active:scale-95"><Plus className="w-3 h-3" /></button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {selectedItems.length === 0 && <div className="text-center py-12 text-charcoal/20 text-xs font-black uppercase tracking-[0.2em] italic">No dishes selected yet</div>}
                </div>

                <motion.div 
                  layout
                  className="bg-charcoal text-white p-8 rounded-[40px] flex items-center justify-between shadow-3xl relative overflow-hidden group/total"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover/total:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Grand Total</span>
                    <p className="text-4xl font-display font-black tracking-tighter mt-1">৳{totalAmount}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center rotate-12 group-hover/total:rotate-0 transition-transform duration-500 relative z-10">
                     <ShoppingCart className="w-8 h-8 text-accent" />
                  </div>
                </motion.div>
                
                <p className="text-center text-[10px] text-charcoal/30 font-bold uppercase tracking-widest mt-6">৫% পেমেন্ট গেটওয়ে চার্জ প্রযোজ্য হতে পারে</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
