import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import arrow from '../../assets/arrow.png';

const About = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <div>
            <h1 className="font-medium md:text-3xl text-3xl md:px-40 px-5 py-10 text-with-glow" style={{ color: '#FFFFFF' }} data-aos="zoom-out" data-aos-duration="1000">About Me _____</h1>
            <div className='grid md:grid-cols-2 text-white'>
                <div>
                    <div className='md:px-40 px-5 flex justify-center' data-aos="fade-right">
                        <h1 className='font-semibold text-2xl'>Building bridges between the front-end and back-end, turning ideas into immersive digital experiences.</h1>
                    </div>
                    <div className='md:px-40 px-5 py-10' data-aos="fade-right">
                        <p className='text-lg font-light flex justify-center'>My passion for coding drives me to continuously learn and adapt to new technologies and industry best practices. I thrive in fast-paced environments where I can collaborate with cross-functional teams to create innovative solutions to complex problems.</p>
                    </div>
                </div>
                <div>
                    <h1 className='md:text-4xl text-2xl md:px-40 mx-5' data-aos="fade-left">Any type of query and discussion.</h1>
                    <div>
                        <p className='text-2xl md:px-40 md:py-5 py-5 mx-5' data-aos="fade-left">Contact me</p>
                    </div>
                    <div className='md:px-40 mx-5'>
                        <div className='flex space-x-2 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105'>
                            <a href='mailto:manicdon05082003@gmail.com' className='md:text-2xl text-lg' style={{ color: '#FF4900' }} data-aos="fade-left">manikandan05082003@gmail.com</a>
                            <img src={arrow} className='h-8' alt='arrow' data-aos="flip-up" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
