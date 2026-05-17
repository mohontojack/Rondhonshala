import { motion } from 'motion/react';
import { ChefHat, Star, Clock, Heart, ArrowRight } from 'lucide-react';

interface HeroProps {
  onMenuClick: () => void;
  onOrderClick: () => void;
}

export function Hero({ onMenuClick, onOrderClick }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547928576-96531393666b?q=80&w=2000&auto=format&fit=crop" 
          alt="Bengali Feast" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-3/5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <img 
                src="https://i.ibb.co.com/pjbz5RTt/image.png" 
                alt="Logo" 
                className="h-20 w-auto bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 mb-6"
                referrerPolicy="no-referrer"
              />
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Dinajpur's Finest</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-display font-medium text-white leading-tight mb-8"
            >
              ঘরের স্বাদ, <br />
              <span className="text-primary italic">আপনার অনুষ্ঠানে</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white/70 font-sans font-light leading-relaxed mb-10 max-w-lg"
            >
              রন্ধনশালা - দিনাজপুর সদরে প্রিমিয়াম হোমমেড ক্যাটারিং। আমরা শুধুমাত্র শুক্রবার ও শনিবার ডেলিভারি দেই। বিয়ের ভোজ, জন্মদিন ও অফিস ইভেন্টের জন্য সেরা খাবার।
            </motion.p>

            {/* Quick Features */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
            >
              {[
                'পরিচ্ছন্ন প্রস্তুতি', 
                'বিশ্বস্ত স্থানীয় সার্ভিস', 
                'কাস্টমাইজড মেনু', 
                'প্রিমিয়াম উপকরণ'
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-cream/20 flex items-center justify-center text-accent">✓</div>
                  <span className="text-sm font-medium text-white/90">{f}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap items-center gap-8"
            >
              <button 
                onClick={onOrderClick}
                className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30"
              >
                প্যাকেজ দেখুন
              </button>
              <div className="flex flex-col">
                <span className="text-xs text-white/50 uppercase tracking-tighter">সপ্তাহে ২ দিন খোলা (শুক্র-শনি)</span>
                <span className="text-xl font-bold text-accent">০১৯৬৮-৬৯৩৯৩৩</span>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:grid w-2/5 grid-cols-2 grid-rows-2 gap-4 relative">
             <div className="rounded-3xl bg-gradient-to-br from-primary to-[#600808] p-6 text-white relative overflow-hidden flex flex-col justify-between h-48">
                <span className="text-xs uppercase tracking-widest opacity-80 mb-2 block">Best Seller</span>
                <h3 className="text-2xl font-display mb-2">খাসির মাংস</h3>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold">৳৪৮০+</span>
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">+</div>
                </div>
             </div>
             <div className="rounded-3xl bg-white border border-accent/30 p-6 flex flex-col justify-between shadow-sm h-48">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                    <span className="text-secondary font-bold">🍗</span>
                  </div>
                  <span className="bg-cream border border-accent text-accent px-2 py-0.5 rounded text-[10px] uppercase font-bold">Most Loved</span>
                </div>
                <h3 className="text-xl font-display text-charcoal">মুরগির রোস্ট</h3>
             </div>
             <div className="rounded-3xl bg-cream border border-accent/30 p-6 flex flex-col justify-between h-48">
                <h3 className="text-xl font-display text-charcoal">বিফ বিরিয়ানি</h3>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300 border border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-400 border border-white"></div>
                    <div className="w-6 h-6 rounded-full bg-gray-500 border border-white"></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-600">4.9/5 Reviews</span>
                </div>
             </div>
             <div className="rounded-3xl bg-white border border-accent/30 p-6 flex flex-col justify-between shadow-sm h-48">
                <h3 className="text-xl font-display text-charcoal">মৌসুমি ভর্তা সেট</h3>
                <button className="w-full py-2 bg-accent/10 text-primary rounded-lg mt-4 text-xs font-bold uppercase tracking-wider">Add to Cart</button>
             </div>

             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-cream border-4 border-primary rounded-full flex items-center justify-center shadow-2xl z-10">
                <div className="text-primary text-center">
                  <div className="text-[10px] font-bold">SINCE</div>
                  <div className="text-lg font-display font-bold leading-none">২০১২</div>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Floating Elements (Background decoration) */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 blur-[80px] rounded-full animate-pulse" />
    </section>
  );
}
