import React, { useState, useEffect } from 'react';
import Navbar2 from '../../components/Navbar2';

const Certificates = () => {
  const currentYear = new Date().getFullYear();
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
    <div className="container mx-auto pt-10" style={{ backgroundColor: '#242424' }}>
      <div className='h-full min-h-screen'>
        <Navbar2 />
        <h2 className="text-3xl font-bold text-center my-12 text-white" style={{ color: "#FF4900" }}>Certificates</h2>
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {certificates.map((certificate) => (
              <div key={certificate._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className='p-4 rounded-full'>
                <img src={certificate.imageUrl} alt="Certificate" className="w-full h-48 object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white mb-2">{certificate.title}</h3>
                  <p className="text-gray-400">
                    {showMore[certificate._id] ? certificate.description : `${certificate.description.substring(0, 100)}...`}
                    <button
                      onClick={() => toggleShowMore(certificate._id)}
                      className="text-blue-500 ml-2"
                    >
                      {showMore[certificate._id] ? 'Show less' : 'Show more'}
                    </button>
                  </p>
                  <a href={certificate.imageUrl} target="_blank" rel="noopener noreferrer" className="block text-center mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                    View Certificate
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='py-4 text-center text-gray-400' style={{ backgroundColor: '#242424' }}>
                &copy; {currentYear} Manikandan. All rights reserved.
            </div>
    </div>
  );
};

export default Certificates;
