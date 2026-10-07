import React, { useState } from 'react';
import { MapPin, Search, ShoppingCart, User, CalendarDays, ChevronDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import LocationSelectorPopup from './LocationSelectorPopup';
import DatePickerPopup from './DatePickerPopup';
import { categoryData } from './CategoryNav';

const Header = () => {
  const { selectedCity, deliveryDate, pickupDate, isCartOpen, setIsCartOpen, cartItems, activeCategory } = useAppContext();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const formattedDelivery = deliveryDate ? `${deliveryDate.getDate()}th ${deliveryDate.toLocaleDateString('en-US', { month: 'short' })}` : '10th Oct';
  const formattedPickup = pickupDate ? `${pickupDate.getDate()}th ${pickupDate.toLocaleDateString('en-US', { month: 'short' })}` : '24th Oct';

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Fallback to gaming color if undefined
  const currentNavColor = categoryData[activeCategory]?.navColor || '#4C187C';

  return (
    <header className="sticky top-0 z-50 w-full py-3 shadow-md transition-colors duration-300" style={{ backgroundColor: currentNavColor }}>
      <div className="container mx-auto px-4 w-full flex items-center justify-between">

        {/* Left Side: Logo */}
        <a href="/" className="flex items-center flex-shrink-0">
          <div className="bg-[#2463eb] text-white rounded-[12px] px-5 py-2.5 shadow-sm flex items-center justify-center">
            <span className="font-bold text-xl md:text-2xl tracking-tighter italic">SharePal</span>
          </div>
        </a>

        {/* Center: Combined Location & Date Selector */}
        <div className="hidden lg:flex items-center bg-white rounded-full p-1 shadow-sm relative border border-gray-200">

          {/* Location */}
          <div className="relative">
            <button
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-4 py-2 rounded-l-full text-[13px] transition-colors"
            >
              <MapPin size={16} className="text-gray-600" />
              <span>{selectedCity}</span>
              <ChevronDown size={14} className="text-gray-500" />
            </button>
            {isLocationOpen && <LocationSelectorPopup onClose={() => setIsLocationOpen(false)} />}
          </div>

          {/* Divider */}
          <div className="h-5 w-[1px] bg-gray-300"></div>

          {/* Dates */}
          <div className="relative flex items-center">
            <div
              className="flex items-center gap-6 px-4 text-[13px] text-gray-700 cursor-pointer hover:bg-gray-50 rounded-full py-2"
              onClick={() => setIsDateOpen(!isDateOpen)}
            >
              <div className="flex items-center gap-2 font-medium">
                <CalendarDays size={16} className="text-gray-500" />
                Delivery Date: {formattedDelivery}
              </div>
              <div className="flex items-center gap-2 font-medium">
                <CalendarDays size={16} className="text-gray-500" />
                Pickup Date: {formattedPickup}
              </div>
            </div>
            {isDateOpen && <DatePickerPopup onClose={() => setIsDateOpen(false)} />}
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsDateOpen(true)}
            className="bg-[#0A1930] hover:bg-gray-900 text-white px-5 py-2 rounded-full font-medium text-[13px] transition-colors shadow-sm flex items-center gap-2 ml-1"
          >
            <CalendarDays size={14} />
            Edit
          </button>
        </div>

        {/* Right Side: Icons */}
        <div className="flex items-center gap-4 md:gap-6 text-white relative">
          <button className="hover:text-gray-200 transition-colors hidden lg:block">
            <Search size={22} />
          </button>

          <button
            className="hover:text-gray-200 transition-colors relative"
            onClick={() => setIsCartOpen(!isCartOpen)}
          >
            <ShoppingCart size={22} />
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-green text-gray-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartQuantity}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 cursor-pointer hover:text-gray-200 transition-colors">
            <div className="bg-white p-2 rounded-full transition-colors duration-300" style={{ color: currentNavColor }}>
              <User size={18} />
            </div>
            <span className="text-sm font-medium hidden md:block">Hi, Login</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
