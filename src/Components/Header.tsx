import logo from '../assets/logo.png';
import Instegram from '../assets/instagram.png';
import Facebook from '../assets/facebook.png';
import Tiktok from '../assets/Tiktok.png';
import Navbar from './Navbar';

import './Header.css';

interface HeaderProps {
  className?: string; 
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className="text-white p-4 h-[138px]  flex flex-row items-center justify-between">
      <img src={logo} alt="Logo" className="header-logo w-32 basis-1/10"  />
      <Navbar />
      <div className='basis-2/10 justify-items-center'>
        <ul className="flex space-x-1 ">
          <li><a href="https://instagram.com" className="hover:underline">
            <img src={Instegram} alt="Instgram" className="w-6"  />
          </a></li>
          <li><a href="https://facebook.com" className="hover:underline">
              <img src={Facebook} alt="Facebook" className="w-6"  />
          </a></li>
          <li><a href="https://tiktok.com" className="hover:underline">
            <img src={Tiktok} alt="Tiktok" className="w-6"  />
          </a></li>
        </ul>
      </div>
    </header>
  );
}