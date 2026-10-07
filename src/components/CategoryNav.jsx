import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const categoryData = [
  {
    name: 'Photography',
    color: '#cc292b',
    navColor: '#A91E00',
    subcategories: [
      'DJI Drones', '360 Cameras', 'Vlogging', 'GoPro Cameras', 'Mobile Gimbals', 'Action Camera Mounts',
      'iPhones', 'Action Cameras', 'UNLMTD Vlogging', 'Insta360 Cameras', 'Wireless & Collar Mics', 'Action Camera Add ons',
      'Cameras', 'DSLR Cameras', 'Wildlife Photography', 'DJI Cameras', 'DSLR Lens',
      'Pocket Cameras', 'Mirrorless Cameras', 'Professional Cameras', 'DSLR Gimbal Combos', 'Tripod and camera accessories'
    ]
  },
  {
    name: 'Gaming',
    color: '#6221aa',
    navColor: '#4C187C',
    subcategories: [
      'GTA VI', 'PS5 Console', 'Xbox Console', 'VR', 'Racing Wheel', 'Big Screen Gaming'
    ]
  },
  {
    name: 'Outdoor',
    color: '#1a6b20',
    navColor: '#044704',
    subcategories: [
      'Trekking Gear', 'Riding Gear', 'Camping Gear', 'Trekking Poles', 'Backpacks', 'Headlamps',
      'Camping Stoves', 'Coolers', 'Hiking Boots', 'Portable Power', 'Camping Tables'
    ]
  },
  {
    name: 'Entertainment',
    color: '#cc292b',
    navColor: '#8E0820',
    subcategories: [
      'Projectors', 'Speakers', 'Mics', 'VR', 'Home Theater', 'Party Speakers', 'Karaoke Systems',
      'Soundbars', 'Portable Speakers', 'Microphones'
    ]
  },
];

const CategoryNav = () => {
  const { activeCategory, setActiveCategory } = useAppContext();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const closeTimerRef = useRef(null);

  // The displayed index: hovered category takes priority, otherwise the active (clicked) category
  const displayedIndex = hoveredIndex !== null ? hoveredIndex : activeCategory;
  const showSubmenu = isSubmenuOpen && displayedIndex !== null;

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setHoveredIndex(null);
      setIsSubmenuOpen(false);
    }, 150); // small delay so cursor can travel from category to submenu
  }, [cancelClose]);

  const handleCategoryMouseEnter = (index) => {
    cancelClose();
    setHoveredIndex(index);
    setIsSubmenuOpen(true);
  };

  const handleCategoryMouseLeave = () => {
    scheduleClose();
  };

  const handleSubmenuMouseEnter = () => {
    cancelClose();
  };

  const handleSubmenuMouseLeave = () => {
    scheduleClose();
  };

  const handleCategoryClick = (index) => {
    setActiveCategory(index);
    // Keep submenu open after click
    setHoveredIndex(null); // clear hover so it falls back to activeCategory
    setIsSubmenuOpen(false);
  };

  // Build columns for the active submenu
  const activeData = categoryData[displayedIndex] || categoryData[0];
  const items = activeData.subcategories;
  const numCols = Math.min(6, Math.ceil(items.length / 4));
  const itemsPerCol = Math.ceil(items.length / numCols);
  const cols = [];
  for (let i = 0; i < numCols; i++) {
    cols.push(items.slice(i * itemsPerCol, (i + 1) * itemsPerCol));
  }

  return (
    <div className="sticky top-[60px] md:top-[64px] z-40 bg-white border-b border-border">
      <div className="container mx-auto px-4 relative max-w-4xl">
        {/* Mobile arrows */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 md:hidden bg-white rounded-full p-1 shadow-sm z-10 text-text-muted">
          <ChevronLeft size={16} />
        </button>

        {/* Category tabs — NO overflow-x-auto on desktop so submenu is not clipped */}
        <div className="flex items-center justify-between md:justify-center gap-2 md:gap-16 overflow-x-auto md:overflow-visible no-scrollbar px-6 md:px-0">
          {categoryData.map((cat, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer text-center px-4 py-3 relative flex flex-col items-center"
              onMouseEnter={() => handleCategoryMouseEnter(index)}
              onMouseLeave={handleCategoryMouseLeave}
              onClick={() => handleCategoryClick(index)}
            >
              <span
                className={`text-[13px] md:text-[14px] font-semibold transition-colors duration-200 ${activeCategory === index || hoveredIndex === index
                  ? 'text-text-primary'
                  : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                {cat.name}
              </span>
              {/* Active underline — uses category color */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-t-full transition-all duration-200 ${activeCategory === index ? 'w-[110%] opacity-100' : 'w-0 opacity-0'
                  }`}
                style={{ backgroundColor: cat.color }}
              ></div>
            </div>
          ))}
        </div>

        <button className="absolute right-2 top-1/2 -translate-y-1/2 md:hidden bg-white rounded-full p-1 shadow-sm z-10 text-text-muted">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Mega Menu — Floating Rounded Card */}
      {showSubmenu && (
        <div className="absolute left-0 right-0 w-full flex justify-center z-50 top-full px-4">
          <div
            className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-[28px] mt-1 border border-gray-100 max-w-full overflow-x-auto no-scrollbar"
            onMouseEnter={handleSubmenuMouseEnter}
            onMouseLeave={handleSubmenuMouseLeave}
          >
            <div className="px-8 py-8">
              <div className="flex justify-start gap-8 md:gap-12 flex-wrap">
                {cols.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-4">
                    {col.map((item, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="text-[14px] font-medium text-text-primary hover:text-primary whitespace-nowrap transition-colors duration-[--duration-base]"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryNav;
