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
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
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
                className="h-24 w-auto bg-white/10 backdrop-blur-md p-5 rounded-[2rem] border border-white/20 mb-8 animate-float"
                referrerPolicy="no-referrer"
              />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Dinajpur's Heritage</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl lg:text-[100px] font-display font-medium text-white leading-[0.9] mb-10 tracking-tighter"
            >
              ঘরের স্বাদ, <br />
              <span className="text-primary italic font-light drop-shadow-2xl">আপনার অনুষ্ঠানে</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-white/80 font-sans font-light leading-relaxed mb-12 max-w-xl text-balance"
            >
              রন্ধনশালা - দিনাজপুর সদরে প্রিমিয়াম হোমমেড ক্যাটারিং। আমরা শুধুমাত্র শুক্রবার ও শনিবার ডেলিভারি দেই। বিয়ের ভোজ, জন্মদিন ও অফিস ইভেন্টের জন্য সেরা খাবার।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-wrap items-center gap-10"
            >
              <button 
                onClick={onOrderClick}
                className="group relative bg-primary text-white px-12 py-5 rounded-[2rem] font-bold text-xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 hover:-translate-y-1 active:translate-y-0 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  প্যাকেজ দেখুন <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1">সপ্তাহে ২ দিন খোলা (শুক্র-শনি)</span>
                <span className="text-2xl font-black text-accent tracking-tighter decoration-primary decoration-2 underline-offset-8 transition-colors">০১৯৬৮-৬৯৩৯৩৩</span>
              </div>
            </motion.div>
          </div>

          <div className="hidden lg:grid w-2/5 grid-cols-2 grid-rows-2 gap-6 relative">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1 }}
               className="rounded-[2.5rem] bg-gradient-to-br from-primary to-[#600808] p-8 text-white relative overflow-hidden flex flex-col justify-between h-56 shadow-strong"
             >
                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-widest font-black opacity-60 mb-2 block">Best Seller</span>
                  <h3 className="text-3xl font-display mb-2">খাসির মাংস</h3>
                </div>
                <div className="flex justify-between items-end relative z-10">
                  <span className="text-2xl font-black">৳৪৮০+</span>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-colors cursor-pointer">+</div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.2 }}
               className="rounded-[2.5rem] bg-white border border-accent/20 p-8 flex flex-col justify-between shadow-premium h-56 hover:shadow-strong transition-all"
             >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 bg-secondary/10 rounded-3xl flex items-center justify-center text-2xl">
                    🍗
                  </div>
                  <span className="bg-cream border border-accent/30 text-accent px-3 py-1 rounded-full text-[9px] uppercase font-black tracking-widest">Most Loved</span>
                </div>
                <h3 className="text-2xl font-display text-charcoal">মুরগির রোস্ট</h3>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.4 }}
               className="rounded-[2.5rem] bg-cream border border-accent/20 p-8 flex flex-col justify-between h-56 shadow-premium hover:shadow-strong transition-all"
             >
                <div>
                  <h3 className="text-2xl font-display text-charcoal mb-4">বিফ বিরিয়ানি</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className={`w-8 h-8 rounded-full border-2 border-cream object-cover bg-gray-${i*100+200}`}></div>
                      ))}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">4.9/5 Reviews</span>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">★</div>
                </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.6 }}
               className="rounded-[2.5rem] bg-white border border-accent/20 p-8 flex flex-col justify-between shadow-premium h-56 hover:shadow-strong transition-all overflow-hidden relative"
             >
                <h3 className="text-2xl font-display text-charcoal relative z-10">মৌসুমি ভর্তা সেট</h3>
                <button className="w-full py-3 bg-accent text-white rounded-2xl relative z-10 text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform">Add to Cart</button>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/5 rounded-full" />
             </motion.div>

             <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-cream border-4 border-primary rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(142,22,22,0.3)] z-20 animate-float">
                <div className="text-primary text-center">
                  <div className="text-[11px] font-black uppercase tracking-widest opacity-60">SINCE</div>
                  <div className="text-2xl font-display font-black leading-none">২০১২</div>
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
