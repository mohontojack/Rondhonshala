import { motion } from 'motion/react';
import { Star, Quote, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: 'আরিফুল ইসলাম',
      event: 'বিয়ে ক্যাটারিং',
      location: 'গনেশতলা, দিনাজপুর',
      comment: 'রন্ধনশালার কাচ্চি বিরিয়ানিটা অসাধারণ ছিল। দিনাজপুরে বিয়ের ভোজের জন্য সেরা চয়েস। সার্ভিসও অনেক প্রফেশনাল।',
      rating: 5,
    },
    {
      id: 2,
      name: 'সাদিয়া সুলতানা',
      event: 'জন্মদিন পার্টি',
      location: 'কালিতলা, দিনাজপুর',
      comment: 'হোমমেড ফিল পাওয়া যাচ্ছিল খাবারে। মশলা একদম পারফেক্ট ছিল। দিনাজপুরে এমন অথেন্টিক খাবার পাওয়া সত্যি ভাগ্যের ব্যাপার।',
      rating: 5,
    },
    {
      id: 3,
      name: 'তানভীর আহমেদ',
      event: 'অফিস ইভেন্ট',
      location: 'বালুবাড়ী, দিনাজপুর',
      comment: 'সময়মতো ডেলিভারি এবং হাইজিন মেইনটেইন করার জন্য আপনাদের ধন্যবাদ। অফিস ইভেন্টের জন্য আপনারা সেরা।',
      rating: 5,
    }
  ];

  return (
    <section className="py-32 bg-[#FCFAF7] text-charcoal relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
            <Logo className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Dinajpur's Favorite</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-charcoal mb-8 tracking-tighter text-balance">গ্রাহকদের <span className="text-primary italic">বিশ্বস্ততা</span></h2>
          <p className="text-charcoal/50 max-w-xl mx-auto font-sans font-light text-lg leading-relaxed">আমাদের সেবার গুণগত মান ও স্বাদের প্রশংসা যারা নিরন্তর করে চলেছেন।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="bg-white p-12 rounded-[4rem] border border-charcoal/5 relative group hover:shadow-premium transition-all h-full shadow-sm flex flex-col"
            >
              <Quote className="absolute top-10 right-12 w-14 h-14 text-primary/5 group-hover:text-primary/10 transition-colors" />
              
              <div className="flex gap-1.5 mb-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              <p className="text-xl text-charcoal/80 font-sans font-light italic leading-relaxed mb-12 flex-grow text-balance">
                “{review.comment}”
              </p>

              <div className="flex items-center gap-6 pt-10 border-t border-charcoal/5">
                <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center font-display font-black text-white text-2xl shadow-premium relative overflow-hidden group-hover:rotate-6 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                  <span className="relative z-10">{review.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-display font-black text-charcoal text-xl tracking-tight leading-none mb-1">{review.name}</h4>
                  <div className="flex flex-col">
                    <p className="text-primary text-[10px] uppercase font-black tracking-[0.3em] opacity-40 mb-1">{review.event}</p>
                    <p className="text-charcoal/30 text-[9px] font-bold flex items-center gap-1"><MapPin className="w-2 h-2" /> {review.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
