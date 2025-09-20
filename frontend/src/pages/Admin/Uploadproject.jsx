import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar2 from '../../components/Navbar2';

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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const UploadProject = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    githubLink: '',
    deployment: '',
    techStack: ''
  });
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('https://manikandan05-backend.vercel.app/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const uploadImage = async () => {
    if (!image) return null;
    
    setUploading(true);
    try {
      const storageRef = ref(storage, `projects/${Date.now()}_${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setUploading(false);
      return url;
    } catch (error) {
      setUploading(false);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = imageUrl;
      
      if (image) {
        finalImageUrl = await uploadImage();
      }

      if (!formData.title || !formData.description || !formData.githubLink || !finalImageUrl) {
        throw new Error('Title, description, GitHub link, and image are required');
      }

      const techStackArray = formData.techStack.split(',').map(tech => tech.trim()).filter(tech => tech);
      
      const payload = {
        ...formData,
        imageUrl: finalImageUrl,
        techStack: techStackArray
      };

      const url = editingId 
        ? `https://manikandan05-backend.vercel.app/api/projects/${editingId}`
        : 'https://manikandan05-backend.vercel.app/api/projects';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingId ? 'Project updated successfully!' : 'Project added successfully!');
        setFormData({
          title: '',
          description: '',
          githubLink: '',
          deployment: '',
          techStack: ''
        });
        setImage(null);
        setImageUrl('');
        setEditingId(null);
        fetchProjects();
      } else {
        throw new Error('Failed to save project');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      githubLink: project.githubLink,
      deployment: project.deployment || '',
      techStack: project.techStack ? project.techStack.join(', ') : ''
    });
    setImageUrl(project.imageUrl);
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`https://manikandan05-backend.vercel.app/api/projects/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Project deleted successfully!');
          fetchProjects();
        } else {
          throw new Error('Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  const cancelEdit = () => {
    setFormData({
      title: '',
      description: '',
      githubLink: '',
      deployment: '',
      techStack: ''
    });
    setImage(null);
    setImageUrl('');
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <Navbar2 />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Projects Management
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcase your latest projects with detailed descriptions and tech stacks
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Form */}
          <div className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Project' : 'Add New Project'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="E-commerce Website"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">GitHub Repository *</label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Live Demo URL</label>
                <input
                  type="url"
                  name="deployment"
                  value={formData.deployment}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  placeholder="https://your-project.vercel.app"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Project Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                  placeholder="Describe your project, its features, and what problems it solves..."
                ></textarea>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Tech Stack (comma-separated)</label>
                <input
                  type="text"
                  name="techStack"
                  value={formData.techStack}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                  placeholder="React, Node.js, MongoDB, Tailwind CSS"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Project Screenshot *</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="flex-1 px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white file:cursor-pointer hover:file:bg-orange-600 transition-all duration-300"
                  />
                  {uploading && (
                    <div className="text-orange-400">
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {imageUrl && (
                  <div className="mt-4">
                    <img src={imageUrl} alt="Preview" className="w-48 h-32 rounded-lg object-cover border-2 border-orange-500/30" />
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className={`btn-primary px-8 py-3 ${(loading || uploading) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {editingId ? 'Updating...' : 'Adding...'}
                    </span>
                  ) : (
                    <span className="shine-text">{editingId ? 'Update Project' : 'Add Project'}</span>
                  )}
                </button>
                
                {editingId && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="border-glow text-white px-8 py-3 rounded-full hover:bg-gray-500/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Projects List */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Existing Projects</h2>
            
            {projects.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No projects found.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project._id} className="bg-white/5 border border-gray-600 rounded-lg overflow-hidden hover:bg-white/8 transition-all duration-300">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>
                      
                      {project.techStack && project.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.techStack.slice(0, 3).map((tech, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-orange-500/10 text-orange-300 rounded text-xs border border-orange-500/20"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 3 && (
                            <span className="px-2 py-1 bg-gray-500/10 text-gray-400 rounded text-xs">
                              +{project.techStack.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-2 mb-4">
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors duration-300 text-sm text-center"
                        >
                          GitHub
                        </a>
                        {project.deployment && (
                          <a 
                            href={project.deployment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-2 bg-green-500/20 text-green-300 rounded-lg hover:bg-green-500/30 transition-colors duration-300 text-sm text-center"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="flex-1 px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors duration-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="dark"
        toastStyle={{
          backgroundColor: '#1a1a1a',
          color: '#ffffff',
          border: '1px solid #FF4900'
        }}
      />
    </div>
  );
};

export default UploadProject;