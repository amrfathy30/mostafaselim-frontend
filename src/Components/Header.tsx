import { useState } from "react";
import {
  Logo,
  MenuIcon,
  CloseIcon,
  Facebook,
  Instagram,
  TikTokIcon,
} from "./Icons";
import { Link, useLocation } from "react-router-dom";

const Header = ({ settings }) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "المقالات", to: "/articles" },
    { label: "الكتب", to: "/books" },
    { label: "البودكاست", to: "/podcasts" },
    { label: "المدونة", to: "/blogs" },
  ];

  return (
    <header className="flex items-center justify-center bg-white py-4 shadow-sm relative z-50 sticky top-0 h-fit lg:h-[100px] xxl:h-[138px]">
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-[100px] xxl:px-[154px] flex items-center justify-between">
        {/* Logo Section */}
        <a href="/" className="flex-shrink-0">
          <Logo variant="dark" />
        </a>

        {/* Desktop Navigation - Hidden on Tablet & Mobile (lg breakpoint) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-[34px]">
          {navLinks.map((link) => (
            <Link
              to={link.to}
              key={link.label}
              className={`relative text-[20px] transition-colors duration-300 ${
                location?.pathname === link.to
                  ? "text-primary font-bold"
                  : "text-textPrimary"
              }`}
            >
              <span className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Social Icons - Visible on Desktop AND Tablet (md breakpoint and up) */}
        {/* dir="ltr" ensures the order is TikTok -> Facebook -> Instagram from Left to Right */}
        <div className="hidden md:flex items-center gap-3 text-secondary" dir="ltr">
          <a href={settings?.linkedin || "#"} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
            <TikTokIcon color='#3A5F7D' className="w-8 h-8" />
          </a>
          <a
            href={settings?.facebook || "#"}
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Facebook color="#3A5F7D" className="w-8 h-8" />
          </a>
          <a
            href={settings?.instagram || "#"}
            target="_blank"
            rel="noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Instagram color="#3A5F7D" className="w-8 h-8" />
          </a>
        </div>

        {/* Burger Button - Visible below lg breakpoint (Mobile & Tablet) */}
        <button
          className="lg:hidden p-2 focus:outline-none transition-opacity hover:opacity-80"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {isMenuOpen ? <CloseIcon size={32} /> : <MenuIcon size={32} />}
        </button>
      </div>

      {/* Responsive Dropdown Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-[600px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col py-6 px-6">
          {/* Navigation Links - Always visible in dropdown when burger is used */}
          <nav className="flex flex-col gap-2 mb-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.to}
                className={`hover:text-primary hover:bg-gray-50 font-bold text-xl py-3 rounded-lg transition-all ${location?.pathname == link.to ? "text-primary" : "text-gray-700 "}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons in Dropdown - Only visible on Mobile (< md) */}
          <div className="flex md:hidden items-center justify-center gap-6 pt-4 border-t border-gray-100 text-secondary" dir="ltr">
            <a href={settings?.linkedin || "#"} target="_blank" rel="noreferrer" className="hover:opacity-80 transition-opacity">
              <TikTokIcon color='#3A5F7D' className="w-10 h-10" />
            </a>
            <a
              href={settings?.facebook || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Facebook color="#3A5F7D" className="w-10 h-10" />
            </a>
            <a
              href={settings?.instagram || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Instagram color="#3A5F7D" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
