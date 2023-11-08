import React from 'react'
import Lottie from "lottie-react";
import Loder from '../../Assets/Json/Loder.json'
import './Loader.css'


function Loader() {
  return (
    <div className='Loader position-relative flex-c'>
        <div className="icon">
            <Lottie animationData={Loder} loop={true} />
        </div>
    </div>
  )
}

export default Loader