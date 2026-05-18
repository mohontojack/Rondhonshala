import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs, query, orderBy, updateDoc, doc, Timestamp, deleteDoc, addDoc, where } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '@/lib/firebase';
import { Order, MenuItem } from '@/types';
import { 
  LayoutDashboard, ShoppingBag, List, Users, LogIn, LogOut, 
  Loader2, CheckCircle, Trash2, Edit3, Plus, X, 
  Clock, UtensilsCrossed, ShieldCheck, MapPin, 
  Calendar, Phone, ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';

import { STATUS_MAP, CATEGORIES } from '@/constants';

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'menu'>('orders');
  const [isAddingMenu, setIsAddingMenu] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setCheckingAdmin(true);
        try {
          // Verify if user is in admins collection
          const adminDoc = await getDocs(query(collection(db, 'admins'), where('__name__', '==', u.uid)));
          if (!adminDoc.empty) {
            setIsAdminUser(true);
            fetchData();
          } else {
            setIsAdminUser(false);
            setLoading(false);
          }
        } catch (err) {
          console.error("Admin verification failed:", err);
          setIsAdminUser(false);
          setLoading(false);
        } finally {
          setCheckingAdmin(false);
        }
      } else {
        setIsAdminUser(false);
        setCheckingAdmin(false);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const ordersSnap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
      const menuSnap = await getDocs(collection(db, 'menuItems'));
      setOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() } as Order)));
      setMenuItems(menuSnap.docs.map(d => ({ id: d.id, ...d.data() } as MenuItem)));
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'admin-data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-blocked') {
        alert('পপ-আপ ব্লক করা হয়েছে। দয়া করে পপ-আপ এলাউ করুন।');
      }
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus, updatedAt: Timestamp.now() });
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const handleDeleteItem = async (type: 'menu' | 'order', id: string) => {
    if (!confirm('আপনি কি নিশ্চিত? এটি মুছে ফেলা হবে।')) return;
    const col = type === 'menu' ? 'menuItems' : 'orders';
    try {
      await deleteDoc(doc(db, col, id));
      if (type === 'menu') setMenuItems(menuItems.filter(i => i.id !== id));
      else setOrders(orders.filter(o => o.id !== id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `${col}/${id}`);
    }
  };

  if (checkingAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-md border border-accent/10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
            <LayoutDashboard className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">অ্যাডমিন লগইন</h2>
          <p className="text-charcoal/60 mb-10 font-light italic">অ্যাডমিন প্যানেল এক্সেস করতে লগইন করুন।</p>
          <button onClick={handleLogin} className="flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all w-full justify-center shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 duration-300">
            <LogIn className="w-5 h-5" /> Google দিয়ে লগইন
          </button>
        </motion.div>
      </div>
    );
  }

  if (user && !isAdminUser) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-md border border-red-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 text-red-500">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold mb-4 text-red-600">অনুমতি নেই</h2>
          <p className="text-charcoal/60 mb-6 font-light italic">আপনার ইমেইল ({user.email}) অ্যাডমিন প্যানেলের জন্য অনুমোদিত নয়।</p>
          
          <div className="bg-cream p-4 rounded-2xl border border-accent/10 mb-8 text-left">
            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 mb-2">আপনার UID (অ্যাডমিন করার জন্য লাগবে):</p>
            <code className="text-[10px] font-mono bg-white p-2 block rounded border border-accent/5 select-all">{user.uid}</code>
          </div>

          <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-8 py-4 rounded-xl border border-red-100 transition-all w-full justify-center">
            <LogOut className="w-5 h-5" /> ভিন্ন অ্যাকাউন্টে লগইন করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-primary rounded-[32px] flex items-center justify-center text-white shadow-2xl shadow-primary/30 rotate-3">
            <LayoutDashboard className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold text-primary tracking-tight">অ্যাডমিন প্যানেল</h1>
            <p className="text-charcoal/40 text-sm font-medium mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" /> {user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={fetchData} className="p-4 bg-white border border-accent/10 text-charcoal/40 hover:text-primary hover:border-primary/40 rounded-2xl transition-all shadow-sm active:rotate-180 duration-500">
            <LayoutDashboard className="w-6 h-6" />
          </button>
          <button onClick={() => auth.signOut()} className="flex items-center gap-2 text-red-500 font-black text-sm uppercase tracking-widest hover:bg-red-50 px-6 py-3 rounded-2xl transition-all border border-transparent hover:border-red-100">
            <LogOut className="w-5 h-5" /> লগআউট 
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-10 border-b border-accent/10 pb-6 overflow-x-auto">
        <button onClick={() => setActiveSubTab('orders')} className={cn("flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all whitespace-nowrap", activeSubTab === 'orders' ? "bg-charcoal text-white shadow-xl translate-y-[-2px]" : "text-charcoal/40 hover:bg-primary/5")}>
          <ShoppingBag className={cn("w-5 h-5", activeSubTab === 'orders' ? "text-accent" : "")} /> 
          অর্ডারসমূহ <span className="bg-white/10 px-2 py-0.5 rounded-lg text-xs ml-1">{orders.length}</span>
        </button>
        <button onClick={() => setActiveSubTab('menu')} className={cn("flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition-all whitespace-nowrap", activeSubTab === 'menu' ? "bg-charcoal text-white shadow-xl translate-y-[-2px]" : "text-charcoal/40 hover:bg-primary/5")}>
          <List className={cn("w-5 h-5", activeSubTab === 'menu' ? "text-accent" : "")} /> 
          মেনু ম্যানেজমেন্ট <span className="bg-white/10 px-2 py-0.5 rounded-lg text-xs ml-1">{menuItems.length}</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-charcoal/30 text-xs font-black uppercase tracking-[0.2em]">Data Synchronizing...</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {activeSubTab === 'orders' ? (
            <motion.div key="orders" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-accent/20">
                   <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-charcoal/10" />
                   <p className="text-charcoal/40 font-bold uppercase tracking-widest text-sm">কোনো অর্ডার পাওয়া যায়নি</p>
                </div>
              ) : (
                <div className="overflow-hidden bg-white rounded-[3rem] border border-accent/10 shadow-premium">
                  <div className="hidden lg:grid grid-cols-12 gap-4 p-8 bg-charcoal text-[10px] uppercase font-black tracking-[0.2em] text-white/40">
                    <div className="col-span-3">Customer</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2 text-center">Event Date</div>
                    <div className="col-span-2 text-center">Guests</div>
                    <div className="col-span-2 text-right">Revenue</div>
                    <div className="col-span-1"></div>
                  </div>
                  {orders.map((order, idx) => (
                    <div key={order.id} className={cn("grid grid-cols-1 lg:grid-cols-12 gap-4 p-8 border-b border-accent/5 hover:bg-primary/5 transition-colors items-center", idx === orders.length - 1 && "border-0")}>
                      <div className="col-span-3 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center text-primary font-black shadow-sm shrink-0">
                           {order.customerName?.charAt(0) || 'A'}
                        </div>
                        <div>
                          <p className="font-bold text-charcoal">{order.customerName || 'Anonymous'}</p>
                          <p className="text-[10px] text-charcoal/30 flex items-center gap-1 font-mono">{order.phone}</p>
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <select 
                          value={order.status} 
                          onChange={(e) => handleStatusUpdate(order.id, e.target.value)} 
                          className={cn("px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-transparent focus:outline-none cursor-pointer transition-all w-full text-center", STATUS_MAP[order.status]?.color || "bg-gray-100 text-gray-700")}
                        >
                           {Object.entries(STATUS_MAP).map(([key, val]) => (
                             <option key={key} value={key} className="bg-white text-charcoal">{val.label}</option>
                           ))}
                        </select>
                      </div>
                      <div className="col-span-2 text-center text-xs font-bold text-charcoal/60">
                        {order.eventDate}
                      </div>
                      <div className="col-span-2 text-center">
                        <span className="bg-cream px-3 py-1 rounded-lg text-xs font-black text-primary border border-accent/10">{order.guestCount} G</span>
                      </div>
                      <div className="col-span-2 text-right">
                         <p className="text-xl font-display font-black text-primary">৳{order.totalAmount}</p>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button onClick={() => handleDeleteItem('order', order.id)} className="p-3 text-charcoal/20 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      {/* Expansion row for details if needed could go here, but keeping it mission-control style */}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
                <div>
                   <h2 className="text-2xl font-display font-bold text-charcoal">খাবার ম্যানেজমেন্ট</h2>
                   <p className="text-charcoal/40 text-sm">নতুন খাবার যোগ করুন অথবা পুরনো খাবার এডিট করুন।</p>
                </div>
                <button onClick={() => setIsAddingMenu(true)} className="w-full sm:w-auto flex items-center justify-center gap-3 bg-charcoal text-white px-10 py-5 rounded-[24px] font-bold hover:bg-primary transition-all shadow-2xl shadow-charcoal/20 active:scale-95 group">
                  <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" /> নতুন আইটেম যোগ করুন
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuItems.map(item => (
                  <div key={item.id} className="bg-white p-6 rounded-[32px] border border-accent/10 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                    <div className="flex gap-6 relative z-10">
                      <div className="shrink-0 relative">
                        <img src={item.imageUrl} className="w-24 h-24 rounded-[20px] object-cover shadow-lg border border-accent/20 group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                        <div className={cn("absolute -top-2 -left-2 w-4 h-4 rounded-full border-2 border-white shadow-sm", item.isAvailable ? "bg-green-500" : "bg-red-500")} />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-bold text-xl text-charcoal group-hover:text-primary transition-colors">{item.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-primary font-black text-lg">৳{item.price}</span>
                            <span className="text-charcoal/20 mx-1">|</span>
                            <span className="text-charcoal/40 text-[10px] uppercase font-black tracking-widest">{item.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-3 bg-cream text-charcoal/60 hover:bg-primary/10 hover:text-primary rounded-xl transition-all shadow-sm"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteItem('menu', item.id)} className="p-3 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                    {/* Background faint text deco */}
                    <div className="absolute -bottom-4 -right-2 text-[60px] font-black text-charcoal/[0.02] select-none pointer-events-none truncate uppercase leading-none">
                       {item.category}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Add Menu Modal */}
      <AnimatePresence>
        {isAddingMenu && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4">
             <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="bg-white w-full max-w-xl rounded-[60px] p-10 md:p-14 relative shadow-3xl text-charcoal">
                <button onClick={() => setIsAddingMenu(false)} className="absolute top-8 right-8 p-3 hover:bg-primary/5 rounded-2xl transition-colors"><X className="w-6 h-6 text-charcoal/40" /></button>
                
                <div className="mb-10 text-center">
                   <h2 className="text-3xl font-display font-bold mb-2">নতুন আইটেম যোগ করুন</h2>
                   <p className="text-charcoal/40 text-sm font-light">মেনুতে একটি সুস্বাদু পদের এন্ট্রি দিন।</p>
                </div>

                <form className="space-y-8" onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as any;
                  const newItem = {
                    name: form.name.value,
                    price: Number(form.price.value),
                    category: form.category.value,
                    description: form.description.value,
                    imageUrl: form.imageUrl.value || 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=400',
                    isAvailable: true
                  };
                  try {
                    await addDoc(collection(db, 'menuItems'), newItem);
                    fetchData();
                    setIsAddingMenu(false);
                  } catch (err) {
                    console.error("Failed to add menu item:", err);
                    alert("সমস্যা হয়েছে! আপনি কি অ্যাডমিন?");
                  }
                }}>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">খাবারের নাম</label>
                    <input name="name" required className="w-full p-5 rounded-[24px] bg-cream/50 border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all font-bold" placeholder="যেমন: খাসির লেগ রোস্ট" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">দাম (৳)</label>
                      <input name="price" type="number" required className="w-full p-5 rounded-[24px] bg-cream/50 border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all font-bold" placeholder="যেমন: ৩৫০" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">ক্যাটাগরি</label>
                      <select name="category" className="w-full p-5 rounded-[24px] bg-cream/50 border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all font-bold cursor-pointer">
                        {CATEGORIES.filter(c => c !== 'সব').map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">সংক্ষিপ্ত বর্ণনা</label>
                    <textarea name="description" rows={2} className="w-full p-5 rounded-[24px] bg-cream/50 border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all font-medium" placeholder="খাবারের উপকরণ বা চমৎকার কোনো কথা..." />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">ছবি URL (Unsplash/ImgBB)</label>
                    <input name="imageUrl" className="w-full p-5 rounded-[24px] bg-cream/50 border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all text-xs font-mono" placeholder="https://images.unsplash.com/..." />
                  </div>

                  <button type="submit" className="w-full py-6 bg-charcoal text-white rounded-[24px] font-bold text-lg shadow-2xl shadow-charcoal/20 hover:bg-primary transition-all active:scale-[0.98]">মেনুতে যোগ করুন</button>
                </form>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

