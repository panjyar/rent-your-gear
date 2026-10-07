import React from 'react';
import photographyBanner from '../assets/category/photography.png';
import gamingBanner from '../assets/category/gamming.png';
import outdoorBanner from '../assets/category/outdoor.png';
import entertainmentBanner from '../assets/category/entertainment.png';
import { useAppContext } from '../context/AppContext';
import { categoryData } from './CategoryNav';

const banners = [
  photographyBanner,
  gamingBanner,
  outdoorBanner,
  entertainmentBanner
];

const HeroSection = () => {
  const { activeCategory } = useAppContext();
  
  // activeCategory is an index (0 to 3)
  const bannerImage = banners[activeCategory] || gamingBanner;
  const categoryName = categoryData[activeCategory]?.name || 'Gaming';

  return (
    <div className="container mx-auto px-4 pt-4 pb-2 max-w-[1280px]">
      <div className="relative w-full rounded-[20px] overflow-hidden shadow-card">
        <img 
          src={bannerImage} 
          alt={`${categoryName} on rent`} 
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
