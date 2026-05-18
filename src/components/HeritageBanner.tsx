import { motion } from 'motion/react';
import { ChefHat, Award, ShieldCheck, Heart } from 'lucide-react';

const highlights = [
  {
    icon: ChefHat,
    title: 'বিশুদ্ধতা',
    desc: 'আমরা সরাসরি দিনাজপুর থেকে সংগৃহীত খাঁটি মশলা ব্যবহার করি।'
  },
  {
    icon: Award,
    title: 'সেরা স্বাদ',
    desc: 'আমাদের রন্ধনশিল্পীরা ১০ বছরেরও বেশি সময় ধরে ঘরোয়া স্বাদ ধরে রেখেছেন।'
  },
  {
    icon: ShieldCheck,
    title: 'পরিচ্ছন্নতা',
    desc: 'রান্নার প্রতিটি ধাপে আমরা সর্বোচ্চ স্বাস্থ্যবিধি মেনে চলি।'
  },
  {
    icon: Heart,
    title: 'মমতা',
    desc: 'ব্যবসায়িক দৃষ্টিভঙ্গির চেয়ে মেহমানদারিতেই আমাদের মূল লক্ষ্য।'
  }
];

export function HeritageBanner() {
  return (
    <section className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:scale-110 transition-all duration-500 border border-white/10 group-hover:border-primary">
                <item.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-display font-medium mb-4">{item.title}</h4>
              <p className="text-white/40 text-sm font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative text behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none italic font-display">
        DINAJPUR HERITAGE
      </div>
    </section>
  );
}
