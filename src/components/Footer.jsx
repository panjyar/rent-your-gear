import React from 'react';
import { ChevronUp, Mail, Headphones } from 'lucide-react';
import logoImg from '../assets/logo.png';

/* Inline social icons */
const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

/* ─── Footer Category Links Data ─── */
const footerCategories = {
  row1: [
    {
      title: 'Action Cameras',
      links: ['Action Cameras', 'Pocket Cameras', 'GoPro Cameras', 'DJI Cameras', 'DJI Drones', '360 Cameras'],
    },
    {
      title: 'Cameras',
      links: ['DSLR Cameras', 'Cameras', 'iPhones', 'DSLR Gimbal Combos', 'Wildlife Photography', 'Tripod and camera\naccessories'],
    },
    {
      title: 'Trekking Gear',
      links: ['Trekking Gear', 'Trekking Jackets', 'Trek/Snow Pants', 'Trekking Shoes', 'Trek Accessories'],
    },
    {
      title: 'Riding Gear',
      links: ['Riding Gear', 'Riding Luggage', 'Riding Jackets', 'Riding Essentials', 'Riding Boots', 'Binoculars'],
    },
    {
      title: 'Creator Gear',
      links: ['Wireless & Collar Mics', 'Professional Cameras', 'Mirrorless Cameras', 'UNLMTD Vlogging', 'Mobile Gimbals', 'Vlogging'],
    },
  ],
  row2: [
    {
      title: 'Gaming Console',
      links: ['PS5 Console', 'VR', 'Racing Wheel', 'Big Screen Gaming', 'Xbox Console'],
    },
    {
      title: 'Winter Wear',
      links: ['Snow Boots', 'Winter Jackets', 'Backpacks'],
    },
    {
      title: 'Camping Gear',
      links: ['Camping Gear', 'Camping Stools & Tables', 'Camping Tents', 'Sleeping Bags & Mats'],
    },
    {
      title: 'Audio Visual\nEquipment',
      links: ['Projectors', 'VR', 'Mics', 'Speakers'],
    },
  ],
};

/* ─── Footer Navigation Links Data ─── */
const footerLinks = [
  {
    title: 'Sharepal',
    links: ['About', 'Why SharePal', 'Sitemap', 'CarePal'],
  },
  {
    title: 'Become a Pal',
    links: [
      'Sharepal for Creators',
      'Careers',
      'Sharepal for Brands',
      { text: 'Asset Funding Program', badge: 'New' },
      { text: 'Rent Your Gear', badge: 'New' },
    ],
  },
  {
    title: 'Information',
    links: ['How it works?', 'FAQs', 'Verification', 'Cancellation Policy', 'Life at Sharepal'],
  },
  {
    title: 'Policies',
    links: ['Terms & Condition', 'Shipping policy', 'Damage Policy', 'Terms of Use', 'Privacy Policy'],
  },
];

/* ─── Footer Categories Grid (Mega-Menu) ─── */
const FooterCategoriesGrid = () => (
  <div className="pt-16 pb-20">
    {/* Row 1: 5 columns */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16">
      {footerCategories.row1.map((cat) => (
        <div key={cat.title}>
          <h4 className="text-white font-bold text-[15px] mb-6 whitespace-pre-line leading-tight">
            {cat.title}
          </h4>
          <ul className="space-y-4">
            {cat.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-[#8C9AB6] text-[14px] hover:text-white transition-colors duration-200 whitespace-pre-line leading-snug block">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Row 2: 4 columns */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
      {footerCategories.row2.map((cat) => (
        <div key={cat.title}>
          <h4 className="text-white font-bold text-[15px] mb-6 whitespace-pre-line leading-tight">
            {cat.title}
          </h4>
          <ul className="space-y-4">
            {cat.links.map((link) => (
              <li key={link}>
                <a href="#" className="text-[#8C9AB6] text-[14px] hover:text-white transition-colors duration-200 block">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Footer Link Columns ─── */
const FooterLinksSection = () => (
  <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12">
    {footerLinks.map((col) => (
      <div key={col.title}>
        <h4 className="text-white font-bold text-[15px] mb-6">{col.title}</h4>
        <ul className="space-y-4">
          {col.links.map((link, idx) => {
            const text = typeof link === 'string' ? link : link.text;
            const badge = typeof link === 'object' ? link.badge : null;
            return (
              <li key={idx} className="flex items-center">
                <a href="#" className="text-[#8C9AB6] text-[14px] hover:text-white transition-colors duration-200">
                  {text}
                </a>
                {badge && (
                  <span className="bg-[#9FFF00] text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm ml-2.5 leading-none tracking-wide">
                    {badge}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    ))}

    {/* Need Help column */}
    <div>
      <h4 className="text-white font-bold text-[15px] mb-6">Need Help</h4>
      <ul className="space-y-4">
        <li>
          <a href="#" className="text-[#8C9AB6] text-[14px] hover:text-white transition-colors duration-200 flex items-center gap-3">
            <Headphones size={18} className="text-[#8C9AB6]" />
            Contact Support
          </a>
        </li>
        <li>
          <a href="#" className="text-[#8C9AB6] text-[14px] hover:text-white transition-colors duration-200 pl-[30px] block">
            Contact Us
          </a>
        </li>
        <li className="pt-2">
          <a href="mailto:care@sharepal.in" className="text-[#8C9AB6] text-[14px] hover:text-white transition-colors duration-200 flex items-center gap-3">
            <Mail size={18} className="text-[#8C9AB6]" />
            care@sharepal.in
          </a>
        </li>
      </ul>

      {/* Social icons */}
      <div className="flex items-center gap-4 mt-6 pl-[30px]">
        <a href="#" className="text-[#8C9AB6] hover:text-white transition-colors duration-200">
          <FacebookIcon />
        </a>
        <a href="#" className="text-[#8C9AB6] hover:text-white transition-colors duration-200">
          <InstagramIcon />
        </a>
        <a href="#" className="text-[#8C9AB6] hover:text-white transition-colors duration-200">
          <LinkedinIcon />
        </a>
      </div>
    </div>
  </div>
);

/* ─── Main Footer ─── */
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050B1B] text-gray-300 font-sans">
      <div className="container mx-auto px-6 lg:px-12 max-w-[1280px]">
        
        {/* Mega-Menu Section */}
        <FooterCategoriesGrid />

        {/* Subtle separator if needed, but the logo bar acts as one */}
      </div>

      {/* Full width logo bar */}
      <div className="w-full bg-[#0A1128] py-4">
        <div className="container mx-auto px-6 lg:px-12 max-w-[1280px]">
          <img src={logoImg} alt="SharePal" className="h-[28px] w-auto object-contain" />
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-[1280px]">
        {/* Footer Links */}
        <FooterLinksSection />
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-[#131F3F]"></div>

      {/* Bottom bar */}
      <div className="container mx-auto px-6 lg:px-12 max-w-[1280px] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#8C9AB6] text-[14px] hover:text-white transition-colors duration-200 cursor-pointer font-medium"
          >
            Go up <ChevronUp size={16} />
          </button>
        </div>

        <div className="flex-1 text-center">
          <p className="text-[#8C9AB6] text-[14px]">
            © {new Date().getFullYear()}. SWNAC E-Kiraya Services Pvt Ltd
          </p>
        </div>

        <div className="flex-1 text-right">
          <p className="text-[#8C9AB6] text-[14px] flex items-center justify-end gap-1.5">
            Made with <span className="text-[#F43F5E] text-base leading-none">❤</span> for India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
