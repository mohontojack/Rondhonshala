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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group bg-white p-10 rounded-[48px] shadow-sm hover:shadow-2xl transition-all border border-accent/20"
            >
              <div className={`${pkg.color} w-16 h-16 rounded-[24px] flex items-center justify-center text-white mb-8 border-2 border-accent/20 shadow-lg group-hover:rotate-6 transition-transform`}>
                <pkg.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">{pkg.name}</h3>
              <p className="text-primary text-3xl font-black mb-8">৳{pkg.price}</p>
              
              <ul className="space-y-4 mb-12">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-charcoal/70 font-light">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 rounded-2xl bg-charcoal text-white font-bold hover:bg-primary transition-all shadow-lg">
                প্যাকেজটি বেছে নিন
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
