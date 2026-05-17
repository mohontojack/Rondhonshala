import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: 'আরিফুল ইসলাম',
      event: 'বিয়ে ক্যাটারিং',
      comment: 'রন্ধনশালার কাচ্চি বিরিয়ানিটা অসাধারণ ছিল। গেস্টরা সবাই অনেক তারিফ করেছে। সার্ভিসও অনেক প্রফেশনাল।',
      rating: 5,
    },
    {
      id: 2,
      name: 'সাদিয়া সুলতানা',
      event: 'জন্মদিন পার্টি',
      comment: 'হোমমেড ফিল পাওয়া যাচ্ছিল খাবারে। মশলা একদম পারফেক্ট ছিল। দিনাজপুরে এমন ক্যাটারিং সত্যিই কম পাওয়া যায়।',
      rating: 5,
    },
    {
      id: 3,
      name: 'তানভীর আহমেদ',
      event: 'অফিস ইভেন্ট',
      comment: 'সময়মতো ডেলিভারি এবং হাইজিন মেইনটেইন করার জন্য আপনাদের ধন্যবাদ। রুই মাছের ঝাল ভুনাটা সেরা ছিল।',
      rating: 4,
    }
  ];

  return (
    <section className="py-24 bg-charcoal text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-accent mb-4">গ্রাহকদের কথা</h2>
          <p className="text-white/60 max-w-2xl mx-auto font-light">আমাদের গ্রাহকদের বিশ্বস্ততাই আমাদের পথচলার শক্তি।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-10 rounded-[48px] border border-white/10 relative group hover:bg-white/10 transition-all h-full shadow-inner"
            >
              <Quote className="absolute top-8 right-10 w-12 h-12 text-secondary/20 group-hover:text-secondary/40 transition-colors" />
              
              <div className="flex gap-1 mb-8">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>

              <p className="text-xl text-white/80 font-light italic leading-relaxed mb-10">
                “{review.comment}”
              </p>

              <div className="flex items-center gap-5 mt-auto">
                <div className="w-14 h-14 bg-primary border-2 border-accent text-accent rounded-full flex items-center justify-center font-display font-bold">
                  {review.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg tracking-tight">{review.name}</h4>
                  <p className="text-secondary text-[10px] uppercase font-bold tracking-[0.2em]">{review.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
