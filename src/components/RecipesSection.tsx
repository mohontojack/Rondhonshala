import { motion } from 'motion/react';
import { Clock, Users, Flame, ChevronRight, Utensils } from 'lucide-react';

const recipes = [
  {
    id: 1,
    title: 'দিনাজপুরের ঐতিহ্যবাহী কাচ্চি বিরিয়ানি',
    prepTime: '৪৫ মিনিট',
    serves: '৪-৬ জন',
    difficulty: 'মাঝারি',
    image: 'https://images.unsplash.com/photo-1589302168068-1ea281d94f8a?q=80&w=800&auto=format&fit=crop',
    excerpt: 'খাসির মাংস ও চিনিগুঁড়া চালের এক অপূর্ব মেলবন্ধন, যা দিনাজপুরের বিয়ের ভোজের প্রাণ।',
  },
  {
    id: 2,
    title: 'রুই মাছের রাজকীয় ঝাল ভুনা',
    prepTime: '৩০ মিনিট',
    serves: '৩-৪ জন',
    difficulty: 'সহজ',
    image: 'https://images.unsplash.com/photo-1626075153259-86f3496030c6?q=80&w=800&auto=format&fit=crop',
    excerpt: 'তাজা রুই মাছ আর দেশি মশলার ঝাঁঝালো ভুনা, যা সাদা ভাতের সাথে জমে যাবে দারুণ।',
  },
  {
    id: 3,
    title: 'লিচুর স্বাদে স্পেশাল ডিজার্ট',
    prepTime: '২০ মিনিট',
    serves: '৫ জন',
    difficulty: 'সহজ',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10dca3?q=80&w=800&auto=format&fit=crop',
    excerpt: 'দিনাজপুরের বিখ্যাত লিচুর রস দিয়ে তৈরি এক রিফ্রেশিং সোরবে যা খাবারের তৃপ্তি বাড়াবে।',
  }
];

export function RecipesSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-accent/30 text-primary rounded-full mb-8 border border-primary/5"
            >
              <Utensils className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Culinary Secrets</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-display font-medium text-charcoal leading-[0.9] tracking-tighter"
            >
              আমাদের <br />
              <span className="text-primary italic font-light">রেসিপি সম্ভার</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-charcoal/50 max-w-sm font-sans font-light text-lg leading-relaxed italic"
          >
            দিনাজপুরের রসুইঘরের গোপন রেসিপি এখন আপনার হাতের মুঠোয়। ঐতিহ্যের সেই স্বাদ ফিরিয়ে আনুন নিজের রান্নাঘরে।
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {recipes.map((recipe, idx) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[450px] rounded-[4rem] overflow-hidden mb-8 border border-charcoal/5 shadow-premium">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10 opacity-100 translate-y-0 transition-all">
                  <div className="flex gap-4 mb-6">
                    <span className="flex items-center gap-2 text-[10px] text-white/60 font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <Clock className="w-3 h-3" /> {recipe.prepTime}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] text-white/60 font-black uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                      <Flame className="w-3 h-3" /> {recipe.difficulty}
                    </span>
                  </div>
                  <h3 className="text-3xl font-display font-medium text-white mb-4 leading-tight">{recipe.title}</h3>
                  <button className="flex items-center gap-2 text-primary font-bold text-sm group/btn">
                    রেসিপি দেখুন <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 -right-64 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
}
