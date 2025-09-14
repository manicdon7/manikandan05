import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        
        // Fetch testimonials data from the backend API
        const fetchTestimonials = async () => {
            try {
                const response = await fetch('https://manikandan05-backend.vercel.app/api/testimonials');
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                // Fallback testimonials for demo
                setTestimonials([
                    {
                        title: "John Smith - CEO, TechCorp",
                        description: "Manikandan delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise made our project a huge success.",
                        imageUrl: "/api/placeholder/64/64",
                        rating: 5
                    },
                    {
                        title: "Sarah Johnson - Product Manager",
                        description: "Working with Manikandan was a pleasure. He understood our requirements perfectly and delivered a scalable solution on time and within budget.",
                        imageUrl: "/api/placeholder/64/64",
                        rating: 5
                    }
                ]);
            }
        };

        fetchTestimonials();
    }, []);

    const StarRating = ({ rating }) => {
        return (
            <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
        );
    };

    return (
        <div className='py-20 bg-gradient-to-br from-gray-900 to-black'>
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" data-aos="fade-up">
                        Client Testimonials
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        What my clients say about working with me
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mt-6" data-aos="fade-up" data-aos-delay="400"></div>
                </div>

                {/* Testimonials Grid */}
                <div className='grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto'>
                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className='glass-card p-8 text-center relative overflow-hidden group'
                            data-aos="fade-up"
                            data-aos-delay={index * 200}
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-6 left-6 text-orange-500/20 group-hover:text-orange-500/30 transition-colors duration-300">
                                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                                </svg>
                            </div>

                            {/* Rating */}
                            <StarRating rating={testimonial.rating || 5} />

                            {/* Testimonial Text */}
                            <p className='text-lg text-gray-300 leading-relaxed mb-8 italic'>
                                "{testimonial.description}"
                            </p>

                            {/* Client Info */}
                            <div className='flex items-center justify-center space-x-4'>
                                <div className="relative">
                                    <img 
                                        src={testimonial.imageUrl || '/api/placeholder/64/64'} 
                                        alt="client" 
                                        className='w-16 h-16 rounded-full border-2 border-orange-500/30 object-cover'
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzIiIGZpbGw9IiNGRjQ5MDAiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxNiIgeT0iMTYiPgo8cGF0aCBkPSJNMTIgMTJDMTQuMjA5MSAxMiAxNiA5LjIwOTE0IDE2IDdDMTYgNC43OTA4NiAxNC4yMDkxIDMgMTIgM0M5Ljc5MDg2IDMgOCA0Ljc5MDg2IDggN0M4IDkuMjA5MTQgOS43OTA4NiAxMiAxMiAxMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xMiAxNEM5LjMzIDEzLjk5IDcgMTYuMzYgNyAxOVYyMUgxN1YxOUMxNyAxNi4zNiAxNC42NyAxMy45OSAxMiAxNFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                                        }}
                                    />
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="text-left">
                                    <h3 className='text-lg font-bold text-white group-hover:text-orange-300 transition-colors duration-300'>
                                        {testimonial.title}
                                    </h3>
                                    <div className="flex items-center mt-1">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                                        <span className="text-sm text-gray-400">Verified Client</span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-500/5 to-transparent rounded-full transform translate-x-16 translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
                    <div className="glass-card p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Ready to Join My Happy Clients?
                        </h3>
                        <p className="text-gray-300 mb-6">
                            Let's discuss your project and create something amazing together.
                        </p>
                        <a href="#contact" className="btn-primary">
                            <span className="shine-text">Start Your Project</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
