import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Timeline = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchTimelineData();
  }, []);

  // Helper to parse "DD.MM.YYYY" or "YYYY" into Date
  const parseDate = (dateStr) => {
    if (!dateStr) return new Date(0); // fallback
    const parts = dateStr.split(".");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
    // If only year
    return new Date(`${dateStr}-01-01`);
  };

  const fetchTimelineData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://manikandan05-backend.vercel.app/api/timeline');
      if (!response.ok) throw new Error('Failed to fetch timeline data');

      const data = await response.json();

      // Sort descending by full date
      const sortedData = data.sort((a, b) => parseDate(b.year) - parseDate(a.year));
      setTimelineData(sortedData);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setError(error.message);

      // Fallback data
      const fallbackData = [
        {
          _id: '1',
          year: "02.12.2024",
          title: "Software Engineer",
          company: "Yubi",
          description: "Built and maintained web applications for financial solutions. Collaborated with teams to design features.",
          skills: ["Java", "Spring Boot", "PostgreSQL", "AWS"],
          type: "work",
        },
        {
          _id: '2',
          year: "01.04.2023",
          title: "Software Engineer",
          company: "SecureDApp",
          description: "Managed and delivered multiple development projects. Ensured timely, high-quality deliverables.",
          skills: ["React", "Node.js", "MongoDB", "AWS"],
          type: "work",
        },
      ];

      setTimelineData(fallbackData.sort((a, b) => parseDate(b.year) - parseDate(a.year)));
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
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text"
          data-aos="fade-up"
        >
          My Journey
        </h2>
        <p
          className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
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
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === "work"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-green-500/20 text-green-300 border border-green-500/30"
                    }`}
                  >
                    {item.type === "work" ? "Work" : "Education"}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 break-words">{item.title}</h3>
                <h4 className="text-lg text-orange-400 mb-4 font-medium break-words">{item.company}</h4>
                <p className="text-gray-300 mb-6 leading-relaxed break-words">{item.description}</p>

                <div className="flex flex-wrap gap-2">
                  {item.skills?.map((skill, skillIndex) => (
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
