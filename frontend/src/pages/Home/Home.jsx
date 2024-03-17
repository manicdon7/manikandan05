import React, { useState } from 'react';
import Aos from 'aos';
import '../../../src/App.css'
import Navbar from '../../components/Navbar';
import img from '../../assets/Manikandan.png';
import spin from '../../assets/spin.png';
import Slider from '../../components/Slider';
import About from '../About/About';
import Down from '../../assets/Down.png';
import Projects from '../Projects/Projects';
import Service from '../Service/Service';
import Testimonials from '../Testimonials/Testimonials';
import Contact from '../Contact/Contact';
import Footer from '../../components/Footer';

const bg = {
  backgroundImage: `url(${spin})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "absolute",
  marginLeft: "10px",
  height: "600px",
  width: "900px",
  animation: "slideRight 5s linear infinite",
};

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className='h-full overflow-x-hidden' style={{ backgroundColor: '#242424' }}>
      <Navbar isOpen={isDrawerOpen} toggleMenu={toggleDrawer} />
      <div className='md:grid md:grid-cols-2' id='Home'>
        <div className=''>
          <div className='grid md:grid-cols-4 grid-cols-1'>
            {/* <div>
              <h1 className='text-white md:text-9xl text-5xl md:my-20 my-28 font-bold md:mx-40 mx-10'>Mani <br /> Kandan</h1>
            </div> */}
            <div className='px-4 pt-10 md:pt-0'>
              <img src={img} onContextMenu={(e) => e.preventDefault()} className='min-h-max max-w-7xl h-80 md:h-full mx-2 md:mx-20' alt='iam' />
            </div>
            <div className='block md:hidden'>
              <Slider />
            </div>
          </div>
        </div>
        <div>
          <div>
            <h1 className='text-2xl md:text-5xl text-white font-bold flex justify-center pt-10 md:pt-40'>FullStack Developer</h1>
          </div>
          <div>
            <h1 className='text-center py-2 px-5 md:px-40 text-white text-xl'>Experienced full stack developer with a passion for creating web applications. Specializing in front-end design, back-end development, and database management. Freelancer committed to delivering high-quality, customized solutions for clients worldwide.</h1>
          </div>
          <div className='py-5 flex justify-center text-white'>
            <a href='#projects' className='shadow-2xl md:text-xl text-lg rounded-3xl p-4 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105 border-glow border'>View My Works</a>
          </div>
          <div className='flex justify-center h-20 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105'>
            <a href='#about' style={{ scrollBehavior: 'smooth' }} className='scroll-mb-44 animate-bounce transition duration-1000 md:pt-10 pt-5'>
              <img src={Down} alt='down' />
            </a>
          </div>
        </div>
      </div>
      <div className='md:block hidden'>
        <Slider />
      </div>
      <div id='about'>
        <About />
      </div>
      <div id='projects'>
        <Projects />
      </div>
      <div id='service'>
        <Service />
      </div>
      <div className='testimonials'>
        <Testimonials />
      </div>
      <div id='contact'>
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
