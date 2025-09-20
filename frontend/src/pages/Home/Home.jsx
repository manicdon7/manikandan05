import React, { useState, useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import '../../../src/App.css'
import Navbar from '../../components/Navbar';
import Timeline from '../../components/Timeline';
import Skills from '../../components/Skills';
import img from '../../assets/mani.jpg';
import spin from '../../assets/spin.png';
import Slider from '../../components/Slider';
import About from '../About/About';
import Down from '../../assets/Down.png';
import Projects from '../Projects/Projects';
import Service from '../Service/Service';
import Testimonials from '../Testimonials/Testimonials';
import Contact from '../Contact/Contact';
import Footer from '../../components/Footer';

const bg = {
  backgroundImage: `url(${spin})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "absolute",
  marginLeft: "10px",
  height: "600px",
  width: "900px",
  animation: "slideRight 5s linear infinite",
};

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <div className='min-h-screen overflow-x-hidden' style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)' }}>
      <Navbar isOpen={isDrawerOpen} toggleMenu={toggleDrawer} />

      {/* Hero Section */}
      <section className='min-h-screen flex items-center justify-center pt-20' id='Home'>
        <div className='container mx-auto px-4'>
          <div className='grid lg:grid-cols-2 gap-12 items-center'>
            {/* Profile Image */}
            <div className='flex justify-center order-2 lg:order-2'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-3xl opacity-20 animate-pulse'></div>
                <img
                  src={img}
                  onContextMenu={(e) => e.preventDefault()}
                  className='relative z-10 w-96 h-96 lg:w-[850px] lg:h-[850px] object-cover rounded-full border-4 border-orange-500 shadow-2xl float-animation'
                  alt='Manikandan'
                  data-aos="fade-right"
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className='text-center lg:text-left order-1 lg:order-2'>
              <div className='mb-6' data-aos="fade-left">
                <span className='text-orange-400 text-lg font-medium tracking-wider uppercase'>Welcome to my portfolio</span>
              </div>

              <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6' data-aos="fade-left" data-aos-delay="200">
                <span className="text-white">I'm </span>
                <span className="gradient-text">Manikandan</span>
              </h1>

              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-8"
                data-aos="fade-left"
                data-aos-delay="400"
              >
                Software Engineer
              </h2>

              <p
                className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed mx-auto lg:mx-0"
                data-aos="fade-left"
                data-aos-delay="600"
              >
                Passionate about creating exceptional web applications with modern technologies.
                Specializing in React, Node.js, and cloud solutions. Let's build something amazing together.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                data-aos="fade-left"
                data-aos-delay="800"
              >
                <a
                  href="#projects"
                  className="btn-primary text-center items-center px-8 text-lg font-semibold"
                >
                  <span className="shine-text">View My Work</span>
                </a>
                <a
                  href="#contact"
                  className="border-glow text-white px-8 py-4 text-lg font-semibold rounded-full text-center hover:bg-orange-500/10 transition-all duration-300"
                >
                  <span className="shine-text">Get In Touch</span>
                </a>
              </div>
            </div>
          </div>


          {/* Scroll Indicator */}
          <div className='flex justify-center mt-10' data-aos="fade-up" data-aos-delay="1000">
            <a href='#about' className='animate-bounce'>
              <div className='w-6 h-10 border-2 border-orange-500 rounded-full flex justify-center'>
                <div className='w-1 h-3 bg-orange-500 rounded-full mt-2 animate-pulse'></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Animated Slider */}
      <div className='py-10'>
        <Slider />
      </div>

      {/* About Section */}
      <section id='about'>
        <About />
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Timeline Section */}
      <Timeline />

      {/* Projects Section */}
      <section id='projects'>
        <Projects />
      </section>

      {/* Services Section */}
      <section id='service'>
        <Service />
      </section>

      {/* Testimonials Section */}
      <section className='testimonials'>
        <Testimonials />
      </section>

      {/* Contact Section */}
      <section id='contact'>
        <Contact />
      </section>

      <Footer />
    </div>
  );
}

export default Home;
