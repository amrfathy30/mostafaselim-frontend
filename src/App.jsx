//import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Bodycontent from './Components/Bodycontent'
import "./fonts.css";

function App({isRTL}) {
 // const [count, setCount] = useState(0)

  return (
    <div className="App @container">
    <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "text-right " : "text-left"}>
    <div  className=''>
     <Header className='flex flex-col min-h-screen justify-between ' />
     <Bodycontent />
     <Footer />
    </div>
    </div>
    </div>
  )
}

export default App
