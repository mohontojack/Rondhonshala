import { UtensilsCrossed, Phone, Mail, MapPin, Facebook, Instagram, Send } from 'lucide-react';
import { CONTACT } from '@/constants';
import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="bg-white border-t border-charcoal/5 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Status Hub */}
        <div className="flex flex-wrap items-center justify-between gap-12 mb-20 py-10 border-b border-charcoal/5">
          <div className="flex items-center gap-16 flex-wrap">
            <div className="flex flex-col">
              <span className="text-primary text-[10px] uppercase font-black tracking-[0.4em] mb-2 opacity-50">Operation Hub</span>
              <span className="text-lg font-display font-medium text-charcoal tracking-tight">Dinajpur Sadar, Dinajpur</span>
            </div>
            <div className="flex flex-col">
              <span className="text-primary text-[10px] uppercase font-black tracking-[0.4em] mb-2 opacity-50">Weekly Delivery</span>
              <span className="text-lg font-display font-medium text-primary tracking-tight">Friday & Saturday Selection</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-[#FCFAF7] rounded-full border border-charcoal/5 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(142,22,22,0.4)]" />
              <span className="text-[10px] uppercase font-black tracking-widest text-charcoal/60">Best Catering in Dinajpur</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand Identity */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Logo className="w-14 h-14" />
              <span className="text-3xl font-display font-black text-charcoal tracking-tighter">রন্ধনশালা</span>
            </div>
            <p className="text-charcoal/40 leading-relaxed font-sans font-light text-base text-balance">
              রন্ধনশালা (Randhanshala) - দিনাজপুরে সেরা হোম মেইড খাবার এবং প্রিমিয়াম ক্যাটারিং সার্ভিস। আমাদের প্রতিটি ডিশ তৈরি হয় খাঁটি উপাদানে।
            </p>
            <div className="flex gap-4">
              <a 
                href={CONTACT.facebook} 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 bg-[#FCFAF7] hover:bg-primary hover:text-white rounded-2xl flex items-center justify-center transition-all border border-charcoal/5 shadow-sm group"
              >
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="#" 
                className="w-12 h-12 bg-[#FCFAF7] hover:bg-primary hover:text-white rounded-2xl flex items-center justify-center transition-all border border-charcoal/5 shadow-sm group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary opacity-50">সার্ভিস এরিয়া (দিনাজপুর)</h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {['বালুবাড়ী', 'গণেশতলা', 'কালিতলা', 'নিমনগর', 'চাউলিয়াপট্টি', 'কসবা', 'ফুলবাড়ী বাসস্ট্যান্ড', 'ফুলতলী', 'পাহাড়পুর', 'মিশন রোড'].map((area) => (
                <li key={area} className="text-charcoal/40 text-[11px] font-bold flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                  <MapPin className="w-2.5 h-2.5 opacity-30" /> {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary opacity-50">ক্যাটারিং সার্ভিস</h3>
            <ul className="space-y-4">
              {['বিয়ে ও গায়ে হলুদ', 'জন্মদিন উৎসব', 'আকিকা ও মিলাদ', 'কর্পোরেট ইভেন্ট', 'ফ্যামিলি ডিনার'].map((item) => (
                <li key={item} className="text-charcoal/50 text-sm font-medium hover:text-primary cursor-pointer transition-colors flex items-center gap-3">
                  <div className="w-1 h-1 rounded-full bg-primary/20" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Subscription */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary opacity-50">নিউজলেটার</h3>
            <p className="text-charcoal/40 text-sm leading-relaxed">নতুন অফার ও আপকামিং মেনু সম্পর্কে সবার আগে জানতে সাবস্ক্রাইব করুন।</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল"
                className="w-full bg-[#FCFAF7] border border-charcoal/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary transition-all placeholder:text-charcoal/20"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-charcoal/30 text-[10px] font-black uppercase tracking-[0.3em]">&copy; ২০২৬ রন্ধনশালা দিনাজপুর। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-charcoal/20">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
