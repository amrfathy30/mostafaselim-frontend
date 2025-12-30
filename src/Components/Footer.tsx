import React from 'react';
import '../fonts.css'
import { Button } from './button';

export default function Footer() {
  return (
    <footer className="bg-[#3A5F7D] text-white p-4 text-center">
       
       <div className="text-2xl ">
           <b>اشترك الان ليصلك كل جديد</b>
       </div>
       <div className="flex justify-center mt-2">
        <input
          type="email"
          placeholder="ادخل بريدك الالكتروني"
          className="p-2 m-5 rounded-l text-black border-none bg-white outline-none"
        />
     
        <Button type='primary' onClick={()=>console.log('')} className='w-[186px]'>اشترك</Button> 
       </div>
       

       <div className="mt-2">
         مصطفي سليم &copy; 2026 جميع الحقوق محفوظة.
       </div>
    </footer>
  );
}