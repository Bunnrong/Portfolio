// App.js
import React, { useState, useEffect } from 'react';
import profileImage from './images/profile.jpg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollY = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollY >= element.offsetTop && scrollY < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <Header 
        activeSection={activeSection} 
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

// Header Component - SINGLE VERSION
const Header = ({ activeSection, isMenuOpen, toggleMenu, setIsMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <span>DevPortfolio</span>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navItems.map(item => (
                <li key={item.id} className="nav-item">
                  <a 
                    href={`#${item.id}`}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      
      {/* Mobile backdrop */}
      <div 
        className={`mobile-backdrop ${isMenuOpen ? 'active' : ''}`} 
        onClick={toggleMenu}
      ></div>
    </header>
  );
};

// Hero Component
const Hero = () => {
  const handleViewResume = () => {
    // Open resume PDF in new tab
    window.open('/resume.pdf', '_blank');
  };

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Hi, I'm <span className="highlight">BUNRONG THORN</span>
            </h1>
            <h2 className="hero-subtitle">Frontend Developer</h2>
            <p className="hero-description">
              I create beautiful, responsive web applications using modern technologies. 
              Passionate about clean code and user experience.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleViewResume}
              >
                View Resume
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img src={profileImage} alt="Bunrong Thorn - Web Developer" />
              <div className="floating-elements">
                <div className="floating-element react"></div>
                <div className="floating-element js"></div>
                <div className="floating-element css"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Component
const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a passionate frontend developer with 2+ years of experience building 
              web applications. I specialize in React, Node.js, and modern JavaScript 
              ecosystems.
            </p>
            <p>
              My journey in web development started during my information technology engineering studies, 
              and I've been continuously learning and adapting to new technologies ever since.
            </p>
            <p>
              When I'm not coding, you can find me contributing to open-source projects, 
              writing technical blogs, or exploring new frameworks and tools.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h3>25+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat">
                <h3>30+</h3>
                <p>Happy Clients</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="code-snippet">
              <pre>{`function Developer() {
  this.skills = ['JavaScript', 'React', 'Node.js'];
  this.passion = 'Creating amazing web experiences';
  this.motto = 'Code, Deploy, Improve';
}`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Component
const Skills = () => {
  const skills = [
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'React', level: 85, category: 'frontend' },
    { name: 'HTML/CSS', level: 95, category: 'frontend' },
    { name: 'Node.js', level: 80, category: 'backend' },
    { name: 'Python', level: 75, category: 'backend' },
    { name: 'MongoDB', level: 70, category: 'backend' },
    { name: 'MySQL', level: 70, category: 'backend' },
    { name: 'Git', level: 85, category: 'tools' },
    { name: 'AWS', level: 65, category: 'tools' }
  ];

  const categories = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & Others'
  };

  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        
        <div className="skills-filter">
          <button 
            className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map(skill => (
            <div key={skill.name} className="skill-card">
              <div className="skill-header">
                <h3>{skill.name}</h3>
                <span>{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Component
const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'CAR RENTAL',
      description: 'Website for rental car with HTML, CSS, JavaScript.',
      image: '/carrental.png',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      liveUrl: 'https://car-rental-using-html-css-java-script-nypqkgnjm.vercel.app/',
      githubUrl: 'https://github.com/Bunnrong/Responsive-Website-CAR_RENTAL'
    },
    {
      id: 2,
      title: 'Online Book Reading',
      description: 'Website free read book and have many category.',
      image: '/iread.png',
      technologies: ['Laravel', 'PHP', 'Boostrap', 'API', 'MySQL'],
      liveUrl: 'https://www.youtube.com/watch?v=eeD75EzukrI',
      githubUrl: 'https://github.com/Bunnrong/OnlineBooksReading-Using_laravel_mysql'
    },
    // {
    //   id: 3,
    //   title: 'Weather Dashboard',
    //   description: 'Real-time weather application with forecast and location services',
    //   image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500',
    //   technologies: ['JavaScript', 'API', 'Chart.js'],
    //   liveUrl: '#',
    //   githubUrl: '#'
    // }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.liveUrl} className="project-link">
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                    <a href={project.githubUrl} className="project-link">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Component
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>bunrong4619@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="contact-text">
                <h3>Phone</h3>
                <p>+855 093273510</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="contact-text">
                <h3>Location</h3>
                <p>Tuek Thla, Sen Sok, Phnom Penh</p>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com/Bunnrong" className="social-link" target='_blank'>
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/thorn-bunrong-8a58312a5/" className="social-link" target='_blank'>
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://web.telegram.org/a/" className="social-link" target='_blank'>
                <i class="fa-brands fa-telegram"></i>
              </a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>&copy; 2025 Bunrong Thorn. All rights reserved.</p>
          <p>Built with React and ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default App;