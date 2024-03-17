import React, { useState, useEffect } from 'react';
import projectimage from '../../assets/project.png';
import linkicon from '../../assets/Link.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch('https://manikandan05-backend.vercel.app/api/projects')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    return (
        <div id='#projects'>
            <div>
                <p className="font-medium md:text-3xl text-3xl md:mx-40 mx-5 py-10 text-with-glow" style={{ color: '#FFFFFF' }} data-aos="fade-right">Latest projects _____</p>
            </div>
            <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} ariaLabel='Sting' emulateTouch={true}>
                {projects.map(project => (
                    <div key={project._id} className='grid md:grid-cols-2 md:mx-40 my-20 mx-3 md:mx-5 border rounded-2xl py-3 transform scale-100 transition-transform duration-300 ease-in-out hover:scale-105' data-aos="fade-up"  style={{backgroundColor:'#3D3D3D'}}>
                        <div className='mx-5'>
                            <img src={project.imageUrl} className='h-96 w-60 rounded-2xl' alt='project' />
                        </div>
                        <div>
                            <div className='py-4' style={{ backgroundClip: '#2B2B2B', color: '#303030' }}>
                                <a href={project.githubLink} className='p-3 rounded-3xl' style={{backgroundColor:"#2B2B2B", color:'#FF4900'}}>View Work</a>
                            </div>
                            <div>
                                <h1 className='md:text-3xl text-xl text-white py-5'>{project.title}</h1>
                            </div>
                            <div>
                                <p className='font-normal md:text-2xl py-3 mx-3 text-gray-500 text-xl'>{project.description}</p>
                            </div>
                            <div className='md:h-20 md:w-14 h-20 w-16 bottom-0'>
                                <a href={project.deployment} className='md:px-28 px-10 py-5 md:px-0 md:py-0'>
                                    <img src={linkicon} className='' alt="link" />
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
