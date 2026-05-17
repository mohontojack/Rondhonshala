import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { CateringPackages } from './components/CateringPackages';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { OrderForm } from './components/OrderForm';
import { AdminDashboard } from './components/AdminDashboard';
import { AIPackageGenerator } from './components/AIPackageGenerator';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'packages' | 'order' | 'gallery' | 'reviews' | 'admin'>('home');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero onMenuClick={() => setActiveTab('menu')} onOrderClick={() => setActiveTab('packages')} />
            <CateringPackages />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <AIPackageGenerator />
            </div>
            <GallerySection limit={6} />
            <ReviewsSection />
          </>
        );
      case 'packages':
        return (
          <div className="space-y-12 py-12">
            <CateringPackages />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <AIPackageGenerator />
            </div>
          </div>
        );
      case 'menu':
        return <MenuSection />;
      case 'order':
        return <OrderForm />;
      case 'gallery':
        return <GallerySection />;
      case 'reviews':
        return <ReviewsSection />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <Hero onMenuClick={() => setActiveTab('menu')} onOrderClick={() => setActiveTab('order')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
