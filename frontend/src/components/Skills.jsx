import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    if (inView && !animated) {
      setAnimated(true);
    }
  }, [inView, animated]);

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React.js", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "HTML5/CSS3", level: 95 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Next.js", level: 80 }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "REST APIs", level: 90 },
        { name: "GraphQL", level: 70 }
      ]
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Docker", level: 75 },
        { name: "AWS", level: 70 },
        { name: "Firebase", level: 80 },
        { name: "Vercel", level: 85 },
        { name: "Figma", level: 75 }
      ]
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-900 to-black" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text" data-aos="fade-up">
          Technical Skills
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          A comprehensive overview of my technical expertise and proficiency levels
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="glass-card p-8"
              data-aos="fade-up"
              data-aos-delay={categoryIndex * 200}
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-orange-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress"
                        style={{
                          width: animated ? `${skill.level}%` : '0%',
                          transitionDelay: `${skillIndex * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Cloud */}
        <div className="mt-16" data-aos="fade-up" data-aos-delay="600">
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "Redux", "Zustand", "Socket.io", "Jest", "Cypress", "Webpack", 
              "Vite", "Sass", "Material-UI", "Chakra UI", "Framer Motion", 
              "Three.js", "D3.js", "Stripe", "PayPal", "JWT", "OAuth"
            ].map((tech, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-300 rounded-full border border-orange-500/20 hover:border-orange-500/40 hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-500/20 transition-all duration-300 cursor-default"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;