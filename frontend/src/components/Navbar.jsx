import React, { useState, useEffect } from 'react';
import logo from '../assets/logo-no-background.png'

const DesktopNavbar = () => {
  return (
    <nav className='flex justify-between items-center top-0 z-50 fixed w-full backdrop-filter backdrop-blur-xl bg-black/20 border-b border-white/10 shadow-2xl'>
      <div className='p-4'>
        <img src={logo} alt='logo' className='h-12 hover:scale-105 transition-transform duration-300' onContextMenu={(e) => e.preventDefault()} />
      </div>
      <div className='flex gap-8 px-8 py-5 text-lg text-white'>
        <a href='/' className='hover:text-orange-400 transition-colors duration-300 relative group'>
          Home
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href='/#about' className='hover:text-orange-400 transition-colors duration-300 relative group'>
          About
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href='/#service' className='hover:text-orange-400 transition-colors duration-300 relative group'>
          Services
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href='/#projects' className='hover:text-orange-400 transition-colors duration-300 relative group'>
          Projects
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href='/#contact' className='hover:text-orange-400 transition-colors duration-300 relative group'>
          Contact
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </a>
        <a href='/certificates' className='hover:text-orange-400 transition-colors duration-300 relative group'>
          Certificates
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </a>
      </div>
      <div className='py-5 px-8 text-white'>
        <a
          href='https://drive.google.com/file/d/1IlntZkLTQgPt_diD7WpZWu3Fedq7YJM8/view?usp=sharing'
          download='Manikandan_Resume.pdf'
          className='btn-primary px-6 py-3'
        >
          Download Resume
        </a>
      </div>
    </nav>
  );
};

const MobileNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
  }, [isDrawerOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#service", label: "Services" },
    { href: "/#projects", label: "Projects" },
    { href: "/#contact", label: "Contact" },
    { href: "/certificates", label: "Certificates" },
  ];

  return (
    <nav className="flex justify-between items-center top-0 z-50 fixed w-full backdrop-filter backdrop-blur-xl bg-black/20 border-b border-white/10 p-4">
      <div className="text-white">
        <img
          src={logo}
          alt="logo"
          className="h-10"
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
      <button
        className="md:hidden block z-50 p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
        onClick={toggleDrawer}
      >
        {isDrawerOpen ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        )}
      </button>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transform transition-all duration-500 ease-in-out
        ${isDrawerOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-lg"
          onClick={toggleDrawer}
        ></div>

        {/* Drawer Content */}
        <div className="relative flex flex-col px-10 justify-center h-full min-h-screen bg-black space-y-10 shadow-2xl">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={toggleDrawer}
              className={`text-white text-2xl font-medium hover:text-orange-400 duration-300 relative group transform transition-all
              ${isDrawerOpen ? `translate-y-0 opacity-100 delay-[${index * 100}ms]` : "translate-y-10 opacity-0"}`}
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-500"></span>
            </a>
          ))}

          {/* Resume Button */}
          <div
            className={`pt-10 transform transition-all duration-500 ${
              isDrawerOpen ? "translate-y-0 opacity-100 delay-[600ms]" : "translate-y-10 opacity-0"
            }`}
          >
            <a
              href="https://drive.google.com/file/d/1IlntZkLTQgPt_diD7WpZWu3Fedq7YJM8/view?usp=sharing"
              download="Manikandan_Resume.pdf"
              className="btn-primary px-8 py-4 text-lg text-white shadow-lg hover:shadow-orange-500/30 transition-all duration-500"
              onClick={toggleDrawer}
            >
              <span className="shine-text">Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};



const Navbar = () => {
  return (
    <div>
      <div className='hidden md:block'>
        <DesktopNavbar />
      </div>
      <div className='md:hidden block'>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;
