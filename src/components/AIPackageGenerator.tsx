import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Sparkles, Loader2, CheckCircle2, ShoppingCart, ShoppingBasket, AlertCircle, ArrowRight } from 'lucide-react';

interface AIPackage {
  packageName: string;
  description: string;
  items: string[];
  estimatedPricePerPerson: number;
}

export function AIPackageGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPackage | null>(null);
  const [formData, setFormData] = useState({
    eventType: 'বিয়ে',
    guests: '100',
    budget: '400',
  });
  const [error, setError] = useState<string | null>(null);

  const generatePackage = async () => {
    if (!formData.guests || Number(formData.guests) < 10) {
      setError('অতিথি সংখ্যা অন্তত ১০ জন হতে হবে');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to generate');
      }
      
      setResult(data);
    } catch (err: any) {
      console.error('AI Error:', err);
      setError(err.message || 'কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] p-8 md:p-12 border border-accent/20 shadow-2xl relative overflow-hidden group" id="ai-planner">
      {/* Glow Effect */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-charcoal">AI স্মার্ট মেনু প্ল্যানার</h3>
            <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-black">Next-Gen Catering Solutions</p>
          </div>
        </div>
        <div className="bg-cream border border-accent/20 px-4 py-2 rounded-xl text-xs font-bold text-charcoal/60 italic">
          আপনার বাজেট ও চাহিদামত মেনু সাজিয়ে নিন নিমিষেই!
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 relative z-10">
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1">অনুষ্ঠানের ধরণ</label>
          <select 
            className="w-full bg-cream/50 border border-accent/10 rounded-2xl p-4 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all cursor-pointer font-medium"
            value={formData.eventType}
            onChange={(e) => setFormData({...formData, eventType: e.target.value})}
          >
            <option>বিয়ে</option>
            <option>জন্মদিন</option>
            <option>কর্পোরেট ইভেন্ট</option>
            <option>পারিবারিক ভোজন</option>
            <option>আকিকা/অন্যান্য</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1">অতিথি সংখ্যা</label>
          <div className="relative">
            <input 
               type="number"
               className="w-full bg-cream/50 border border-accent/10 rounded-2xl p-4 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium"
               value={formData.guests}
               onChange={(e) => setFormData({...formData, guests: e.target.value})}
               placeholder="যেমন: ১০০"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-charcoal/30 uppercase">জন</span>
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-charcoal/40 ml-1">বাজেট (জনপ্রতি)</label>
          <div className="relative">
            <input 
               type="number"
               className="w-full bg-cream/50 border border-accent/10 rounded-2xl p-4 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all font-medium"
               value={formData.budget}
               onChange={(e) => setFormData({...formData, budget: e.target.value})}
               placeholder="যেমন: ৪০০"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-charcoal/30 uppercase">টাকা</span>
          </div>
        </div>
      </div>

      <button 
        onClick={generatePackage}
        disabled={loading}
        className="w-full py-5 bg-charcoal text-white rounded-[24px] font-bold flex items-center justify-center gap-3 hover:bg-primary transition-all disabled:opacity-50 shadow-xl shadow-charcoal/10 hover:shadow-primary/20 active:scale-[0.98] relative z-10"
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>AI মেনু তৈরি করছে...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-6 h-6 text-accent" />
            <span>জাদুকরী মেনু দেখুন</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 p-5 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-start gap-3 text-sm"
          >
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">!</div>
            <div>
              <p className="font-bold">সমস্যা হয়েছে</p>
              <p className="opacity-80">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 p-8 md:p-12 bg-primary/5 rounded-[48px] border border-primary/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4">
             <div className="bg-primary/10 text-primary p-3 rounded-2xl">
               <CheckCircle2 className="w-6 h-6" />
             </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div className="space-y-4">
              <h4 className="text-3xl md:text-4xl font-display font-bold text-primary leading-tight">{result.packageName}</h4>
              <p className="text-charcoal/70 text-base font-light max-w-xl leading-relaxed italic border-l-4 border-accent pl-6">{result.description}</p>
            </div>
            <div className="bg-primary text-white p-6 rounded-[32px] text-center shadow-xl shadow-primary/20 min-w-[160px] border-4 border-white/20">
              <span className="block text-[10px] uppercase font-black tracking-widest mb-1 opacity-70">আনুমানিক ব্যয়</span>
              <span className="text-3xl font-black">৳{result.estimatedPricePerPerson}</span>
              <span className="block text-[10px] mt-1 font-bold">একক প্রতি</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {result.items.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-accent/5 hover:border-accent hover:shadow-md transition-all group/item"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                   {i + 1}
                </div>
                <span className="text-charcoal/80 font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="pt-10 border-t border-accent/20 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <p className="text-[10px] uppercase font-black text-charcoal/40 tracking-widest mb-2">অর্ডার বুকিং করতে</p>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-2xl font-black text-primary tracking-tight">০১৯৬৮-৬৯৩৯৩৩</span>
              </div>
            </div>
            <button 
              onClick={() => {
                const message = `হ্যালো রন্ধনশালা! আমি AI জেনারেটেড এই মেনুটি পছন্দ করেছি:\n\nপ্যাকেজ: ${result.packageName}\nআইটেমস: ${result.items.join(', ')}\nবাজেট: ৳${result.estimatedPricePerPerson}`;
                window.open(`https://wa.me/8801968693933?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 group/wa"
            >
              হোয়াটসঅ্যাপে পাঠান 
              <ArrowRight className="w-5 h-5 group-hover/wa:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
