import React, { useEffect } from 'react';
import CountUp from 'react-countup';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Service = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const services = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Frontend Development",
      description: "Creating responsive, interactive user interfaces with modern frameworks like React, Vue, and Angular.",
      technologies: ["React", "Vue.js", "TypeScript", "Tailwind CSS"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
        </svg>
      ),
      title: "Backend Development",
      description: "Building robust server-side applications, APIs, and microservices with scalable architecture.",
      technologies: ["Node.js", "Express", "Python", "PostgreSQL"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
        </svg>
      ),
      title: "Database Design",
      description: "Designing efficient database schemas and optimizing queries for maximum performance.",
      technologies: ["MongoDB", "PostgreSQL", "Redis", "Firebase"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
        </svg>
      ),
      title: "Cloud Deployment",
      description: "Deploying applications to cloud platforms with CI/CD pipelines and monitoring.",
      technologies: ["AWS", "Vercel", "Docker", "GitHub Actions"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
      ),
      title: "Mobile Development",
      description: "Creating cross-platform mobile applications with React Native and Progressive Web Apps.",
      technologies: ["React Native", "PWA", "Expo", "Flutter"]
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      title: "Quality Assurance",
      description: "Implementing comprehensive testing strategies and ensuring code quality standards.",
      technologies: ["Jest", "Cypress", "Testing Library", "Playwright"]
    }
  ];

  const stats = [
    { number: 50, suffix: "+", label: "Projects Completed" },
    { number: 100, suffix: "%", label: "Client Satisfaction" },
    { number: 3, suffix: "+", label: "Years Experience" },
    { number: 24, suffix: "/7", label: "Support Available" }
  ];

  return (
    <div className='py-20 bg-gradient-to-br from-black to-gray-900' id="service">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text" data-aos="fade-up">
            Services I Offer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Full-stack development solutions with modern technologies and best practices
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full mt-6" data-aos="fade-up" data-aos-delay="400"></div>
        </div>

        <div className='grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto'>
          {/* Left Content - Stats */}
          <div className="space-y-8">
            <div data-aos="fade-right">
              <h3 className='text-3xl md:text-4xl font-bold text-white mb-6'>
                Delivering Excellence in 
                <span className="gradient-text"> Every Project</span>
              </h3>
              <p className='text-lg text-gray-300 leading-relaxed mb-8'>
                As a full-stack developer, I offer comprehensive web development solutions, 
                combining cutting-edge frontend technologies with robust backend systems. 
                I specialize in creating scalable, maintainable applications that deliver 
                exceptional user experiences.
              </p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-2 gap-6' data-aos="fade-right" data-aos-delay="200">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6 text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    <CountUp end={stat.number} duration={2} enableScrollSpy={true} />
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="glass-card p-8" data-aos="fade-right" data-aos-delay="400">
              <h4 className="text-xl font-bold text-white mb-4">Ready to Start Your Project?</h4>
              <p className="text-gray-300 mb-6">Let's discuss how I can help bring your ideas to life with modern web technologies.</p>
              <a href="#contact" className="btn-primary inline-block">
                <span className="shine-text">Get Started</span>
              </a>
            </div>
          </div>

          {/* Right Content - Services Grid */}
          <div className="grid gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="glass-card p-6 hover:bg-orange-500/5 transition-all duration-300 group"
                data-aos="fade-left"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400 group-hover:bg-orange-500/30 transition-colors duration-300">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-orange-500/10 text-orange-300 rounded-full text-sm border border-orange-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service