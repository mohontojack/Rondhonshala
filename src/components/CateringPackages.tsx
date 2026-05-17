import { motion } from 'motion/react';
import { Gift, Heart, Users, Briefcase, Star, CheckCircle2 } from 'lucide-react';

export function CateringPackages() {
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
    <section className="py-32 bg-[#FCFAF7] relative overflow-hidden">
      {/* Decorative background mesh */}
      <div className="absolute inset-0 bg-mesh opacity-40 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full mb-6">
            <Star className="w-3.5 h-3.5 fill-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Signature Experiences</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-charcoal mb-8 tracking-tighter">ক্যাটারিং <span className="text-primary italic">প্যাকেজসমূহ</span></h2>
          <p className="text-charcoal/50 max-w-xl mx-auto font-sans font-light text-lg leading-relaxed text-balance">দিনাজপুরের ঐতিহ্যবাহী স্বাদ ও আধুনিক ক্যাটারিংয়ের এক অনন্য মেলবন্ধন। প্রতিটি উৎসবের জন্য আমাদের আলাদা আয়োজন।</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="relative group h-full"
            >
               <div className="absolute inset-0 bg-charcoal/5 rounded-[4rem] translate-y-6 translate-x-4 group-hover:translate-y-8 group-hover:translate-x-6 transition-transform duration-700 blur-2xl" />
               <div className="relative bg-white p-14 rounded-[4rem] shadow-premium hover:shadow-strong transition-all border border-accent/20 h-full flex flex-col overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-mesh opacity-10 rounded-full group-hover:scale-150 transition-transform duration-[2000ms]" />
                
                <div className={`${pkg.color} w-24 h-24 rounded-[2.5rem] flex items-center justify-center text-white mb-12 border-4 border-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10`}>
                  <pkg.icon className="w-12 h-12" />
                </div>
                
                <div className="relative z-10 flex-grow">
                  <h3 className="text-4xl font-display font-bold mb-4 tracking-tighter">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-12">
                    <span className="text-primary text-5xl font-black tracking-tighter">৳{pkg.price.split('/')[0]}</span>
                    <span className="text-charcoal/30 text-xs font-black uppercase tracking-[0.2em]">/ per palette</span>
                  </div>
                  
                  <ul className="space-y-6 mb-16">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-5 text-charcoal/80 group/feat">
                        <div className="w-8 h-8 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover/feat:bg-accent group-hover/feat:text-white transition-colors">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-bold tracking-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-7 rounded-[2.5rem] bg-charcoal text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-primary transition-all shadow-xl shadow-charcoal/20 active:scale-95 group/btn relative overflow-hidden z-10">
                  <span className="relative z-10">Request Reservation</span>
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 opacity-20" />
                </button>

                <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                   <span className="text-[8px] font-black uppercase tracking-widest text-charcoal/20">Handcrafted by Rondhonshala</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
