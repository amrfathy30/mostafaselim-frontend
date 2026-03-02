import { useState } from "react";
import { Facebook, Instagram, TikTokIcon } from "./Icons";
import { subscribe } from "../services/homeService";
import { Button } from "../Components/Common/button";
import toast from "react-hot-toast";
import { Settings } from "../types";

const Footer = ({ settings }: { settings: Settings }) => {
  const [email, setEmail] = useState("");
  const [emailTarget, setEmailTarget] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const footerLinks = [
    { label: "الرئيسية", to: "/" },
    { label: "المقالات", to: "/articles" },
    { label: "الكتب", to: "/books" },
    { label: "البودكاست", to: "/audio-Page" },
    { label: "المدونة", to: "/blogs" },
  ];

  const handleSubmit = async () => {
    const data = { email: email };
    if (emailTarget.checkValidity()) {
      try {
        setLoading(true);
        const response = await subscribe(data);
        if (
          response.status === 200 ||
          response.status === 201 ||
          response.status === 202
        ) {
          setLoading(false);
          toast.success("تم الاشتراك بنجاح ");
          setEmail("");
        }
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message ||
          "حدث خطأ أثناء الارسال برجاء المحاوله مره اخري",
        );
        setLoading(false);
      }
    } else {
      toast.error("للمتابعه قم بادخال بريد الكتروني صحيح");
    }
  };

  return (
    <footer className="flex items-center justify-center bg-gradient-to-b from-[#3A5F7D] to-[#153957] text-white py-6 border-t-8 border-white w-full">
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-[100px] xxl:px-[154px]">
        <div className="flex flex-col items-center mb-4">
          <h2 className="text-base lg:text-lg font-bold mb-4 text-center">
            اشترك الان ليصلك كل ما هو جديد
          </h2>
          <div className="flex flex-col w-full max-w-lg gap-3 lg:flex-row lg:gap-3">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailTarget(e.target);
              }}
              type="email"
              placeholder="اكتب بريدك الالكتروني"
              className="w-full lg:w-[454px] lg:flex-1 bg-white text-gray-800 placeholder-gray-400 px-6 py-3 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-primary text-right h-[56px]"
            />
            <Button
              className="h-[56px] w-full lg:w-[140px] flex items-center justify-center"
              onClick={() => handleSubmit()}
              type={"primary"}
              disabled={!email}
              loading={loading}
            >
              اشتراك
            </Button>
          </div>
        </div>

        <div
          className="flex lg:hidden items-center justify-center gap-4 mb-4"
          dir="ltr"
        >
          <div
            className="flex lg:hidden items-center justify-center gap-4 mb-4"
            dir="ltr"
          >
            <a
              href={settings?.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <TikTokIcon size={26} />
            </a>
            <a
              href={settings?.facebook || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Facebook size={26} />
            </a>
            <a
              href={settings?.instagram || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Instagram size={26} />
            </a>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-between pt-4 border-t border-white/20">
          <a href="/" className="shrink-0 bg-white p-2">
            {/* <Logo variant="light" /> */}
            <img
              src={settings?.logo}
              alt="logo"
              className="w-32 h-full object-cover"
            />
          </a>

          <nav className="flex items-center gap-4 xl:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="relative text-base text-white/90 font-normal transition-colors duration-300 hover:text-white"
              >
                <span className="after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                  {link.label}
                </span>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2" dir="ltr">
            <a
              href={settings?.linkedin || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <TikTokIcon size={26} />
            </a>
            <a
              href={settings?.facebook || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Facebook size={26} />
            </a>
            <a
              href={settings?.instagram || "#"}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Instagram size={26} />
            </a>
          </div>
        </div>

        <div className="text-center text-white/80 text-sm font-bold mt-4">
          <p>{settings?.footer}</p>
          {/* <div className="mt-2">
            <a
              href="/admin"
              className="text-white/50 hover:text-white text-xs transition-colors"
            >
              لوحة التحكم
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
