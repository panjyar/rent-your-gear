import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import HeroSection from './components/HeroSection';
import ProductGrid from './components/ProductGrid';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import ChatBubble from './components/ChatBubble';
import SelectionPanel from './components/SelectionPanel';
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
        <ReviewsSection />
        
      </main>

      <Footer />
      <SelectionPanel />
      <ChatBubble />
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
