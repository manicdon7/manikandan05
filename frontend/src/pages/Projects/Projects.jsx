import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import linkicon from '../../assets/Link.png';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        fetch('https://manikandan05-backend.vercel.app/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));

        // Detect mobile view
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768); // Adjust breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const renderDescription = (description) => {
        if (isMobileView && description.length > 100) {
            return (
                <p className='text-lg md:text-xl text-left text-gray-400'>
                    {description.slice(0, 100)}
                    <span>...</span>
                    <button className='text-blue-400 ml-1 underline' onClick={() => alert(description)}>Show more</button>
                </p>
            );
        } else {
            return (
                <p className='text-lg md:text-xl text-gray-400'>{description}</p>
            );
        }
    };

    const items = projects.map(project => (
        <div key={project._id} className='carousel-item p-8 mx-4 h-auto'>
            <div className='flex flex-col lg:flex-row items-center gap-8 h-full'>
                <div className='flex-shrink-0 w-full lg:w-1/2'>
                    <div className='relative group overflow-hidden rounded-2xl'>
                        <img 
                            src={project.imageUrl} 
                            className='w-full h-64 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110' 
                            alt='project' 
                        />
                        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <div className='absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100'>
                            <div className='flex gap-3'>
                                <a 
                                    href={project.githubLink} 
                                    className='flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-white/30 transition-all duration-300'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    Code
                                </a>
                                <a 
                                    href={project.deployment}
                                    className='flex items-center gap-2 bg-orange-500/80 backdrop-blur-sm px-4 py-2 rounded-full text-white hover:bg-orange-500 transition-all duration-300'
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                    Live
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='flex flex-col w-full lg:w-1/2 text-center lg:text-left space-y-6'>
                    <div>
                        <h3 className='text-2xl lg:text-3xl text-white font-bold mb-3'>{project.title}</h3>
                        <div className='w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto lg:mx-0 rounded-full'></div>
                    </div>
                    
                    <div>
                        {renderDescription(project.description)}
                    </div>
                    
                    {/* Tech Stack */}
                    {project.techStack && (
                        <div className='flex flex-wrap gap-2 justify-center lg:justify-start'>
                            {project.techStack.map((tech, index) => (
                                <span 
                                    key={index}
                                    className='px-3 py-1 bg-orange-500/10 text-orange-300 rounded-full text-sm border border-orange-500/20'
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <div className='flex gap-4 justify-center lg:justify-start pt-4'>
                        <a 
                            href={project.githubLink} 
                            className='btn-primary px-6 py-3 text-center'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Code
                        </a>
                        <a 
                            href={project.deployment}
                            className='border-glow text-white px-6 py-3 rounded-full hover:bg-orange-500/10 transition-all duration-300'
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div id='projects' className='py-20 bg-gradient-to-br from-gray-900 to-black'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-16'>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" data-aos="fade-up">
                        Featured Projects
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                        A showcase of my recent work and the technologies I've mastered
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mt-6" data-aos="fade-up" data-aos-delay="400"></div>
                </div>
                
                <div className="carousel-container" data-aos="fade-up" data-aos-delay="600">
                    <AliceCarousel
                        mouseTracking
                        items={items}
                        infinite
                        autoPlay
                        autoPlayInterval={5000}
                        responsive={{
                            0: { items: 1 },
                            768: { items: 1 },
                            1024: { items: 1 }
                        }}
                        disableDotsControls={false}
                        disableButtonsControls={false}
                        controlsStrategy="alternate"
                        renderPrevButton={() => (
                            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-orange-500/20 hover:bg-orange-500/40 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-orange-500/30">
                                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                </svg>
                            </button>
                        )}
                        renderNextButton={() => (
                            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-orange-500/20 hover:bg-orange-500/40 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-orange-500/30">
                                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Projects;
