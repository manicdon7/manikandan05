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

const UploadTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        rating: 5
    });
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch('https://manikandan05-backend.vercel.app/api/testimonials');
            if (response.ok) {
                const data = await response.json();
                setTestimonials(data);
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            toast.error('Failed to fetch testimonials');
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
            const storageRef = ref(storage, `Testimonials/${Date.now()}_${image.name}`);
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

            if (!formData.title || !formData.description || !finalImageUrl) {
                throw new Error('All fields including image are required');
            }

            const payload = {
                ...formData,
                imageUrl: finalImageUrl,
                rating: parseInt(formData.rating)
            };

            const url = editingId 
                ? `https://manikandan05-backend.vercel.app/api/testimonials/${editingId}`
                : 'https://manikandan05-backend.vercel.app/api/testimonials';
            
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                toast.success(editingId ? 'Testimonial updated successfully!' : 'Testimonial added successfully!');
                setFormData({ title: '', description: '', rating: 5 });
                setImage(null);
                setImageUrl('');
                setEditingId(null);
                fetchTestimonials();
            } else {
                throw new Error('Failed to save testimonial');
            }
        } catch (error) {
            console.error('Error saving testimonial:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (testimonial) => {
        setFormData({
            title: testimonial.title,
            description: testimonial.description,
            rating: testimonial.rating || 5
        });
        setImageUrl(testimonial.imageUrl);
        setEditingId(testimonial._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const response = await fetch(`https://manikandan05-backend.vercel.app/api/testimonials/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    toast.success('Testimonial deleted successfully!');
                    fetchTestimonials();
                } else {
                    throw new Error('Failed to delete testimonial');
                }
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                toast.error('Failed to delete testimonial');
            }
        }
    };

    const cancelEdit = () => {
        setFormData({ title: '', description: '', rating: 5 });
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
                            Testimonials Management
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Manage client testimonials and reviews to build trust and credibility
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mt-6"></div>
                    </div>

                    {/* Form */}
                    <div className="glass-card p-8 mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                        </h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-medium mb-2">Client Name & Position *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                                        placeholder="John Smith - CEO, TechCorp"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-white font-medium mb-2">Rating *</label>
                                    <select
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
                                    >
                                        <option value={5}>5 Stars</option>
                                        <option value={4}>4 Stars</option>
                                        <option value={3}>3 Stars</option>
                                        <option value={2}>2 Stars</option>
                                        <option value={1}>1 Star</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Testimonial Text *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 resize-none"
                                    placeholder="Write the client's testimonial here..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-white font-medium mb-2">Client Photo *</label>
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
                                        <img src={imageUrl} alt="Preview" className="w-20 h-20 rounded-full object-cover border-2 border-orange-500/30" />
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
                                        <span className="shine-text">{editingId ? 'Update Testimonial' : 'Add Testimonial'}</span>
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

                    {/* Testimonials List */}
                    <div className="glass-card p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Existing Testimonials</h2>
                        
                        {testimonials.length === 0 ? (
                            <p className="text-gray-400 text-center py-8">No testimonials found.</p>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-6">
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial._id} className="bg-white/5 border border-gray-600 rounded-lg p-6 hover:bg-white/8 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-4">
                                                <img 
                                                    src={testimonial.imageUrl} 
                                                    alt={testimonial.title}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/30"
                                                />
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{testimonial.title}</h3>
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(testimonial)}
                                                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors duration-300 text-sm"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(testimonial._id)}
                                                    className="px-3 py-1 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors duration-300 text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-300 italic">"{testimonial.description}"</p>
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

export default UploadTestimonials;
