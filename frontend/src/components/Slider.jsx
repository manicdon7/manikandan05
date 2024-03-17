import React from 'react'
import Marquee from "react-fast-marquee";
import star from '../assets/star.png';
import enjoy from '../assets/enjoy.png';
import shine from '../assets/shine.png';

const Slider = () => {
  return (
    <div>
        <Marquee className='overflow-x-hidden' style={{zIndex:0}}>
            <div className='flex space-x-10 border-2 p-2 border-gray-200'>
                <div className='flex space-x-3'>
                    <img src={star} alt='star' className='h-10'/>
                    <h1 className='md:text-4xl text-2xl text-white'> realize your ideas</h1>
                </div>
                <div className='flex space-x-3'>
                    <img src={enjoy} alt='enjoy' className='h-10'/>
                    <h1 className='md:text-4xl text-2xl text-white'> enjoy the result</h1>
                </div>
                <div className='flex space-x-3'>
                    <img src={shine} alt='shine' className='h-10'/>
                    <h1 className='md:text-4xl text-2xl text-white'> discuss your ideas into real world</h1>
                </div>
                <div className='flex space-x-3'>
                    <img src={star} alt='star' className='h-10'/>
                    <h1 className='md:text-4xl text-2xl text-white'> execute a task</h1>
                </div>
                <div className='flex space-x-3'>
                    <img src={enjoy} alt='enjoy' className='h-10'/>
                    <h1 className='md:text-4xl text-2xl text-white'> utilizing a networking</h1>
                </div>
            </div>
        </Marquee>
    </div>
  )
}

export default Slider;