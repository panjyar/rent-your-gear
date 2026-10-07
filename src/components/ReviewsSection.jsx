import React, { useRef, useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { categoryData } from './CategoryNav';

const reviewsData = [
  {
    name: 'Shruti',
    initials: null,
    city: 'Mumbai',
    product: 'Winter Wear',
    rating: 4,
    text: '" from the time I saw their website, got my refund the entire experience at SharePal was brilliant. The product quality, prices, delivery, communication…',
  },
  {
    name: 'Amit',
    initials: 'AK',
    city: 'Delhi',
    product: 'Riding Gear',
    rating: 5,
    text: '" Awesome experience. Please be the way you are. Received excellent clothes and shoes in washed and clean state. They looked like new ones. Received…',
  },
  {
    name: 'Satyaki',
    initials: 'SB',
    city: 'Kolkata',
    product: 'Trekking Gear',
    rating: 5,
    text: '" I would recommend SharePal for anybody looking to rent trekking gears, on time delivery, condition of products delivered were very good, super…',
  },
  {
    name: 'Afrana',
    initials: 'AS',
    city: 'Bangalore',
    product: 'Gaming Console',
    rating: 5,
    text: '" Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented trekking gear…',
  },
  {
    name: 'Karthik',
    initials: 'KK',
    city: 'Bangalore',
    product: 'Photography',
    rating: 5,
    text: '" It\'s an amazing platform! The quality of gear, the pickup and delivery experience, and the staff is excellent…',
  },
  {
    name: 'Priya',
    initials: 'PR',
    city: 'Hyderabad',
    product: 'Camping Gear',
    rating: 5,
    text: '" Best rental experience ever! The camping gear was in pristine condition. Delivery was on time and the return process was super smooth…',
  },
];

const statsData = [
  { value: '250Cr+', label: 'Saved Together' },
  { value: '4.5M Kg', label: 'CO₂ Emissions Saved' },
  { value: '100K+', label: 'Products In Circulation' },
];

const initialsColors = [
  'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-500', 'bg-teal-600', 'bg-rose-600'
];

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        size={16}
        fill={i <= rating ? '#f6b704' : '#E5E7EB'}
        stroke="none"
      />
    ))}
  </div>
);

const ReviewCard = ({ review, colorClass }) => (
  <div className="bg-white rounded-3xl border border-gray-200 p-6 w-[320px] flex-shrink-0 flex flex-col gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
    {/* Top row: Google icon + stars */}
    <div className="flex items-center gap-3">
      <GoogleIcon />
      <StarRating rating={review.rating} />
    </div>

    {/* Review text */}
    <p className="text-[14px] font-bold text-[#0A1930] leading-relaxed line-clamp-4 min-h-[84px]">
      {review.text}
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 mt-1">
      <div className={`w-9 h-9 rounded-full ${colorClass} text-white flex items-center justify-center text-sm font-bold flex-shrink-0 bg-opacity-20`}>
        <span className={`text-${colorClass.replace('bg-', '')}`}>{review.initials || review.name.charAt(0)}</span>
      </div>
      <div>
        <p className="text-[13px] font-medium text-gray-500 leading-tight">
          {review.name} <br/>
          {review.city} • {review.product}
        </p>
      </div>
    </div>
  </div>
);

const ReviewsSection = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { selectedCity, activeCategory } = useAppContext();

  const categoryName = categoryData[activeCategory]?.name || 'Gaming';
  const breadcrumbLabel = `${categoryName} gadgets on rent`;

  // Auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId;
    let speed = 0.5;

    const autoScroll = () => {
      if (!isDragging && container) {
        container.scrollLeft += speed;
        // Loop back when reaching the end
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, [isDragging]);

  // Drag to scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[13px] text-gray-500 mb-8 font-medium">
          <span className="text-gray-600">{selectedCity}</span>
          <span className="text-gray-400">&gt;</span>
          <span className="text-black font-semibold">{breadcrumbLabel}</span>
        </div>

        {/* Heading */}
        <h2 className="text-[36px] md:text-[42px] font-extrabold text-[#0B1526] text-center mb-12 tracking-tight">
          Served more than <span style={{
            background: 'linear-gradient(90deg, #f26a21 0%, #e95712 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}>1 Lakh Orders</span>
        </h2>
      </div>

      {/* Scrollable Reviews (Full width) */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar pb-6 px-4 md:px-8 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Double the cards for seamless scroll loop */}
        {[...reviewsData, ...reviewsData].map((review, index) => (
          <ReviewCard
            key={index}
            review={review}
            colorClass={initialsColors[index % initialsColors.length]}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 max-w-[1280px]">
        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-12 md:gap-32 mt-16 pt-10 border-t border-gray-100">
          <div className="text-center">
            <p className="text-[52px] font-black tracking-tight leading-none mb-3" style={{
              background: 'linear-gradient(90deg, #123bb6 0%, #1c52d0 40%, #7dbd00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              250Cr+
            </p>
            <p className="text-[15px] text-[#4B5563] font-medium">Saved Together</p>
          </div>
          <div className="text-center">
            <p className="text-[52px] font-black tracking-tight leading-none mb-3" style={{
              background: 'linear-gradient(90deg, #123bb6 0%, #1c52d0 40%, #7dbd00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              4.5M Kg
            </p>
            <p className="text-[15px] text-[#4B5563] font-medium">CO<sub>2</sub>E Emissions Saved</p>
          </div>
          <div className="text-center">
            <p className="text-[52px] font-black tracking-tight leading-none mb-3" style={{
              background: 'linear-gradient(90deg, #123bb6 0%, #1c52d0 40%, #7dbd00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}>
              100K+
            </p>
            <p className="text-[15px] text-[#4B5563] font-medium">Products In Circulation</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
