import React, { useState } from 'react';
import { Facebook, Instagram, TikTokIcon, Logo } from './Icons';
import { subscribe } from '../services/homeService';
import {Button} from '../Components/Common/button'
import toast, { Toaster } from 'react-hot-toast';
const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailTarget, setEmailTarget] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const footerLinks = [
    { label: 'الرئيسية', to: '/' },
    // { label: 'عن الدكتور', to: '/about' },
    { label: 'المقالات', to: '/articles' },
    { label: 'الكتب', to: '/books' },
    { label: 'البودكاست', to: '/podcasts' },
    { label: 'المدونة', to: '/blogs' },
  ];


  const handleSubmit = async () => {
    const data = {
      'email': email
    }
    if (emailTarget.checkValidity()) {
      try {
        setLoading(true);
        const response = await subscribe(data )
        if (response.status === 200 || response.status === 201 || response.status === 202) {
          setLoading(false);
          toast.success("تم الاشتراك بنجاح ");
          setEmail('')
        }
      } catch (err: any) {

        toast.error( err?.response?.data?.message || "حدث خطأ أثناء الارسال برجاء المحاوله مره اخري");
        console.error("Axios Error:", err.response?.data || err.message||err.response?.data?.message);
        setLoading(false);
      }
    } else {
      toast.error('للمتابعه قم بادخال بريد الكتروني صحيح');
    }

  };
  return (
    <footer className="bg-gradient-to-b from-[#3A5F7D] to-[#153957] text-white py-12 border-t-8 border-white">
      <div className="container mx-auto px-6 lg:px-12">

        {/* Newsletter Section */}
        <div className="flex flex-col items-center mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-3xl font-bold mb-6 text-center">اشترك الان ليصلك كل ما هو جديد</h2>

          <div className="flex flex-col w-full max-w-lg gap-3 lg:flex-row lg:gap-4">
            <input
              value={email}
              onChange={e =>{ 
                setEmail(e.target.value)
                setEmailTarget(e.target)

              }}
              type="email"
              placeholder="اكتب بريدك الالكتروني"
              className="w-full lg:w-[454px] lg:flex-1 bg-white text-gray-800 placeholder-gray-400 px-6 py-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary text-right h-[56px]"
            />
           
            <Button className='h-[56px] w-full lg:w-[186px] flex items-center justify-center' onClick={()=>handleSubmit()} type={'primary'} disabled={!email} loading={loading}>  اشتراك
            </Button>
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
        <div className="hidden lg:flex flex-col lg:flex-row items-center justify-between pt-8 gap-8">

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
              <a key={link?.to} href={link?.to} className="text-[#F5F5F5] hover:text-white transition-colors text-sm lg:text-base">
                {link?.label}
              </a>
            ))}
          </div>

          {/* Logo - Right side in RTL (Start) */}
          <a  href='/' className="order-1 lg:order-1">
            <Logo variant="light"  />
          </a>
        </div>
<div className='w-full h-[1px] bg-white my-8'></div>
        {/* Copyright */}
        <div className="text-center text-white text-sm font-bold">
          <p>جميع حقوق النشر محفوظة لدي دكتور مصطفى سليم 2025</p>
        </div>

        {/* Admin Entry Point */}
        <div className="text-center mt-4">
          <a href="/admin" className="text-gray-200 hover:text-white text-xs transition-colors">
            لوحة التحكم
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;