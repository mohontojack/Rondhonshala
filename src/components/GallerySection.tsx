import { motion } from 'motion/react';
import { Camera, ZoomIn, ArrowRight } from 'lucide-react';

interface GalleryProps {
  limit?: number;
}

export function GallerySection({ limit }: GalleryProps) {
  const images = [
    { url: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?q=80&w=800', title: 'বিয়ের ভোজন' },
    { url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800', title: 'কাচ্চি বিরিয়ানি' },
    { url: 'https://images.unsplash.com/photo-1589187151003-0dd559412317?q=80&w=800', title: 'মুরগির রোস্ট' },
    { url: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?q=80&w=800', title: 'বোরহানি ও মিষ্টি' },
    { url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=800', title: 'শাহী আহার' },
    { url: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=800', title: 'সালাদ ডেকোরেশন' },
  ];

  const displayImages = limit ? images.slice(0, limit) : images;

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full mb-6">
              <Camera className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Candid Moments</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-medium text-charcoal mb-4 tracking-tighter">আমাদের <span className="text-primary italic">গ্যালারি</span></h2>
            <p className="text-charcoal/50 font-sans font-light text-lg">আমাদের ইভেন্টগুলোর কিছু স্মরণীয় মুহূর্ত ও খাবারের চমৎকার উপস্থাপনা এখানে দেখুন।</p>
          </div>
          <button className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.3em] hover:translate-x-2 transition-transform">
            সকল ছবি দেখুন <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 h-full md:h-[1200px]">
          {/* Main Large Item */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 relative group rounded-[4rem] overflow-hidden border border-charcoal/5 shadow-premium"
          >
            <img 
              src={images[0].url} 
              alt={images[0].title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <h3 className="text-white text-3xl font-display font-medium italic mb-2">{images[0].title}</h3>
               <p className="text-white/60 text-sm">দিনাজপুরের সিগনেচার বিয়ের আয়োজন</p>
            </div>
          </motion.div>

          {/* Tall Item */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 md:row-span-2 relative group rounded-[4rem] overflow-hidden border border-charcoal/5 shadow-premium"
          >
            <img 
              src={images[1].url} 
              alt={images[1].title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <h3 className="text-white text-2xl font-display font-medium italic">{images[1].title}</h3>
            </div>
          </motion.div>

          {/* Regular Items */}
          {[2, 3, 4, 5].map((idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx }}
              className="relative group rounded-[3rem] overflow-hidden border border-charcoal/5 shadow-premium h-[300px] md:h-auto"
            >
              <img 
                src={images[idx].url} 
                alt={images[idx].title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-white text-xl font-display font-medium italic">{images[idx].title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
