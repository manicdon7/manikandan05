import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FaUpload, FaGithub, FaExternalLinkAlt, FaEdit } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALER6J04enZVziVENWW1bOn7lhJs3uiII",
  authDomain: "portfolio-cc0d2.firebaseapp.com",
  projectId: "portfolio-cc0d2",
  storageBucket: "portfolio-cc0d2.appspot.com",
  messagingSenderId: "850678827478",
  appId: "1:850678827478:web:aa80f06fc68c9610433c77",
  measurementId: "G-SX374W09KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadProject = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [deployment, setDeployment] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    try {
      setError('');
      if (!image || !title || !description || !githubLink) {
        throw new Error("All fields are required");
      }

      setUploading(true);

      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      const response = await fetch('https://manikandan05-backend.vercel.app/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          githubLink,
          imageUrl,
          deployment
        })
      });

      if (!response.ok) {
        throw new Error('Failed to upload data to server');
      }

      toast.success("Project uploaded successfully.");
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      toast.error(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
        <FaUpload className="mr-2 text-blue-500" />
        Upload Project
      </h2>
      <div className="space-y-4">
        <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-gray-700">
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-transparent text-white file:bg-blue-600 file:hover:bg-blue-700 file:focus:outline-none file:rounded-md file:py-2 file:px-4 file:text-white"
          />
        </div>
        <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-gray-700">
          <FaEdit className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 w-full focus:outline-none"
          />
        </div>
        <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-gray-700">
          <FaEdit className="text-gray-400 mr-3" />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 w-full focus:outline-none resize-none"
            rows="4"
          />
        </div>
        <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-gray-700">
          <FaGithub className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="GitHub Link"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 w-full focus:outline-none"
          />
        </div>
        <div className="flex items-center border border-gray-600 rounded-lg p-2 bg-gray-700">
          <FaExternalLinkAlt className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Deployment Link (Optional)"
            value={deployment}
            onChange={(e) => setDeployment(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 w-full focus:outline-none"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg mt-4 ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="colored"
      />
    </div>
  );
};

export default UploadProject;
