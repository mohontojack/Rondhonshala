import { motion } from 'motion/react';
import { Gift, Heart, Users, Briefcase, Star, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CateringPackagesProps {
  onOrderClick?: () => void;
}

export function CateringPackages({ onOrderClick }: CateringPackagesProps) {
  const packages = [
    {
      id: 'wedding',
      name: 'শাহী বিয়ে প্যাকেজ',
      icon: Heart,
      price: '৪৫০/জন',
      features: ['কাচ্চি বিরিয়ানি', 'মুরগির জাম্বো রোস্ট', 'বোরহানি ও জর্দা', 'স্পেশাল সালাদ', 'কোমল পানীয়'],
      color: 'bg-primary'
    },
    {
      id: 'birthday',
      name: 'উৎসব প্যাকেজ',
      icon: Gift,
      price: '৩৫০/জন',
      features: ['পোলাও', 'চিকেন রোস্ট', 'খাসির রেজালা', 'ফিরনি/পায়েস', 'লেবুর শরবত'],
      color: 'bg-[#FF8C00]'
    },
    {
      id: 'office',
      name: 'কর্পোরেট লাঞ্চ',
      icon: Briefcase,
      price: '২৫০/জন',
      features: ['প্লেইন রাইস/পোলাও', 'মুরগির ভুনা', 'সবজি ও ডাল', 'পাপড় ও সালাদ', 'মিনারেল ওয়াটার'],
      color: 'bg-charcoal'
    }
  ];

  return (
    <section className="py-32 bg-[#FCFAF7] relative overflow-hidden" id="packages">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full mb-8">
              <Star className="w-3.5 h-3.5 fill-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Signature Experiences</span>
            </div>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-display font-medium text-charcoal mb-8 tracking-tighter leading-[0.9]"
            >
              ক্যাটারিং <br />
              <span className="text-primary italic font-light">প্যাকেজসমূহ</span>
            </motion.h2>
          </div>
          <p className="text-charcoal/50 max-w-sm font-sans font-light text-lg leading-relaxed text-balance lg:mb-4">
            দিনাজপুরের ঐতিহ্যবাহী স্বাদ ও আধুনিক ক্যাটারিংয়ের এক অনন্য মেলবন্ধন। প্রতিটি উৎসবের জন্য আমাদের আলাদা আয়োজন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className={cn(
                "relative group flex flex-col",
                idx === 1 ? "lg:-translate-y-8" : ""
              )}
            >
               {idx === 1 && (
                 <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 bg-primary text-white text-[10px] font-black uppercase tracking-[0.4em] px-8 py-2 rounded-full shadow-premium">
                   Most Popular
                 </div>
               )}
               
               <div className="absolute inset-0 bg-charcoal/5 rounded-[4rem] group-hover:scale-105 transition-transform duration-700 blur-3xl opacity-0 group-hover:opacity-100" />
               
               <div className="relative bg-white p-12 md:p-16 rounded-[4rem] shadow-premium hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700 border border-charcoal/5 h-full flex flex-col overflow-hidden group-hover:-translate-y-4">
                <div className={`${pkg.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white mb-12 shadow-premium group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10`}>
                  <pkg.icon className="w-10 h-10" />
                </div>
                
                <div className="relative z-10 flex-grow">
                  <h3 className="text-4xl font-display font-black mb-4 tracking-tighter text-charcoal">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-12">
                    <span className="text-primary text-5xl font-black tracking-tighter">৳{pkg.price.split('/')[0]}</span>
                    <span className="text-charcoal/20 text-[10px] font-black uppercase tracking-[0.3em]">per guest</span>
                  </div>
                  
                  <div className="h-px w-full bg-charcoal/5 mb-12" />
                  
                  <ul className="space-y-6 mb-16">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-5 text-charcoal/70 group/feat">
                        <div className="w-6 h-6 rounded-lg bg-primary/5 flex items-center justify-center text-primary shrink-0 group-hover/feat:bg-primary group-hover/feat:text-white transition-all duration-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-bold tracking-tight leading-none">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto relative z-10">
                  <button 
                    onClick={onOrderClick}
                    className="w-full py-8 rounded-[2.5rem] bg-[#FCFAF7] text-charcoal font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary hover:text-white transition-all duration-500 shadow-sm border border-charcoal/5 active:scale-95 group/btn relative overflow-hidden flex items-center justify-center gap-3"
                  >
                    <span className="relative z-10">Establish Inquiry</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>

                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
