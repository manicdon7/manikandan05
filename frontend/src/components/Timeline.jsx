import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTimelineData();
  }, []);

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://manikandan05-backend.vercel.app/api/timeline');
      if (!response.ok) {
        throw new Error('Failed to fetch timeline data');
      }
      const data = await response.json();
      setTimelineData(data);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setError(error.message);
      // Fallback data if API fails
      setTimelineData([
        {
          _id: '1',
          year: "2024",
          title: "Senior Full Stack Developer",
          company: "Freelance",
          description: "Leading full-stack development projects, specializing in React, Node.js, and modern web technologies. Delivering high-quality solutions for clients worldwide.",
          skills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript"],
          type: "work"
        },
        {
          _id: '2',
          year: "2023",
          title: "Full Stack Developer",
          company: "Tech Solutions Inc.",
          description: "Developed and maintained multiple web applications using MERN stack. Collaborated with cross-functional teams to deliver scalable solutions.",
          skills: ["MERN Stack", "PostgreSQL", "Docker", "Git"],
          type: "work"
        },
        {
          _id: '3',
          year: "2022",
          title: "Frontend Developer",
          company: "Digital Agency",
          description: "Created responsive and interactive user interfaces. Focused on performance optimization and user experience enhancement.",
          skills: ["React", "JavaScript", "CSS3", "Figma"],
          type: "work"
        },
        {
          _id: '4',
          year: "2021",
          title: "Computer Science Graduate",
          company: "University",
          description: "Completed Bachelor's degree in Computer Science with focus on software engineering and web development.",
          skills: ["Data Structures", "Algorithms", "Software Engineering"],
          type: "education"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20" id="timeline">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 overflow-hidden" id="timeline">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text" data-aos="fade-up">
          My Journey
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          A timeline of my professional growth and achievements in the world of technology
        </p>
        
        {error && (
          <div className="text-center mb-8">
            <p className="text-yellow-400">Using fallback data due to API error</p>
          </div>
        )}
        
        <div className="timeline max-w-6xl mx-auto overflow-hidden">
          {timelineData.map((item, index) => (
            <div 
              key={item._id || index} 
              className="timeline-item" 
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={index * 100}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="flex items-center mb-3 flex-wrap">
                  <span className="text-2xl font-bold text-orange-500 mr-4">{item.year}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.type === 'work' 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                      : 'bg-green-500/20 text-green-300 border border-green-500/30'
                  }`}>
                    {item.type === 'work' ? 'Work' : 'Education'}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2 break-words">{item.title}</h3>
                <h4 className="text-lg text-orange-400 mb-4 font-medium break-words">{item.company}</h4>
                <p className="text-gray-300 mb-6 leading-relaxed break-words">{item.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {item.skills && item.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-3 py-1 bg-orange-500/10 text-orange-300 rounded-full text-sm border border-orange-500/20 hover:bg-orange-500/20 transition-colors duration-300 break-words"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;