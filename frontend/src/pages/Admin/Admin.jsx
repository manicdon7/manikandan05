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
      <div className="container mx-auto p-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 mt-8">
        <Link 
          to="/admin/uploadproject" 
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Upload Project</h3>
            <p className="text-gray-600 mt-2">Add new projects to showcase in your portfolio.</p>
          </div>
        </Link>
        <Link 
          to="/admin/uploadcertificate" 
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3l2 1"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Upload Certificate</h3>
            <p className="text-gray-600 mt-2">Manage your certificates and add new ones.</p>
          </div>
        </Link>
        <Link 
          to="/admin/uploadtestimonials" 
          className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
        >
          <div className="p-6 flex flex-col items-center">
            <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-3-3v6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Upload Testimonials</h3>
            <p className="text-gray-600 mt-2">Add and manage testimonials from your clients.</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
