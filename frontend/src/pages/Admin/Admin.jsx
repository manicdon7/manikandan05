import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication status from local storage
    localStorage.removeItem('authenticated');
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h2 className="text-3xl font-bold text-black">Dashboard</h2>
          <button 
            className="bg-white hover:bg-gray-200 text-orange-600 font-semibold px-4 py-2 rounded-lg shadow-md transition-colors duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8 mt-8">
        <Link 
          to="/admin/uploadproject" 
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Upload Project</h3>
            <p className="text-gray-600 mt-2 text-center">Add new projects to showcase in your portfolio.</p>
          </div>
        </Link>
        
        <Link 
          to="/admin/uploadcertificate" 
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Upload Certificate</h3>
            <p className="text-gray-600 mt-2 text-center">Manage your certificates and add new ones.</p>
          </div>
        </Link>
        
        <Link 
          to="/admin/uploadtestimonials" 
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Upload Testimonials</h3>
            <p className="text-gray-600 mt-2 text-center">Add and manage testimonials from your clients.</p>
          </div>
        </Link>
        
        <Link 
          to="/admin/uploadtimeline" 
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Manage Timeline</h3>
            <p className="text-gray-600 mt-2 text-center">Add and edit your career timeline entries.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
