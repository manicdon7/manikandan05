import React, { useState, useEffect } from 'react';
import projectimage from '../../assets/project.png';
import linkicon from '../../assets/Link.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

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
                <>
                    <p className='font-normal md:text-2xl py-1 mx-3 text-left text-gray-500 text-lg'>
                        {description.slice(0, 100)}
                        <span>...</span>
                        <button className='text-blue-500 ml-1' onClick={() => alert(description)}>Show more</button>
                    </p>
                </>
            );
        } else {
            return (
                <p className='font-normal md:text-2xl py-1 mx-3 text-left text-gray-500 text-lg'>{description}</p>
            );
        }
    };

    return (    
        <div id='#projects'>
            <div>
                <p className="font-medium md:text-3xl text-3xl md:mx-40 mx-5 py-10 text-with-glow" style={{ color: '#FFFFFF' }} data-aos="fade-right">Latest projects _____</p>
            </div>
            <Carousel autoPlay emulateTouch swipeable infiniteLoop interval={5000} showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} centerMode={false} centerSlidePercentage={50}>
                {projects.map(project => (
                    <div key={project._id} className='grid md:grid-cols-2 grid-cols-1 md:mx-40 my-10 mx-5 md:mx-5 border rounded-2xl py-3 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' data-aos="fade-up"  style={{backgroundColor:'#3D3D3D'}}>
                        <div className='mx-5'>
                            <img src={project.imageUrl} className='md:h-96 md:w-60 h-60 w-40 rounded-2xl' alt='project' />
                        </div>
                        <div>
                            <div className='py-4' style={{ backgroundClip: '#2B2B2B', color: '#303030' }}>
                                <a href={project.githubLink} className='p-3 rounded-3xl' style={{backgroundColor:"#2B2B2B", color:'#FF4900'}}>View Work</a>
                            </div>
                            <div>
                                <h1 className='md:text-3xl text-xl text-white py-3'>{project.title}</h1>
                            </div>
                            <div>
                                {renderDescription(project.description)}
                            </div>
                            <div className='md:h-20 md:w-14 h-20 w-16 bottom-0'>
                                <a href={project.deployment} className='md:px-28 px-10 py-5 md:px-0 md:py-0'>
                                    <img src={linkicon} className='animate-pulse' alt="link" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Projects;
