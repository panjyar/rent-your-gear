import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Smile } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { categoryData } from './CategoryNav';

const categoryFilters = {
  0: [ // Photography
    { id: 'all', name: 'All', icon: 'smile' },
    { id: 'drones', name: 'DJI Drones', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsub-category-card%2FDJI-Mini-4-Pro-RC2-drone.webp&w=256&q=75' },
    { id: 'iphones', name: 'iPhones', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fcategories%2Fcameras%2Fiphones%2Fiphone-17-pro-max%2Fiphone-17-pro-max-on-rent-on-sharepal-1.webp&w=256&q=75' },
    { id: 'cameras', name: 'Cameras', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsub-category-card%2Fdslr-cameras-on-rent-sharepal.webp&w=256&q=75' },
    { id: 'pocket', name: 'Pocket Cameras', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fcategory-icons%2Fpocket-cameras-on-rent.webp&w=256&q=75' },
  ],
  1: [ // Gaming
    { id: 'all', name: 'All', icon: 'smile' },
    { id: 'gta', name: 'GTA VI', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fcategory-icons%2Fgta-vi.webp&w=256&q=75' },
    { id: 'ps5', name: 'PS5 Console', img: 'https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-1-controller/ps5-console-with-1-controller-on-rent-sharepal-1.webp' },
    { id: 'xbox', name: 'Xbox Console', img: 'https://images.sharepal.in/categories/gaming-consoles/ps5/ps-portal-remote-player/ps-portal-on-rent-1.webp' },
    { id: 'vr', name: 'VR', img: 'https://images.sharepal.in/categories/gaming-consoles/ps5/ps5-with-ea-play-combo-with-1-controller/ps5-with-controller-with-ea-play-combo-on-rent-sharepal-1.webp' },
  ],
  2: [ // Outdoor
    { id: 'all', name: 'All', icon: 'smile' },
    { id: 'trekking', name: 'Trekking Gear', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsub-category-card%2Ftrekking-gear-on-rent-sharepal-1.webp&w=256&q=75' },
    { id: 'riding', name: 'Riding Gear', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsub-category-card%2Friding-gear-on-rent-sharepal-1.webp&w=256&q=75' },
    { id: 'camping', name: 'Camping Gear', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fcategories%2Fcamping-gear%2Fcamping-tents%2F2-person-camping-tent%2F2-persons-camping-tents-on-rent-sharepal-1.webp&w=256&q=75' },
    { id: 'poles', name: 'Trekking Shoes', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fcategories%2Ftrekking-gear%2Ftrekking-shoes%2Fmen-s-leather-high-trekking-shoes-mt100%2Funisex-trek-mt100-trekking-shoes-on-rent-1.webp&w=256&q=75' },
  ],
  3: [ // Entertainment
    { id: 'all', name: 'All', icon: 'smile' },
    { id: 'projectors', name: 'Projectors', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsub-category-card%2FProjectors-on-rent-sharepal.webp&w=256&q=75' },
    { id: 'speakers', name: 'Speakers', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsub-category-card%2Fspeakers-on-rent-sharepal.webp&w=256&q=75' },
    { id: 'mics', name: 'Mics', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsub-category-card%2Fmics-on-rent-sharepal.webp&w=256&q=75' },
    { id: 'vr_ent', name: 'VR', img: 'https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsub-category-card%2Fvr-on-rent-sharepal.webp&w=256&q=75' },
  ]
};

const ProductGrid = ({ products }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(12);
  const { activeCategory } = useAppContext();

  // Reset active filter and visibility when changing categories
  useEffect(() => {
    setActiveFilter('all');
    setVisibleCount(12);
  }, [activeCategory]);

  const categoryName = categoryData[activeCategory]?.name || 'Gaming';
  const currentFilters = categoryFilters[activeCategory] || categoryFilters[1];

  // In a real app we'd filter products based on the activeCategory, 
  // but for now we just show the title to match the design reference.
  const displayTitle = `${categoryName} On Rent`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1280px]">
      <div className="flex flex-col md:flex-row gap-6 lg:gap-10">

        {/* Left Sidebar Filters */}
        <div className="hidden md:flex flex-col gap-4 w-32 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-card border border-border p-2 flex flex-col items-center gap-1">
            {currentFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 w-full ${activeFilter === filter.id
                  ? 'border-2 border-primary text-primary shadow-sm'
                  : 'border-2 border-transparent text-text-secondary hover:bg-accent'
                  }`}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-1">
                  {filter.icon === 'smile' ? (
                    <Smile size={32} className={activeFilter === filter.id ? 'text-primary' : 'text-text-muted'} />
                  ) : filter.img ? (
                    <img src={filter.img} alt={filter.name} className="w-full h-full object-contain mix-blend-multiply" />
                  ) : (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${activeFilter === filter.id ? 'bg-primary-light text-primary' : 'bg-gray-100 text-gray-500'}`}>
                      {filter.name.charAt(0)}
                    </div>
                  )}
                </div>
                <span className={`text-[11px] font-bold text-center leading-tight ${activeFilter === filter.id ? 'text-primary' : 'text-text-primary'}`}>
                  {filter.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-text-primary">
              {displayTitle}
            </h2>
            <span className="text-sm text-text-muted font-medium">
              Total items: <span className="font-bold text-text-primary">{products.length} items</span>
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {products.slice(0, visibleCount).map((product, index) => (
              <React.Fragment key={product.id}>
                <ProductCard product={product} />
                
                {/* Banner 1: After 4 products (index 3) */}
                {index === 3 && (
                  <div className="col-span-full w-full my-2 lg:my-4 rounded-[20px] overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <img 
                      src="https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsharepal-banners%2Fassets-fund-banner.png&w=3840&q=75" 
                      alt="Special Offer" 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                )}

                {/* Banner 2: After 8 products (index 7) */}
                {index === 7 && (
                  <div className="col-span-full w-full my-2 lg:my-4 rounded-[20px] overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <img 
                      src="https://sharepal.in/_next/image?url=https%3A%2F%2Fimages.sharepal.in%2Fsharepal-banners%2Fews-generic-banner-desktop.png&w=3840&q=75" 
                      alt="Special Offer" 
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Show More Section */}
          {products.length > visibleCount && (
            <div className="flex flex-col items-center justify-center mt-12 mb-8">
              <span className="text-[14px] text-gray-400 font-medium mb-4">
                Showing {Math.min(visibleCount, products.length)} of {products.length} results
              </span>
              <button 
                onClick={() => setVisibleCount(prev => prev + 12)}
                className="border-[1.5px] border-[#0B1526] text-[#0B1526] hover:bg-gray-50 active:bg-gray-100 bg-transparent rounded-full px-16 py-3 font-semibold text-[15px] transition-colors"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
