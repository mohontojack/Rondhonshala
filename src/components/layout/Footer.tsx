import { UtensilsCrossed, Phone, Mail, MapPin, Facebook, Instagram, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Design Bottom Bar Style Status Indicators */}
        <div className="flex flex-wrap items-center justify-between gap-8 mb-16 py-8 border-b border-white/10">
          <div className="flex items-center gap-12 flex-wrap">
            <div className="flex flex-col">
              <span className="text-secondary text-[10px] uppercase font-bold tracking-widest">Location</span>
              <span className="text-sm">Dinajpur Sadar, Bangladesh</span>
            </div>
            <div className="flex flex-col">
              <span className="text-secondary text-[10px] uppercase font-bold tracking-widest">Weekly Operation</span>
              <span className="text-sm font-bold text-accent">Friday & Saturday Only</span>
            </div>
            <div className="flex flex-col">
              <span className="text-secondary text-[10px] uppercase font-bold tracking-widest">WhatsApp & Phone</span>
              <span className="text-sm">01968693933</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-[10px] uppercase font-bold tracking-wider">Accepting Orders for Next Week</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src="https://i.ibb.co.com/pjbz5RTt/image.png" 
                alt="রন্ধনশালা" 
                className="h-10 w-auto object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <span className="text-2xl font-display font-bold text-white tracking-tight">রন্ধনশালা</span>
            </div>
            <p className="text-white/40 leading-relaxed font-sans font-light text-sm">
              Dinajpur's premium homemade catering service. Authentic Bengali taste for your most precious moments.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors border border-white/10">
                <Facebook className="w-4 h-4 text-accent" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 hover:bg-primary/20 rounded-full flex items-center justify-center transition-colors border border-white/10">
                <Instagram className="w-4 h-4 text-accent" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-bold text-accent">যোগাযোগ</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/70">
                <Phone className="w-5 h-5 text-primary" />
                <span>০১৯৬৮-৬৯৩৯৩৩</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail className="w-5 h-5 text-primary" />
                <span>info@rondhonshala.com</span>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>দিনাজপুর সদর, দিনাজপুর, বাংলাদেশ</span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-bold text-accent">সার্ভিসসমূহ</h3>
            <ul className="space-y-3 text-white/70">
              <li className="hover:text-accent cursor-pointer transition-colors">ছোট অনুষ্ঠান (Milad/Aqiqah)</li>
              <li className="hover:text-accent cursor-pointer transition-colors">জন্মদিন উৎসব</li>
              <li className="hover:text-accent cursor-pointer transition-colors">বিয়ে ও গায়ে হলুদ</li>
              <li className="hover:text-accent cursor-pointer transition-colors">অফিসিয়াল ইভেন্ট</li>
              <li className="hover:text-accent cursor-pointer transition-colors">ফ্যামিলি পার্টি</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-bold text-accent">নিউজলেটার</h3>
            <p className="text-white/60 text-sm">আমাদের নতুন মেনু এবং অফার সম্পর্কে জানতে সাবস্ক্রাইব করুন।</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="ইমেইল এড্রেস"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary text-sm"
              />
              <button className="bg-primary px-4 py-2 rounded-lg font-medium hover:bg-primary/80 transition-colors">
                যোগ দিন
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>&copy; ২০২৬ রন্ধনশালা - সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
