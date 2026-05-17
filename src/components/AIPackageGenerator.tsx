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
      
      const responseText = await response.text();
      let data;
      try {
        if (!responseText || responseText === "undefined") {
          data = {};
        } else {
          data = JSON.parse(responseText);
        }
      } catch (e) {
        console.error('Failed to parse response as JSON:', responseText);
        throw new Error('সার্ভার থেকে সঠিক তথ্য পাওয়া যায়নি।');
      }
      
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
    <div className="bg-charcoal rounded-[3rem] p-10 md:p-16 border border-white/5 shadow-strong relative overflow-hidden" id="ai-planner">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-16">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_30px_rgba(142,22,22,0.2)]">
              <Sparkles className="w-10 h-10 animate-pulse" />
            </div>
            <div>
              <h3 className="text-4xl font-display font-bold text-white mb-1">AI মেনু জেনারেটর</h3>
              <p className="text-[10px] text-accent uppercase font-black tracking-[0.4em]">Proprietary Algorithm v2.4</p>
            </div>
          </div>
          <div className="glass-dark px-6 py-4 rounded-3xl max-w-sm">
            <p className="text-white/60 text-sm font-light italic leading-relaxed">
              আপনার বাজেট ও চাহিদামত নিখুঁত মেনু সাজিয়ে নিন নিমিষেই। আমাদের AI আপনার জন্য সেরা ডিশগুলো বেছে নেবে।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Event Architecture</label>
            <div className="relative group">
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer font-bold appearance-none"
                value={formData.eventType}
                onChange={(e) => setFormData({...formData, eventType: e.target.value})}
              >
                <option className="bg-charcoal">বিয়ে</option>
                <option className="bg-charcoal">জন্মদিন</option>
                <option className="bg-charcoal">কর্পোরেট ইভেন্ট</option>
                <option className="bg-charcoal">পারিবারিক ভোজন</option>
                <option className="bg-charcoal">আকিকা/অন্যান্য</option>
              </select>
              <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 rotate-90 pointer-events-none group-hover:text-primary transition-colors" />
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Guest Capacity</label>
            <div className="relative group">
              <input 
                 type="number"
                 className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold placeholder:text-white/10"
                 value={formData.guests}
                 onChange={(e) => setFormData({...formData, guests: e.target.value})}
                 placeholder="যেমন: ১০০"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase tracking-widest">Cap.</span>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2">Budget per Unit</label>
            <div className="relative group">
              <input 
                 type="number"
                 className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold placeholder:text-white/10"
                 value={formData.budget}
                 onChange={(e) => setFormData({...formData, budget: e.target.value})}
                 placeholder="যেমন: ৪০০"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-white/20 uppercase tracking-widest">BDT</span>
            </div>
          </div>
        </div>

        <button 
          onClick={generatePackage}
          disabled={loading}
          className="w-full py-8 group bg-primary text-white rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 hover:scale-[1.01] transition-all disabled:opacity-50 shadow-2xl shadow-primary/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700 italic flex items-center justify-center pointer-events-none text-white/20 whitespace-nowrap text-8xl font-black">
            CALCULATING...
          </div>
          {loading ? (
            <>
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="relative z-10 tracking-widest uppercase">Processing Algorithm...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-8 h-8 text-accent animate-pulse" />
              <span className="relative z-10 uppercase tracking-[0.2em]">Generate Smart Menu</span>
            </>
          )}
        </button>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-[2rem] flex items-center gap-4 text-red-400"
            >
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p className="font-bold text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 bg-white/5 rounded-[3rem] border border-white/10 overflow-hidden relative group/res shadow-strong"
          >
            <div className="p-10 md:p-16">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full border border-accent/20">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Optimized Result</span>
                  </div>
                  <h4 className="text-4xl md:text-6xl font-display font-bold text-white leading-none tracking-tight">{result.packageName}</h4>
                  <p className="text-white/50 text-lg font-light max-w-2xl leading-relaxed italic border-l-2 border-primary pl-8">{result.description}</p>
                </div>
                <div className="bg-primary p-10 rounded-[3rem] text-center shadow-2xl shadow-primary/40 border border-white/20 min-w-[220px]">
                  <span className="block text-[10px] uppercase font-black tracking-[0.3em] mb-4 text-white/50">Unit Price</span>
                  <div className="text-5xl font-black text-white tracking-tighter">৳{result.estimatedPricePerPerson}</div>
                  <span className="block text-[10px] mt-4 font-bold text-white/30 uppercase tracking-widest">Net Value</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {result.items.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 glass-dark p-6 rounded-[2rem] border border-white/10 hover:border-accent/40 transition-all group/item"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent text-xl font-black group-hover/item:bg-accent group-hover/item:text-charcoal transition-all">
                       {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="text-white/80 font-bold text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-center md:text-left">
                  <p className="text-[10px] uppercase font-black text-white/20 tracking-[0.3em] mb-3">Project Inquiry</p>
                  <div className="flex items-center gap-4">
                     <div className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
                     <span className="text-3xl font-black text-white tracking-tighter decoration-accent underline-offset-8 underline decoration-2">০১৯৬৮-৬৯৩৯৩৩</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const message = `হ্যালো রন্ধনশালা! আমি AI জেনারেটেড এই মেনুটি পছন্দ করেছি:\n\nপ্যাকেজ: ${result.packageName}\nআইটেমস: ${result.items.join(', ')}\nবাজেট: ৳${result.estimatedPricePerPerson}`;
                    window.open(`https://wa.me/8801968693933?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="flex items-center gap-4 bg-[#25D366] text-white px-12 py-6 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-[#25D366]/20 group/wa active:scale-95"
                >
                  Confirm Menu via WhatsApp 
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
