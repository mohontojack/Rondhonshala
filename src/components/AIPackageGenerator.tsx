import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChefHat, Sparkles, Loader2, CheckCircle2, ShoppingCart, ShoppingBasket, AlertCircle, ArrowRight, Star } from 'lucide-react';
import { CONTACT } from '@/constants';
import { Logo } from '@/components/Logo';

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
        const trimmed = (responseText || "").trim();
        if (!trimmed || trimmed === "undefined" || trimmed === "null" || trimmed === "[object Object]") {
          throw new Error('সার্ভার থেকে সঠিক তথ্য পাওয়া যায়নি।');
        }
        
        // Find JSON block
        const start = trimmed.indexOf('{');
        const end = trimmed.lastIndexOf('}');
        
        if (start === -1 || end === -1 || end <= start) {
          // If response is already plain object string (no braces) check if it's potentially JSON
          try {
            data = JSON.parse(trimmed);
          } catch {
            throw new Error('সার্ভার থেকে পাঠানো তথ্যে ত্রুটি রয়েছে।');
          }
        } else {
          const jsonStr = trimmed.substring(start, end + 1);
          const finalJson = (jsonStr || "").trim();
          
          if (!finalJson || finalJson === "undefined" || finalJson === "null") {
            throw new Error('সার্ভার থেকে সঠিক তথ্য পাওয়া যায়নি।');
          }
          data = JSON.parse(finalJson);
        }
      } catch (e: any) {
        console.error('Frontend Parse Error. Text was:', responseText, e);
        if (e.message.includes('সার্ভার')) throw e;
        throw new Error('সার্ভার থেকে সঠিক তথ্য পাওয়া যায়নি।');
      }
      
      if (!response.ok) {
        throw new Error(data?.details || data?.error || 'Failed to generate');
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
    <div className="bg-white rounded-[4rem] p-12 md:p-20 border border-charcoal/5 shadow-premium relative overflow-hidden" id="ai-planner">
      {/* Background decoration - Light Mesh feel */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-primary border border-primary/20 shadow-premium group relative overflow-hidden">
              <Logo className="w-16 h-16 group-hover:scale-110 transition-transform relative z-10" />
              <motion.div 
                animate={{ y: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent z-20 pointer-events-none"
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] text-primary uppercase font-black tracking-[0.5em] opacity-40">Dinajpur Smart Planner</span>
                <div className="h-px w-12 bg-primary/10" />
              </div>
              <h3 className="text-5xl md:text-6xl font-display font-medium text-charcoal leading-none tracking-tighter">মেনু <span className="text-primary italic">আর্কিটেক্ট</span></h3>
            </div>
          </div>
          <div className="glass px-8 py-6 rounded-[2rem] max-w-sm border-charcoal/5">
            <p className="text-charcoal/40 text-sm font-light italic leading-relaxed text-balance">
              আপনার বিশেষ মূহুর্তের জন্য আমাদের AI এলগরিদম সবচেয়ে সামঞ্জস্যপূর্ণ খাবারের কম্বিনেশন তৈরি করে দেবে। মাত্র এক ক্লিকে পান ডিজিটাল মেনু।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          <div className="space-y-5">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20 ml-4 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" /> Event Context
            </label>
            <div className="relative group">
              <select 
                className="w-full bg-[#FCFAF7] border border-charcoal/5 rounded-[2.5rem] p-8 text-charcoal focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer font-bold appearance-none text-lg hover:bg-[#F0EEEB]"
                value={formData.eventType}
                onChange={(e) => setFormData({...formData, eventType: e.target.value})}
              >
                <option>বিয়ে</option>
                <option>জন্মদিন</option>
                <option>কর্পোরেট ইভেন্ট</option>
                <option>পারিবারিক ভোজন</option>
                <option>আকিকা/অন্যান্য</option>
              </select>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/20 group-hover:text-primary transition-colors">
                 <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20 ml-4 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" /> Guest Count
            </label>
            <div className="relative group">
              <input 
                 type="number"
                 className="w-full bg-[#FCFAF7] border border-charcoal/5 rounded-[2.5rem] p-8 text-charcoal focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold placeholder:text-charcoal/20 text-lg hover:bg-[#F0EEEB]"
                 value={formData.guests}
                 onChange={(e) => setFormData({...formData, guests: e.target.value})}
                 placeholder="যেমন: ১০০"
              />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-black text-charcoal/20 uppercase tracking-widest">Guests</span>
            </div>
          </div>
          <div className="space-y-5">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal/20 ml-4 flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-primary" /> Budget Limit
            </label>
            <div className="relative group">
              <input 
                 type="number"
                 className="w-full bg-[#FCFAF7] border border-charcoal/5 rounded-[2.5rem] p-8 text-charcoal focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold placeholder:text-charcoal/20 text-lg hover:bg-[#F0EEEB]"
                 value={formData.budget}
                 onChange={(e) => setFormData({...formData, budget: e.target.value})}
                 placeholder="যেমন: ৪০০"
              />
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[10px] font-black text-charcoal/20 uppercase tracking-widest">BDT/Unit</span>
            </div>
          </div>
        </div>

        <button 
          onClick={generatePackage}
          disabled={loading}
          className="w-full py-10 group bg-primary text-white rounded-[3rem] font-black text-2xl flex items-center justify-center gap-6 hover:scale-[1.02] transition-all disabled:opacity-50 shadow-[0_20px_50px_rgba(142,22,22,0.3)] relative overflow-hidden active:scale-95"
        >
          <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-[1.5s] italic flex items-center justify-center pointer-events-none text-white/5 whitespace-nowrap text-[150px] font-black pointer-events-none">
            RONDHONSHALA
          </div>
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <Loader2 className="w-12 h-12 animate-spin text-white/40" />
              <div className="relative overflow-hidden h-4 w-48 bg-white/20 rounded-full">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-white"
                />
              </div>
              <span className="relative z-10 tracking-[0.3em] uppercase text-sm">আপনার জন্য সেরা মেনু সাজানো হচ্ছে...</span>
            </div>
          ) : (
            <>
              <Sparkles className="w-10 h-10 text-white/50 animate-pulse" />
              <span className="relative z-10 uppercase tracking-[0.4em]">AI মেনু তৈরি করুন</span>
            </>
          )}
        </button>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-12 p-8 bg-red-500/5 border border-red-500/20 rounded-[2.5rem] flex items-center gap-6 text-red-500 backdrop-blur-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-sm uppercase tracking-widest mb-1">Calculation Error</p>
                <p className="font-medium opacity-80">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 bg-[#FCFAF7] rounded-[4rem] border border-charcoal/5 overflow-hidden relative group/res shadow-premium backdrop-blur-sm"
          >
            <div className="p-12 md:p-20">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
                <div className="space-y-8 flex-grow">
                  <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/5 text-primary rounded-full border border-primary/10">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">Perfectly Balanced Menu</span>
                  </div>
                  <h4 className="text-5xl md:text-8xl font-display font-black text-charcoal leading-none tracking-tighter">{result.packageName}</h4>
                  <p className="text-charcoal/40 text-xl font-light max-w-2xl leading-relaxed italic border-l-4 border-primary pl-10 ml-2">{result.description}</p>
                </div>
                <div className="bg-primary p-12 rounded-[4rem] text-center shadow-[0_30px_60px_rgba(142,22,22,0.3)] border border-white/10 min-w-[280px] group-hover/res:-translate-y-4 transition-transform duration-700">
                  <span className="block text-[11px] uppercase font-black tracking-[0.4em] mb-6 text-white/50">Estimation per Seat</span>
                  <div className="text-7xl font-black text-white tracking-tighter">৳{result.estimatedPricePerPerson}</div>
                  <div className="mt-8 flex justify-center gap-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-white/80 text-white/80" />)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                {result.items.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-8 bg-white p-8 rounded-[2.5rem] border border-charcoal/5 hover:border-primary/20 transition-all group/item hover:scale-[1.02] shadow-sm hover:shadow-premium"
                  >
                    <div className="w-16 h-16 rounded-[1.5rem] bg-primary/5 flex items-center justify-center text-primary text-2xl font-black group-hover/item:bg-primary group-hover/item:text-white transition-all shadow-inner">
                       {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <span className="text-charcoal font-black text-xl tracking-tight block mb-1 group-hover/item:text-primary transition-colors">{item}</span>
                      <span className="text-[9px] uppercase font-black text-charcoal/20 tracking-widest">Handmade Quality</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="pt-16 border-t border-charcoal/5 flex flex-col xl:flex-row justify-between items-center gap-12">
                <div className="text-center xl:text-left">
                  <p className="text-[10px] uppercase font-black text-charcoal/20 tracking-[0.5em] mb-4">Request Production Queue</p>
                  <div className="flex items-center gap-6">
                     <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                     <span className="text-4xl md:text-5xl font-black text-charcoal tracking-tighter decoration-primary/20 underline-offset-[12px] underline decoration-4 underline-dashed transition-colors hover:text-primary cursor-pointer leading-[1.2]">{CONTACT.phone}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const message = `হ্যালো রন্ধনশালা! আমি AI জেনারেটেড এই মেনুটি পছন্দ করেছি:\n\nপ্যাকেজ: ${result.packageName}\nআইটেমস: ${result.items.join(', ')}\nবাজেট: ৳${result.estimatedPricePerPerson}`;
                    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="flex items-center gap-6 bg-[#25D366] text-white px-8 md:px-16 py-6 md:py-8 rounded-[2rem] md:rounded-[3rem] font-black text-lg md:text-xl hover:scale-105 transition-all shadow-[0_30px_60px_rgba(37,211,102,0.2)] group/wa active:scale-95 border border-white/10"
                >
                  Confirm Menu on WhatsApp
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-3 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
