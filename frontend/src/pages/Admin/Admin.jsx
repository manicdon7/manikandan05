import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar2 from '../../components/Navbar2';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    navigate('/');
  };

  const adminCards = [
    {
      title: "Manage Projects",
      description: "Add, edit, and showcase your latest projects with tech stacks",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      ),
      link: "/admin/uploadproject",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Manage Certificates",
      description: "Upload and organize your professional certifications",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
        </svg>
      ),
      link: "/admin/uploadcertificate",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Manage Testimonials",
      description: "Add client testimonials and reviews to build trust",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
      ),
      link: "/admin/uploadtestimonials",
      gradient: "from-red-500 to-red-600"
    },
    {
      title: "Manage Timeline",
      description: "Update your career journey and professional milestones",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      link: "/admin/uploadtimeline",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Navbar2 />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Manage your portfolio content with ease. Update projects, certificates, testimonials, and timeline entries.
            </p>
            <button 
              onClick={handleLogout}
              className="border-glow text-white px-8 py-3 rounded-full hover:bg-red-500/10 transition-all duration-300"
            >
              <span className="shine-text">Logout</span>
            </button>
          </div>

          {/* Admin Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {adminCards.map((card, index) => (
              <Link 
                key={index}
                to={card.link} 
                className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {card.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-300 transition-colors duration-300">
                  {card.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {card.description}
                </p>
                
                <div className="mt-6">
                  <span className="text-orange-400 font-medium group-hover:text-orange-300 transition-colors duration-300">
                    Manage →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">∞</div>
              <div className="text-gray-400 text-sm">Projects</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">∞</div>
              <div className="text-gray-400 text-sm">Certificates</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">∞</div>
              <div className="text-gray-400 text-sm">Testimonials</div>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">∞</div>
              <div className="text-gray-400 text-sm">Timeline</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
