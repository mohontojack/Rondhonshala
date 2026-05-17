import { motion } from 'motion/react';
import { Camera, ZoomIn } from 'lucide-react';

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
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">আমাদের গ্যালারি</h2>
            <p className="text-charcoal/60 font-light">আমাদের ইভেন্টগুলোর কিছু স্মরণীয় মুহূর্ত ও খাবারের চমৎকার উপস্থাপনা এখানে দেখুন।</p>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold hover:underline">
            সকল ছবি দেখুন <Camera className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group h-[400px] rounded-[48px] overflow-hidden border-4 border-accent/20 shadow-lg"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                <div className="flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white text-2xl font-display font-medium italic">{img.title}</h3>
                  <div className="p-3 bg-accent text-primary rounded-full shadow-lg">
                    <ZoomIn className="w-5 h-5" />
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
