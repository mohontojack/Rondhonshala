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
    <section className="py-24 bg-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">ক্যাটারিং প্যাকেজসমূহ</h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto font-light">আপনার বিশেষ অনুষ্ঠানের জন্য আমরা সাজিয়েছি সেরা কিছু সাশ্রয়ী প্যাকেজ।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group "
            >
               <div className="absolute inset-0 bg-primary/5 rounded-[3rem] translate-y-4 translate-x-2 group-hover:translate-y-6 group-hover:translate-x-4 transition-transform duration-500" />
               <div className="relative bg-white p-12 rounded-[3rem] shadow-premium hover:shadow-strong transition-all border border-accent/10 h-full flex flex-col">
                <div className={`${pkg.color} w-20 h-20 rounded-[2rem] flex items-center justify-center text-white mb-10 border border-white/20 shadow-xl group-hover:scale-110 transition-transform`}>
                  <pkg.icon className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-3">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-10">
                  <span className="text-primary text-4xl font-black">৳{pkg.price.split('/')[0]}</span>
                  <span className="text-charcoal/30 text-sm font-bold uppercase tracking-widest">/ জন</span>
                </div>
                
                <ul className="space-y-5 mb-12 flex-grow">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-4 text-charcoal/70">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="w-full py-5 rounded-[2rem] bg-charcoal text-white font-black uppercase tracking-widest text-xs hover:bg-primary transition-all shadow-xl shadow-charcoal/10 active:scale-95">
                  প্যাকেজটি বেছে নিন
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
