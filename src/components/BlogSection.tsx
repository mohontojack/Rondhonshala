import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'কেন দিনাজপুরের চিনিগুঁড়া চাল সেরা?',
    category: 'খাদ্য সংস্কৃতি',
    date: 'মে ১০, ২০২৪',
    author: 'Chef Arif',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=800&auto=format&fit=crop',
    excerpt: 'চিনিগুঁড়া চালের সুগন্ধ আর ছোট দানার নেপথ্যে রয়েছে দিনাজপুরের মাটির এক বিশেষ গুণ...',
  },
  {
    id: 2,
    title: 'হোমমেড ভার্সেস রেস্টুরেন্ট ক্যাটারিং',
    category: 'পরামর্শ',
    date: 'মে ৫, ২০২৪',
    author: 'Randhanshala Team',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=800&auto=format&fit=crop',
    excerpt: 'আপনার বিশেষ অনুষ্ঠানে কেন ঘরোয়া স্পর্শের ক্যাটারিংই সবচেয়ে উপযোগী হতে পারে?',
  }
];

export function BlogSection() {
  return (
    <section className="py-32 bg-[#FCFAF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-full mb-8"
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Randhanshala Journal</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-display font-medium text-charcoal mb-8 tracking-tighter">আমাদের <span className="text-primary italic">গল্প</span></h2>
          <p className="text-charcoal/50 max-w-xl mx-auto font-sans font-light text-lg">খাবার থেকে কাহিনী—সবই মিশে আছে আমাদের এই ব্লগে।</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row gap-10 group"
            >
              <div className="md:w-1/2 h-[400px] rounded-[3rem] overflow-hidden border border-charcoal/5 shadow-premium">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full">{post.category}</span>
                  <span className="text-[10px] font-bold text-charcoal/30 flex items-center gap-2"><Calendar className="w-3 h-3" /> {post.date}</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-medium text-charcoal mb-6 leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-charcoal/50 font-sans font-light text-base leading-relaxed mb-8">{post.excerpt}</p>
                <button className="flex items-center gap-4 text-charcoal font-black text-sm tracking-widest group/btn border-b-2 border-charcoal/5 pb-2 self-start hover:border-primary hover:text-primary transition-all">
                  পড়ুন <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-3 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
