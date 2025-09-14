import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-no-background.png';

const Navbar2 = () => {
  return (
    <nav className='flex justify-between items-center top-0 z-50 fixed w-full backdrop-filter backdrop-blur-xl bg-black/20 border-b border-white/10 shadow-2xl'>
      <div className='p-4'>
        <Link to="/admin">
          <img src={logo} alt='logo' className='h-12 hover:scale-105 transition-transform duration-300' onContextMenu={(e) => e.preventDefault()} />
        </Link>
      </div>
      
      <div className='flex gap-6 px-8 py-5 text-lg text-white'>
        <Link 
          to="/admin" 
          className='hover:text-orange-400 transition-colors duration-300 relative group'
        >
          Dashboard
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </Link>
        <Link 
          to="/admin/uploadproject" 
          className='hover:text-orange-400 transition-colors duration-300 relative group'
        >
          Projects
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </Link>
        <Link 
          to="/admin/uploadcertificate" 
          className='hover:text-orange-400 transition-colors duration-300 relative group'
        >
          Certificates
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </Link>
        <Link 
          to="/admin/uploadtestimonials" 
          className='hover:text-orange-400 transition-colors duration-300 relative group'
        >
          Testimonials
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </Link>
        <Link 
          to="/admin/uploadtimeline" 
          className='hover:text-orange-400 transition-colors duration-300 relative group'
        >
          Timeline
          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
        </Link>
      </div>

      <div className='py-5 px-8 text-white'>
        <Link 
          to="/" 
          className='btn-primary px-6 py-3'
        >
          <span className="shine-text">View Portfolio</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar2;