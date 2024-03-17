import React, { useState } from 'react';

const DesktopNavbar = () => {
  return (
    <nav className='flex justify-between' style={{ backgroundColor: '#242424' }}>
      <div className='md:flex md:gap-10 md:px-20 md:py-5 text-2xl text-white'>
        <a href='/' className=''>Home</a>
        <a href='#service'>Service</a>
        <a href='#projects'>Projects</a>
        <a href='#contact'>Contact</a>
        <a href='/certificates'>Certificate</a>
      </div>
      <div className='py-5 px-20 text-white'>
        <a href='src/assets/ManikandanResume.pdf' download='Manikandan Resume' className='border-2 border-glow transform text-xl rounded-3xl px-3 py-2 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{ borderColor: '#FF4900' }}>Download Resume</a>
      </div>
    </nav>
  );
};

const MobileNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className='flex justify-between overflow-x-hidden' style={{ backgroundColor: '#242424' }}>
      <div className='px-4 py-2 text-2xl text-white'>
        Mani Kandan
      </div>
      <button className="md:hidden block mx-3" style={{scrollBehavior:'smooth'}} onClick={toggleDrawer}>
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
      {isDrawerOpen && (
        <div className="md:hidden absolute inset-y-0 left-0 bg-gray-900 w-3/4">
          <div className="flex flex-col mt-10">
            <a href='/' className='text-white py-2 px-4'>Home</a>
            <a href='#about' className='text-white py-2 px-4'>About</a>
            <a href='#service' className='text-white py-2 px-4'>Service</a>
            <a href='#projects' className='text-white py-2 px-4'>Projects</a>
            <a href='#contact' className='text-white py-2 px-4'>Contact</a>
            <a href='/certificates' className='text-white py-2 px-4'>Certificate</a>
          </div>
          <div className='py-2 px-2 text-white'>
        <a href='src/assets/ManikandanResume.pdf' download='Manikandan Resume' className='border-2 border-glow transform text-xl rounded-3xl px-2 py-1 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' style={{ borderColor: '#FF4900' }}>Download Resume</a>
      </div>
        </div>
      )}
    </nav>
  );
};

const Navbar = () => {
  return (
    <div>
      <div className='hidden md:block'>
        {/* Show Desktop Navbar for screens larger than or equal to medium (md) */}
        <DesktopNavbar />
      </div>
      
      {/* Show Mobile Navbar for screens smaller than medium (md) */}
      <div className='md:hidden block' style={{scrollBehavior:'smooth'}}>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
