

import './styles/fonts.css'
import './styles/layers.css'

import Header from './Components/Header'
import Footer from './Components/Footer'
import BodyContent from './Components/body-content'
import React from 'react'


function App({isRTL}) {

  return (
    <div className="App @container">
    <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "text-right " : "text-left"}>
    <div  className=''>
     <Header />
     <div className='min-h-[calc(100vh-100px)] xxl:min-h-[calc(100vh-138px)]'>
       <BodyContent />
     </div>
    
     <Footer />
    </div>
    </div>
    </div>
  )
}

export default App
