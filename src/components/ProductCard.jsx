import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { addToCart, deliveryDate, pickupDate } = useAppContext();
  
  const calculateDays = () => {
    if (deliveryDate && pickupDate) {
      const diffTime = Math.abs(pickupDate - deliveryDate);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    }
    return 8; // Default matched to reference image
  };

  const rentalDays = calculateDays();
  const totalPrice = product.per_day_rent * rentalDays;

  // Determine tag color (New = blue, Trending = orange)
  const tagText = product.tag || 'Trending';
  const isNew = tagText.toLowerCase() === 'new';
  const tagClass = isNew 
    ? 'border-[#0070f3] text-[#0070f3]' 
    : 'border-[#ea580c] text-[#ea580c]';

  return (
    <div className="bg-white rounded-[32px] hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full group relative p-5">
      
      {/* Top badges and Favorite Icon */}
      <div className="absolute top-5 left-5 right-5 z-10 flex justify-between items-start">
        <div className={`bg-white border-[1.5px] ${tagClass} text-[12px] font-bold px-3 py-0.5 rounded-[8px] leading-none`}>
          {tagText}
        </div>
        <button className="text-gray-400 hover:text-red-500 transition-colors">
          <Heart size={22} strokeWidth={2} />
        </button>
      </div>

      {/* Image */}
      <div className="w-full relative h-48 md:h-56 bg-white flex items-center justify-center mt-6 mb-2">
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 w-full h-full object-contain mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-300 ease-in-out p-2"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col mt-auto">
        {/* Title */}
        <h3 className="font-bold text-[#0B1526] text-[16px] leading-[1.3] line-clamp-2 h-10 mb-3">
          {product.name}
        </h3>
        
        {/* Subtle Divider */}
        <div className="w-full h-[1.5px] bg-gray-100 mb-3"></div>

        {/* Rent Duration */}
        <div className="text-[13px] text-gray-500 font-semibold mb-1">
          Rent for <span className="font-bold text-gray-700">{rentalDays}</span> days
        </div>

        {/* Price & Add Button */}
        <div className="flex items-end justify-between mt-1">
          <div className="flex flex-col gap-1.5">
            <span className="text-[22px] font-extrabold text-[#0B1526] leading-none tracking-tight">₹{totalPrice.toLocaleString()}</span>
            <div className="bg-[#a3e635] text-[#0B1526] text-[11px] font-bold px-2 py-0.5 rounded-[4px] w-max">
              Incl. of GST
            </div>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={product.out_of_stock}
            className={`w-12 h-12 rounded-full border-[2px] flex items-center justify-center transition-all duration-200 ${
              product.out_of_stock 
                ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50' 
                : 'border-[#0B1526] text-[#0B1526] hover:bg-gray-100 active:scale-95 outline-none'
            }`}
          >
            <Plus size={24} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
