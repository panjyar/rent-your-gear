import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqData = [
  {
    question: 'How can I rent from SharePal?',
    answer: 'Renting from SharePal is simple. Browse our catalogue, select the products and rental dates, proceed to checkout, and we will deliver it to your doorstep.'
  },
  {
    question: 'If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?',
    answer: 'You can extend the rental duration for individual items separately. Just go to your orders page and select the item you want to extend.'
  },
  {
    question: 'When does the rental start?',
    answer: 'The rental period starts from the delivery date you selected during checkout.'
  },
  {
    question: 'What will be the condition of the products at the time of delivery?',
    answer: 'All our products undergo a strict quality check and sanitization process before delivery. They will be in excellent working condition.'
  },
  {
    question: 'Why is verification required?',
    answer: 'Verification is required to ensure the safety of our expensive equipment and to prevent fraud. It is a standard procedure for all rentals.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100">
        <h2 className="text-2xl md:text-[28px] font-bold text-gray-900 mb-8 font-sans tracking-tight">
          Frequently Asked Questions (FAQs)
        </h2>
        
        <div className="flex flex-col gap-2">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className="border-b border-gray-100 last:border-0"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
                >
                  <span className={`text-[15px] font-semibold transition-colors duration-200 ${isOpen ? 'text-primary-900' : 'text-gray-900 group-hover:text-primary-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={18} className="text-gray-400" />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 text-[15px] leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View more FAQ's button */}
        <button className="w-full mt-6 py-3.5 border border-gray-300 rounded-full text-sm font-semibold text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer">
          View more FAQ's
        </button>
      </div>
    </div>
  );
};

export default FAQSection;
