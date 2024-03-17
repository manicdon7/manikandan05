import React, { useState, useEffect } from 'react';
import NavBar from '../../components/Navbar';
import { Collection } from 'mongoose';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container mx-auto">
      <div className='h-full' style={{ backgroundColor: '#242424' }}>
      <NavBar />
      <h2 className="text-3xl font-bold text-center my-8 text-white" style={{color:"#FF4900"}}>Certificates</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 mx-10 lg:grid-cols-3 gap-6">
          {certificates.map((certificate) => (
            <div key={certificate._id} className="bg-white rounded-lg border-4 border-glow shadow-md overflow-hidden">
              <img src={certificate.imageUrl} alt="Certificate" className="w-full rounded-lg h-48 object-cover object-center" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{certificate.title}</h3>
                <p className="text-gray-700 mb-4">{certificate.description}</p>
                <a href={certificate.imageUrl} target="_blank" rel="noopener noreferrer" className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                  View Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Certificates;
