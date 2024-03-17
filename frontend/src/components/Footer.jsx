import React from 'react'
import arrow from '../assets/arrow.png';

const Footer = () => {
    return (
        <div className='md:mt-10 mt-5 shadow-xl'>
            <div style={{ backgroundColor: '#303030' }} className='grid md:grid-cols-3 grid-cols-1 md:px-20 px-4 py-10'>
                <div className='hidden md:block'>
                    <div className=''>
                        <h1 className='text-4xl text-white md:py-5 py-3 font-bold'>FullStack Developer</h1>
                    </div>
                    <div className='text-2xl font-light text-white'>
                        <p>I'm excited and am always open to new opportunities and collaborations. Whether you're looking to build a cutting-edge web application or simply want to discuss ideas, feel free to reach out.</p>
                    </div>
                </div>
                <div className='text-white grid grid-rows-5 md:mx-40 mx-4 gap-3 md:py-10 py-2'>
                    <a href="#Home" className='text-xl mx-10' style={{ color: '#FFFFFF', transition: 'color 0.5s' }}>Home</a>
                    <a href="#about" className='text-xl mx-10' style={{ color: '#FFFFFF', transition: 'color 0.5s' }}>About</a>
                    <a href="#service" className='text-xl mx-10' style={{ color: '#FFFFFF', transition: 'color 0.5s' }}>Service</a>
                    <a href="#projects" className='text-xl mx-10' style={{ color: '#FFFFFF', transition: 'color 0.5s' }}>Projects</a>
                    <a href="#contact" className='text-xl mx-10' style={{ color: '#FFFFFF', transition: 'color 0.5s' }}>Contact</a>
                </div>

                <div>
                    <div>
                        <h1 className='text-3xl md:text-5xl font-semibold text-white md:mx-5 mx-4 my-5'>Let's Chat</h1>
                    </div>
                    <div>
                        <p className='text-gray-300 md:mx-5 mx-4 md:text-2xl text-xl text-left my-5'>Let's connect and embark on a journey to turn your vision into reality.</p>
                    </div>
                    <div className='flex space-x-2'>
                        <a href='mailto:manikandan05082003@gmail.com' className='text-xl md:text-2xl mx-5 my-3' style={{ color: '#FF4900' }}>manikandan05082003@gmail.com</a>
                        <img src={arrow} className='h-10 w-10 pt-4 md:pt-4' alt='arrow' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;