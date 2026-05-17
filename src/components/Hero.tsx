import { motion } from 'motion/react';
import { ChefHat, Star, Clock, Heart, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { CONTACT } from '@/constants';

interface HeroProps {
  onMenuClick: () => void;
  onOrderClick: () => void;
}

export function Hero({ onMenuClick, onOrderClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal">
      {/* Cinematic Background with Zoom Effect */}
      <div className="absolute inset-0 z-0 scale-110 animate-slow-zoom">
        <img 
          src="https://images.unsplash.com/photo-1547928576-96531393666b?q=80&w=2000&auto=format&fit=crop" 
          alt="Bengali Feast" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 glass-dark rounded-full mb-10 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(212,175,55,1)]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Dinajpur's Culinary Heritage</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-7xl md:text-8xl lg:text-[110px] font-display font-medium text-white leading-[0.85] mb-12 tracking-tighter"
            >
              ঘরের স্বাদ, <br />
              <span className="text-accent italic font-light drop-shadow-2xl">এখন উৎসবে।</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/60 font-sans font-light leading-relaxed mb-16 max-w-xl text-balance"
            >
              রন্ধনশালা - দিনাজপুরের খাঁটি ঘরোয়া স্বাদের প্রিমিয়াম ক্যাটারিং। আমরা শুধুমাত্র শুক্র ও শনিবার ডেলিভারি দিই, যাতে প্রতিটি পদ পান একদম তাজা ও নিখুঁত।
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-12"
            >
              <button 
                onClick={onOrderClick}
                className="group relative bg-primary text-white px-14 py-6 rounded-full font-black text-xl hover:bg-primary/90 transition-all shadow-[0_20px_60px_rgba(142,22,22,0.5)] hover:-translate-y-2 active:translate-y-0 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 decoration-white/30 tracking-tight">
                  প্যাকেজ দেখুন <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
              </button>
              
              <div className="flex flex-col">
                <span className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em] mb-2 leading-none">Order Direct</span>
                <span className="text-3xl font-black text-white tracking-tighter decoration-accent/40 decoration-2 underline-offset-8 underline transition-all hover:text-accent cursor-pointer italic leading-none">
                  {CONTACT.phone}
                </span>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.4, type: 'spring' }}
              className="relative z-20 group"
            >
              <div className="absolute -inset-10 bg-primary/20 blur-[100px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-1000 animate-pulse" />
              <img 
                src="https://i.ibb.co.com/pvPHh7z4/Chat-GPT-Image-May-17-2026-02-47-17-AM.png" 
                alt="Signature Bengali Platter" 
                className="w-full h-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] animate-float relative z-10"
                referrerPolicy="no-referrer"
              />
              
              {/* Floating Circular Badge */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-48 h-48 z-30 hidden md:block"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
                  <path id="circleTextPath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent" />
                  <text className="text-[9px] font-black uppercase tracking-[0.5em] fill-white">
                    <textPath xlinkHref="#circleTextPath">
                      Authentic Dinajpur Taste • 100% Homemade • Friday-Saturday Exclusive •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/5 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/10 shadow-strong">
                     <ChefHat className="w-10 h-10 text-accent" />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Heritage Logo Floating Perspective Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="absolute -bottom-12 -left-12 z-30 glass p-10 rounded-[3rem] shadow-strong border border-white/20 animate-float backdrop-blur-3xl"
              style={{ animationDelay: '1.5s' }}
            >
              <img 
                src="https://i.ibb.co.com/pjbz5RTt/image.png" 
                alt="Rondhonshala Heritage Logo" 
                className="h-20 w-auto"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6 pt-6 border-t border-charcoal/5 flex justify-between items-end gap-12">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary block leading-none mb-1">Established</span>
                  <span className="text-xl font-display font-black text-charcoal">২০১২</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase tracking-widest text-secondary block leading-none mb-1">Cuisines</span>
                  <span className="text-sm font-bold text-charcoal">Traditional</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
