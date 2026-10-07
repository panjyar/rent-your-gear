import React, { useRef, useEffect, useState } from 'react';
import { X, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Info, Percent } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// Simple helper to get days in a month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const DatePickerPopup = ({ onClose }) => {
  const { deliveryDate, setDeliveryDate, pickupDate, setPickupDate } = useAppContext();
  const popupRef = useRef(null);
  
  // Local state for calendar navigation
  const [currentDate, setCurrentDate] = useState(new Date()); // e.g. Oct 2026
  
  // Local state for selection to allow "Continue" button
  const [localDelivery, setLocalDelivery] = useState(deliveryDate);
  const [localPickup, setLocalPickup] = useState(pickupDate);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleDateClick = (date) => {
    if (!localDelivery || (localDelivery && localPickup)) {
      // Start new selection
      setLocalDelivery(date);
      setLocalPickup(null);
    } else if (localDelivery && !localPickup) {
      if (date >= localDelivery) {
        setLocalPickup(date);
      } else {
        // If selected date is before delivery, make it the new delivery
        setLocalDelivery(date);
      }
    }
  };

  const handleContinue = () => {
    setDeliveryDate(localDelivery);
    setPickupDate(localPickup);
    onClose();
  };

  const formatDate = (date) => {
    if (!date) return 'Select Date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const formatShortDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  const calculateDays = () => {
    if (localDelivery && localPickup) {
      const diffTime = Math.abs(localPickup - localDelivery);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
      return diffDays;
    }
    return 1;
  };

  const renderCalendar = (year, month, offset = 0) => {
    const displayMonth = month + offset > 11 ? (month + offset) % 12 : month + offset;
    const displayYear = month + offset > 11 ? year + 1 : year;
    
    const daysInMonth = getDaysInMonth(displayYear, displayMonth);
    const firstDay = getFirstDayOfMonth(displayYear, displayMonth);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(displayYear, displayMonth, i));

    return (
      <div className="flex-1">
        <div className="text-center font-bold text-gray-900 mb-6 mt-1">
          {monthNames[displayMonth]} {displayYear}
        </div>
        <div className="grid grid-cols-7 gap-y-3 mb-3 text-center text-[13px] text-gray-500 font-medium">
          {weekDays.map(d => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center text-sm font-medium">
          {days.map((date, idx) => {
            if (!date) return <div key={`empty-${idx}`} />;
            
            const isDelivery = localDelivery && date.getTime() === localDelivery.getTime();
            const isPickup = localPickup && date.getTime() === localPickup.getTime();
            const isInRange = localDelivery && localPickup && date > localDelivery && date < localPickup;
            const isPast = date < new Date(new Date().setHours(0,0,0,0));
            
            let bgClass = "hover:bg-gray-100 rounded-full text-gray-800";
            if (isDelivery || isPickup) bgClass = "bg-brand-green text-gray-900 font-bold rounded-[8px]";
            else if (isInRange) bgClass = "bg-[#d4f794] text-gray-900 rounded-none";
            else if (isPast) bgClass = "text-gray-300 cursor-not-allowed hover:bg-transparent font-normal";

            // If it's the start of the range, round the left corners. If end, round right.
            if (isInRange) {
              if (date.getDay() === 0) bgClass += " rounded-l-[8px]";
              if (date.getDay() === 6) bgClass += " rounded-r-[8px]";
            }
            if (isDelivery && localPickup) bgClass += " rounded-l-[8px] rounded-r-none";
            if (isPickup && localDelivery) bgClass += " rounded-r-[8px] rounded-l-none";

            return (
              <div key={idx} className={`relative flex items-center justify-center h-10 cursor-pointer transition-colors ${bgClass}`}
                   onClick={() => !isPast && handleDateClick(date)}>
                {date.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const rentalDays = calculateDays();

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        ref={popupRef}
        className="bg-background-surface w-full max-w-[980px] rounded-[24px] shadow-2xl relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 cursor-default"
      >
        <button onClick={onClose} className="absolute right-6 top-6 text-gray-500 hover:text-gray-800 z-10 transition-colors">
          <X size={20} />
        </button>

        {/* Left Panel */}
        <div className="w-full md:w-[42%] flex flex-col gap-2">
          <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Select your Dates</h2>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-[13px] text-gray-600 font-medium mb-1.5 block">Delivery Date <span className="text-red-500">*</span></label>
              <div className={`flex items-center gap-2 bg-white border ${localDelivery && !localPickup ? 'border-primary ring-1 ring-primary/20' : 'border-gray-200'} rounded-[12px] px-4 py-3.5 shadow-sm transition-all`}>
                <CalendarIcon size={18} className="text-gray-600" />
                <span className={`text-[15px] font-bold ${localDelivery ? 'text-gray-900' : 'text-gray-400'}`}>
                  {formatDate(localDelivery)}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-[13px] text-gray-600 font-medium mb-1.5 block">Pickup Date <span className="text-red-500">*</span></label>
              <div className={`flex items-center gap-2 bg-white border ${localDelivery && !localPickup ? 'border-primary ring-1 ring-primary/20' : 'border-gray-200'} rounded-[12px] px-4 py-3.5 shadow-sm transition-all`}>
                <CalendarIcon size={18} className="text-gray-600" />
                <span className={`text-[15px] font-bold ${localPickup ? 'text-gray-900' : 'text-gray-400'}`}>
                  {formatDate(localPickup)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-primary-light/60 text-primary text-[13px] p-4 rounded-[12px] flex items-start gap-3 leading-relaxed">
            <Info size={18} className="flex-shrink-0 mt-0.5 text-primary" />
            <p>
              <span className="font-semibold">Same-day delivery</span> between 5PM and 11PM For future dates, you can select a specific time slot available at checkout. We pickup between 9AM to 1PM.
            </p>
          </div>

          <div>
            <label className="text-[13px] text-gray-600 font-medium mb-2 block">Your Rental Period:</label>
            <div className="bg-white border border-gray-200 rounded-[12px] p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[42px] font-bold text-gray-900 leading-none tracking-tight">{String(rentalDays).padStart(2, '0')}</span>
                <span className="text-sm text-gray-500 font-medium">Day{rentalDays > 1 ? 's' : ''}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-gray-500 font-medium">Chargeable Period:</span>
                <div className="flex items-center gap-1.5 font-bold text-sm text-gray-900 mt-0.5">
                  <CalendarIcon size={14} className="text-gray-500" />
                  {localDelivery ? `${formatShortDate(localDelivery)} - ${formatShortDate(localPickup || localDelivery)}` : '-'}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0A1930] text-white rounded-[16px] p-5 relative overflow-hidden shadow-md mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <Percent size={20} className="text-brand-green" />
              <h3 className="font-bold italic text-brand-green text-lg tracking-wide">Save more with us!</h3>
            </div>
            <p className="text-[13px] text-gray-300 leading-relaxed relative z-10">
              Longer rental periods mean bigger savings—enjoy discounts of up to 12%. We don't charge you for deliver and pickup days!
            </p>
          </div>

          <button 
            onClick={handleContinue}
            disabled={!localDelivery || !localPickup}
            className="w-full bg-[#1b43d6] hover:bg-primary text-white font-bold text-[16px] py-4 rounded-full shadow-md transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed mt-2"
          >
            Continue
          </button>
        </div>

        {/* Right Panel - Calendar */}
        <div className="flex-1 bg-white rounded-[20px] shadow-sm p-6 relative flex flex-col justify-center">
          <div className="flex items-center justify-between absolute top-6 left-6 right-6">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 text-gray-500 shadow-sm transition-all bg-white z-10">
              <ChevronLeft size={16} />
            </button>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100 border border-gray-200 text-gray-500 shadow-sm transition-all bg-white z-10">
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-12 px-2">
            {renderCalendar(currentDate.getFullYear(), currentDate.getMonth(), 0)}
            <div className="hidden md:block flex-1">
              {renderCalendar(currentDate.getFullYear(), currentDate.getMonth(), 1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerPopup;
