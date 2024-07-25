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
        <div key={project._id} className='flex flex-col md:flex-row items-center gap-6 h-auto w-full md:w-[90%] p-7 border rounded-3xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 mx-auto'>
            <div className='flex-shrink-0 w-full md:w-1/2'>
                <img src={project.imageUrl} className='w-full h-48 md:h-80 rounded-lg shadow-xl object-cover' alt='project' />
            </div>
            <div className='flex flex-col md:w-1/2 text-center md:text-left'>
                <div className='mb-4'>
                    <a href={project.githubLink} className='border-2 text-xl text-white rounded-3xl px-5 py-2 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105 border-glow' style={{ borderColor: '#FF4900' }}>View Work</a>
                </div>
                <div className='mb-4'>
                    <h1 className='text-xl md:text-2xl text-white font-bold'>{project.title}</h1>
                </div>
                <div className='mb-4'>
                    {renderDescription(project.description)}
                </div>
                <div className='flex justify-center md:justify-start'>
                    <a href={project.deployment}>
                        <img src={linkicon} className='w-14 h-14 animate-pulse' alt="link" />
                    </a>
                </div>
            </div>
        </div>
    ));

    return (
        <div id='projects' className='py-10'>
            <div className='text-center mb-8'>
                <p className="font-semibold text-3xl md:text-4xl text-white" style={{ textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }} data-aos="fade-right">Latest Projects</p>
            </div>
            <AliceCarousel
                mouseTracking
                item={items}
                infinite
                autoPlay
                autoPlayInterval={3000}
                responsive={{
                    0: { item: 1, slidesToScroll: 1 },
                    768: { item: 1, slidesToScroll: 1 },
                    1024: { item: 1, slidesToScroll: 1 }
                }}
                disableDotsControls
                disableButtonsControls
                paddingLeft={20}
                paddingRight={20}
                controlsStrategy="alternate" // Add this to control the carousel properly
                items={items.map((item, index) => (
                    <div key={index} className='md:px-20 px-10'>{item}</div> // Add padding to create gaps
                ))}
            />
        </div>
    );
};

export default Projects;
