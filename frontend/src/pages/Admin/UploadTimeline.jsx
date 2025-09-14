import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar2 from '../../components/Navbar2';

const UploadTimeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [formData, setFormData] = useState({
    year: '',
    title: '',
    company: '',
    description: '',
    skills: '',
    type: 'work'
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTimelineData();
  }, []);

  const fetchTimelineData = async () => {
    try {
      const response = await fetch('https://manikandan05-backend.vercel.app/api/timeline');
      if (response.ok) {
        const data = await response.json();
        setTimelineData(data);
      }
    } catch (error) {
      console.error('Error fetching timeline data:', error);
      toast.error('Failed to fetch timeline data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
      const payload = {
        ...formData,
        skills: skillsArray
      };

      const url = editingId 
        ? `https://manikandan05-backend.vercel.app/api/timeline/${editingId}`
        : 'https://manikandan05-backend.vercel.app/api/timeline';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingId ? 'Timeline updated successfully!' : 'Timeline entry added successfully!');
        setFormData({
          year: '',
          title: '',
          company: '',
          description: '',
          skills: '',
          type: 'work'
        });
        setEditingId(null);
        fetchTimelineData();
      } else {
        throw new Error('Failed to save timeline entry');
      }
    } catch (error) {
      console.error('Error saving timeline entry:', error);
      toast.error('Failed to save timeline entry');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      year: item.year,
      title: item.title,
      company: item.company,
      description: item.description,
      skills: item.skills.join(', '),
      type: item.type
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this timeline entry?')) {
      try {
        const response = await fetch(`https://manikandan05-backend.vercel.app/api/timeline/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast.success('Timeline entry deleted successfully!');
          fetchTimelineData();
        } else {
          throw new Error('Failed to delete timeline entry');
        }
      } catch (error) {
        console.error('Error deleting timeline entry:', error);
        toast.error('Failed to delete timeline entry');
      }
    }
  };

  const cancelEdit = () => {
    setFormData({
      year: '',
      title: '',
      company: '',
      description: '',
      skills: '',
      type: 'work'
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <Navbar2 />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 gradient-text">
            Manage Timeline
          </h1>

          {/* Form */}
          <div className="glass-card p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId ? 'Edit Timeline Entry' : 'Add New Timeline Entry'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Year *</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    placeholder="2024"
                  />
                </div>
                
                <div>
                  <label className="block text-white font-medium mb-2">Type *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  >
                    <option value="work">Work</option>
                    <option value="education">Education</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Senior Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Tech Company Inc."
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
                  placeholder="Describe your role and achievements..."
                ></textarea>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Skills (comma-separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="React, Node.js, MongoDB, AWS"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-primary px-8 py-3 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                    <span className="shine-text">{editingId ? 'Update Entry' : 'Add Entry'}</span>
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

          {/* Timeline Entries List */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Timeline Entries</h2>
            
            {timelineData.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No timeline entries found.</p>
            ) : (
              <div className="space-y-4">
                {timelineData.map((item) => (
                  <div key={item._id} className="bg-white/5 border border-gray-600 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-xl font-bold text-orange-500">{item.year}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.type === 'work' 
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                              : 'bg-green-500/20 text-green-300 border border-green-500/30'
                          }`}>
                            {item.type === 'work' ? 'Work' : 'Education'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                        <p className="text-orange-400 font-medium">{item.company}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors duration-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{item.description}</p>
                    
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-orange-500/10 text-orange-300 rounded-full text-sm border border-orange-500/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
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

export default UploadTimeline;