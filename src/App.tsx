import './styles/fonts.css'
import './styles/layers.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import BodyContent from './Components/body-content'
import React from 'react'
import { useLocation } from 'react-router-dom' 

interface AppProps {
  isRTL: boolean;
}

function App({ isRTL }: AppProps) {
  const location = useLocation();
  // تعديل: استخدام includes لضمان كشف أي رابط تبع الأدمن
  const isAdminPage = location.pathname.toLowerCase().includes('/admin');

  return (
    <div className="App @container">
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "text-right " : "text-left"}>
        <div className=''>
          {/* لو الصفحة مش تبع الأدمن، أظهر الهيدر والفوتر العاديين */}
          {!isAdminPage && <Header />}

          <div className={isAdminPage ? 'w-full' : 'min-h-[calc(100vh-100px)] xxl:min-h-[calc(100vh-138px)]'}>
            <BodyContent />
          </div>
          
          {!isAdminPage && <Footer />}
        </div>
      </div>
    </div>
  )
}

export default App