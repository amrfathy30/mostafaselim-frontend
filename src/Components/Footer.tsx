import React from 'react';
import { Facebook, Instagram, TikTokIcon, Logo } from './Icons';

const Footer: React.FC = () => {
  const footerLinks = [
    'الرئيسية',
    'عن الدكتور',
    'المقالات',
    'الكتب',
    'البودكاست',
    'المدونة'
  ];

  return (
    <footer className="bg-primary text-white py-12 border-t-8 border-white">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Newsletter Section */}
        <div className="flex flex-col items-center mb-10 lg:mb-16">
          <h2 className="text-xl lg:text-3xl font-bold mb-6 text-center">اشترك الان ليصلك كل ما هو جديد</h2>
          
          <div className="flex flex-col w-full max-w-lg gap-3 lg:flex-row lg:gap-4">
            <input 
              type="email" 
              placeholder="اكتب بريدك الالكتروني" 
              className="w-full lg:flex-1 bg-white text-gray-800 placeholder-gray-400 px-6 py-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary text-right h-12"
            />
            <button className="w-full lg:w-auto bg-[#007FFF] hover:bg-[#153957] text-white font-bold py-3 px-10 rounded-lg shadow-lg transition-colors duration-300 whitespace-nowrap h-12">
              اشتراك
            </button>
          </div>
        </div>

        {/* Mobile Social Icons (Visible only on small screens) */}
        <div className="flex lg:hidden items-center justify-center gap-6 mb-10" dir="ltr">
             <a href="#" className="hover:opacity-80 transition-opacity">
                <TikTokIcon size={32} />
             </a>
             <a href="#" className="hover:opacity-80 transition-opacity">
                <Facebook size={32} />
             </a>
             <a href="#" className="hover:opacity-80 transition-opacity">
                <Instagram size={32} />
             </a>
        </div>

        {/* Desktop Bottom Bar */}
        <div className="hidden lg:flex flex-col lg:flex-row items-center justify-between border-t border-gray-600/30 pt-8 gap-8">
          
          {/* Socials (Desktop) - Left side in RTL (End) */}
          <div className="flex items-center gap-4 order-3 lg:order-3" dir="ltr">
             <a href="#" className="hover:opacity-80 transition-opacity">
                <TikTokIcon size={32} />
             </a>
             <a href="#" className="hover:opacity-80 transition-opacity">
                <Facebook size={32} />
             </a>
             <a href="#" className="hover:opacity-80 transition-opacity">
                <Instagram size={32} />
             </a>
          </div>

          {/* Links - Center */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8 order-2">
            {footerLinks.map(link => (
              <a key={link} href="#" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
                {link}
              </a>
            ))}
          </div>

          {/* Logo - Right side in RTL (Start) */}
          <div className="order-1 lg:order-1">
            <Logo variant="light" />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center lg:mt-12 text-gray-300 text-sm font-bold">
          <p>جميع حقوق النشر محفوظة لدي دكتور مصطفى سليم 2025</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;