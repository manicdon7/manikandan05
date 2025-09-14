import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import arrow from '../../assets/arrow.png';

const About = () => {
    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    const stats = [
        { number: "50+", label: "Projects Completed" },
        { number: "3+", label: "Years Experience" },
        { number: "100%", label: "Client Satisfaction" },
        { number: "24/7", label: "Support Available" }
    ];

    return (
        <div className="py-20 bg-gradient-to-br from-black to-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" data-aos="fade-up">
                        About Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full" data-aos="fade-up" data-aos-delay="200"></div>
                </div>

                <div className='grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto'>
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div data-aos="fade-right">
                            <h3 className='text-3xl md:text-4xl font-bold text-white mb-6 leading-tight'>
                                Building bridges between 
                                <span className="gradient-text"> front-end and back-end</span>, 
                                turning ideas into immersive digital experiences.
                            </h3>
                        </div>
                        
                        <div data-aos="fade-right" data-aos-delay="200">
                            <p className='text-lg md:text-xl text-gray-300 leading-relaxed mb-8'>
                                My passion for coding drives me to continuously learn and adapt to new technologies 
                                and industry best practices. I thrive in fast-paced environments where I can collaborate 
                                with cross-functional teams to create innovative solutions to complex problems.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6" data-aos="fade-right" data-aos-delay="400">
                            {stats.map((stat, index) => (
                                <div key={index} className="glass-card p-6 text-center">
                                    <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                                    <div className="text-gray-400 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-8">
                        <div className="glass-card p-8" data-aos="fade-left">
                            <h3 className='text-2xl md:text-3xl font-bold text-white mb-6'>
                                Let's Discuss Your Project
                            </h3>
                            
                            <p className='text-lg text-gray-300 mb-8'>
                                Ready to bring your ideas to life? I'm here to help you create 
                                something extraordinary. Let's have a conversation about your project.
                            </p>
                            
                            <div className='space-y-4'>
                                <div className='flex items-center space-x-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20 hover:bg-orange-500/20 transition-all duration-300 group'>
                                    <div className='w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center group-hover:bg-orange-500/30 transition-colors duration-300'>
                                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-gray-400 text-sm'>Email me at</p>
                                        <a href='mailto:manikandan05082003@gmail.com' className='text-orange-400 hover:text-orange-300 font-medium transition-colors duration-300'>
                                            manikandan05082003@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className='flex items-center space-x-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all duration-300 group'>
                                    <div className='w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300'>
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className='text-white hover:text-orange-600 text-sm'>Available for</p>
                                        <p className='text-white hover:text-orange-600 font-medium'>Freelance Projects</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
