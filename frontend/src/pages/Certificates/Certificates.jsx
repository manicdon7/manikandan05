import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('https://manikandan05-backend.vercel.app/api/certificates');
      if (!response.ok) {
        throw new Error('Failed to fetch certificates');
      }
      const data = await response.json();
      setCertificates(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const toggleShowMore = (id) => {
    setShowMore((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)' }}>
      <Navbar />
      <div className='container mx-auto pt-28 pb-12'>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text">Certificates</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {certificates.map((certificate) => (
              <div key={certificate._id} className="bg-white/5 backdrop-blur-sm border border-orange-500/20 rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out">
                <div className='overflow-hidden'>
                  <img src={certificate.imageUrl} alt={certificate.title} className="w-full h-56 object-cover transform hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{certificate.title}</h3>
                  <p className="text-gray-400 mb-4 h-24 overflow-hidden">
                    {showMore[certificate._id] ? certificate.description : `${certificate.description.substring(0, 100)}...`}
                  </p>
                  <button
                      onClick={() => toggleShowMore(certificate._id)}
                      className="text-orange-400 hover:text-orange-300 transition-colors duration-300 mb-4"
                    >
                      {showMore[certificate._id] ? 'Show less' : 'Show more'}
                    </button>
                  <a href={certificate.imageUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full text-center block">
                    View Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Certificates;
