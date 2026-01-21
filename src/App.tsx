import './styles/fonts.css'
import './styles/layers.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import BodyContent from './Components/body-content'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom' 
import { Toaster } from 'react-hot-toast'
import { getSettingsData } from './services/homeService'

interface AppProps {
  isRTL: boolean;
}

function App({ isRTL }: AppProps) {
  const location = useLocation();
  const isAdminPage = location.pathname.toLowerCase().includes('/admin');
  const [settingsData, setSettingsData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        setLoading(true);
        const response = await getSettingsData();
        const _settingsData = response.data || [];
        setSettingsData(_settingsData)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettingsData();
  }, []);

  return (
    <div className="App @container">
      <Toaster position="bottom-right"/>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "text-right " : "text-left"}>
        <div className=''>
          {/* لو الصفحة مش تبع الأدمن، أظهر الهيدر والفوتر العاديين */}
          {!isAdminPage && <Header/>}

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