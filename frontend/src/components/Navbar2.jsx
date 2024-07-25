import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-no-background.png';

const DesktopNavbar2 = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Section with ID "${sectionId}" not found`);
      }
    }, 0);
  };

  return (
    <nav className='flex justify-between top-0 z-50 fixed w-full backdrop-filter backdrop-blur-lg shadow-2xl bg-opacity-20' style={{ backgroundColor: '#242424' }}>
      <div className='p-4'>
        <img src={logo} alt='logo' className='h-10' onContextMenu={(e) => e.preventDefault()} />
      </div>
      <div className='md:flex md:gap-10 md:px-20 md:py-5 text-2xl text-white'>
        <button onClick={() => handleScrollToSection('home')}>Home</button>
        <button onClick={() => handleScrollToSection('service')}>Service</button>
        <button onClick={() => handleScrollToSection('projects')}>Projects</button>
        <button onClick={() => handleScrollToSection('contact')}>Contact</button>
        <button onClick={() => handleScrollToSection('certificates')}>Certificate</button>
      </div>
      <div className='py-5 px-20 text-white'>
        <a href='/src/assets/Manikandan Resume.pdf' download='Manikandan Resume' className='border-2 border-glow transform text-xl rounded-3xl px-3 py-2 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{ borderColor: '#FF4900' }}>Download Resume</a>
      </div>
    </nav>
  );
};

const MobileNavbar2 = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleScrollToSection = (sectionId) => {
    navigate('/');
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Section with ID "${sectionId}" not found`);
      }
    }, 0);
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDrawerOpen]);

  return (
    <nav className='flex justify-between items-center top-0 z-50 fixed w-full pt-3' style={{ backgroundColor: '#242424' }}>
      <div className='px-4 py-2 text-2xl w-40 text-white'>
        <img src={logo} alt='logo' onContextMenu={(e) => e.preventDefault()} />
      </div>
      <button className="md:hidden block mx-3 z-50" onClick={toggleDrawer}>
        {isDrawerOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        )}
      </button>
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-40">
          <div className="flex flex-col pt-10">
            <button onClick={() => handleScrollToSection('home')} className='text-white py-2 px-4'>Home</button>
            <button onClick={() => handleScrollToSection('service')} className='text-white py-2 px-4'>Service</button>
            <button onClick={() => handleScrollToSection('projects')} className='text-white py-2 px-4'>Projects</button>
            <button onClick={() => handleScrollToSection('contact')} className='text-white py-2 px-4'>Contact</button>
            <button onClick={() => handleScrollToSection('certificates')} className='text-white py-2 px-4'>Certificate</button>
          </div>
          <div className='py-2 px-2 text-white'>
            <a href='/src/assets/Manikandan Resume.pdf' download='Manikandan Resume' className='border-2 border-glow transform text-xl rounded-3xl px-2 py-1 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{ borderColor: '#FF4900' }}>Download Resume</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Navbar2 = () => {
  return (
    <div>
      <div className='hidden md:block'>
        {/* Show Desktop Navbar2 for screens larger than or equal to medium (md) */}
        <DesktopNavbar2 />
      </div>

      {/* Show Mobile Navbar2 for screens smaller than medium (md) */}
      <div className='md:hidden block'>
        <MobileNavbar2 />
      </div>
    </div>
  );
};

export default Navbar2;
