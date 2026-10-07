import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import SelectionPanel from './components/SelectionPanel';
import FAQSection from './components/FAQSection';
import { AppProvider } from './context/AppContext';
import productData from './data/product-list.json';

function AppContent() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productData && productData.products) {
      setProducts(productData.products);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <CategoryNav />
      
      <main className="flex-grow">
        <HeroSection />
        <ProductGrid products={products} />
        <FAQSection />
      </main>

      <SelectionPanel />

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4 font-ubuntu">SharePal</h3>
            <p className="text-sm text-gray-400">
              India's most trusted lifestyle gear rental platform. Zero Deposit | Free Delivery | Excellent Quality
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Gaming Consoles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Photography</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Outdoor Gears</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Entertainment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cancellation Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} SharePal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
