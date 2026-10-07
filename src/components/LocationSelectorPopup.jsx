import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const popularCities = [
  { name: 'Delhi', img: 'https://images.sharepal.in/cities/delhi.svg' },
  { name: 'Mumbai', img: 'https://images.sharepal.in/cities/mumbai.svg' },
  { name: 'Hyderabad', img: 'https://images.sharepal.in/cities/hyderabad.svg' },
  { name: 'Pune', img: 'https://images.sharepal.in/cities/pune.svg' },
  { name: 'Chennai', img: 'https://images.sharepal.in/cities/chennai.svg' },
  { name: 'Bangalore', img: 'https://images.sharepal.in/cities/bangalore.svg' },
];

const otherCities = ['Faridabad', 'Kolkata', 'Gurgaon', 'Noida', 'Ghaziabad'];

const LocationSelectorPopup = ({ onClose }) => {
  const { selectedCity, setSelectedCity } = useAppContext();
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSelect = (city) => {
    setSelectedCity(city);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        ref={popupRef}
        className="bg-white rounded-[24px] shadow-2xl w-full max-w-[900px] p-8 md:p-12 cursor-default relative"
      >
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-400 hover:text-gray-800 z-10 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full">
          <X size={20} />
        </button>

        <h2 className="text-[26px] font-bold text-center text-gray-900 mb-8 tracking-tight">Select Your City</h2>
        
        {/* Popular Cities */}
        <div className="relative flex items-center py-2 mb-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium tracking-wide uppercase">Popular Cities</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        
        <div className="flex justify-around mb-10 px-2 md:px-8">
          {popularCities.map(city => (
            <button 
              key={city.name}
              onClick={() => handleSelect(city.name)}
              className="flex flex-col items-center gap-3 group w-24"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center p-3 transition-all duration-300
                ${selectedCity === city.name ? 'bg-primary-light shadow-md border-2 border-primary' : 'hover:bg-accent border-2 border-transparent'}`}>
                <img 
                  src={city.img} 
                  alt={city.name} 
                  className={`w-full h-full object-contain transition-transform duration-300 ${selectedCity === city.name ? 'scale-110' : 'group-hover:scale-110'}`}
                />
              </div>
              <span className={`text-[15px] font-bold transition-colors duration-200 ${selectedCity === city.name ? 'text-primary' : 'text-gray-600 group-hover:text-gray-900'}`}>
                {city.name}
              </span>
            </button>
          ))}
        </div>

        {/* Other Cities */}
        <div className="relative flex items-center py-2 mb-8">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium tracking-wide uppercase">Other Cities</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="flex flex-wrap gap-5 px-4 justify-center">
          {otherCities.map(city => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className={`px-8 py-3 rounded-full text-[14px] font-bold transition-all duration-200 border
                ${selectedCity === city 
                  ? 'border-primary text-primary bg-primary-light shadow-sm' 
                  : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSelectorPopup;
