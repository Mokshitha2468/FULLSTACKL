import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header">
                <nav className="nav">
                    <div className="nav-container">
                        <div className="logo">
                            <span className="logo-icon">🚀</span>
                            <span className="logo-text">LearnPro</span>
                        </div>
                        <div className="nav-menu">
                            <a href="#home" className="nav-link active">Home</a>
                            <a href="#courses" className="nav-link">Programs</a>
                            <a href="#about" className="nav-link">Success Stories</a>
                            <a href="#contact" className="nav-link">Career Support</a>
                            <button className="nav-button" onClick={() => navigate('/login')}>
                                Start Learning
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Hero Section with Background Image */}
            <section className="hero" id="home">
                <div className="hero-background"></div>
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <span>🌟 Join 25,000+ Successful Graduates</span>
                        </div>
                        <h1 className="hero-title">
                            Transform Your Career in 
                            <span className="highlight"> Tech</span>
                        </h1>
                        <p className="hero-description">
                            Become industry-ready with hands-on projects, personalized mentorship, 
                            and direct placement opportunities at top tech companies.
                        </p>
                        <div className="hero-actions">
                            <button className="btn-primary" onClick={handleGetStarted}>
                                Explore Programs
                                <span className="btn-icon">→</span>
                            </button>
                            <button className="btn-secondary">
                                <span className="play-icon">▶</span>
                                View Graduate Success
                            </button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">4.9/5</div>
                                <div className="stat-label">Student Rating</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">300+</div>
                                <div className="stat-label">Hiring Partners</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">96%</div>
                                <div className="stat-label">Placement Rate</div>
                            </div>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="visual-container">
                            <div className="main-visual">
                                <img 
                                    
                                    alt="Successful tech professionals collaborating"
                                    className="hero-image"
                                />
                            </div>
                            <div className="floating-card mentorship">
                                <div className="card-icon">👨‍💼</div>
                                <div className="card-content">
                                    <div className="card-title">1:1 Mentorship</div>
                                    <div className="card-desc">Industry Experts</div>
                                </div>
                            </div>
                            <div className="floating-card projects">
                                <div className="card-icon">💻</div>
                                <div className="card-content">
                                    <div className="card-title">Live Projects</div>
                                    <div className="card-desc">Real Experience</div>
                                </div>
                            </div>
                            <div className="floating-card placement">
                                <div className="card-icon">🏆</div>
                                <div className="card-content">
                                    <div className="card-title">Career Growth</div>
                                    <div className="card-desc">Top Companies</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features" id="about">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Your Path to Tech Excellence</h2>
                        <p className="section-subtitle">Comprehensive learning experience designed for career transformation</p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Industry-Aligned Curriculum</h3>
                            <p>Learn exactly what companies need with constantly updated course content</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🤝</div>
                            <h3>Personalized Mentorship</h3>
                            <p>Get guided by experienced professionals from top tech organizations</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💼</div>
                            <h3>Career Launch Support</h3>
                            <p>From resume building to interview preparation - we've got you covered</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔄</div>
                            <h3>Lifetime Access</h3>
                            <p>Continuous learning with updated content and alumni network benefits</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Section - Keeping original courses exactly the same */}
            <section className="courses" id="courses">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Tech Programs</h2>
                        <p className="section-subtitle">Choose your path to becoming an industry-ready professional</p>
                    </div>
                    <div className="course-grid">
                        <div className="course-card">
                            <img
                                src="https://images.unsplash.com/photo-1587620962725-abab7fe55159"
                                alt="Cloud DevOps Engineering"
                                onError={(e) => {
                                    e.target.src = 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                }}
                            />
                            <h3>Cloud Devops</h3>
                            <p>Master Cloud Deployment & Infrastructure</p>
                            <button onClick={handleGetStarted}>Start Learning</button>
                        </div>
                        <div className="course-card">
                            <img
                                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
                                alt="Distributed Systems Engineering"
                                onError={(e) => {
                                    e.target.src = 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                }}
                            />
                            <h3>Distributed Computing</h3>
                            <p>Build scalable distributed systems architecture</p>
                            <button onClick={handleGetStarted}>Start Learning</button>
                        </div>
                        <div className="course-card">
                            <img
                                src="https://images.unsplash.com/photo-1605902711622-cfb43c44367c"
                                alt="Computational Theory"
                                onError={(e) => {
                                    e.target.src = 'https://images.pexels.com/photos/17489150/pexels-photo-17489150/free-photo-of-light-on-computer-hardware.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                }}
                            />
                            <h3>Theory of Computation</h3>
                            <p>Advanced mathematical foundations of computing</p>
                            <button onClick={handleGetStarted}>Start Learning</button>
                        </div>
                        <div className="course-card">
                            <img
                                src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                                alt="Operating Systems"
                                onError={(e) => {
                                    e.target.src = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                }}
                            />
                            <h3>Operating Systems</h3>
                            <p>Deep dive into system architecture and design</p>
                            <button onClick={handleGetStarted}>Start Learning</button>
                        </div>
                        <div className="course-card">
                            <img
                                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb"
                                alt="AI and Autonomous Systems"
                                onError={(e) => {
                                    e.target.src = 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                }}
                            />
                            <h3>AI & Autonomous Systems</h3>
                            <p>Build intelligent systems and automation</p>
                            <button onClick={handleGetStarted}>Start Learning</button>
                        </div>
                        <div className="course-card">
                            <img
                                src="https://images.unsplash.com/photo-1555949963-aa79dcee981c"
                                alt="Data Structures and Algorithms"
                                onError={(e) => {
                                    e.target.src = 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                }}
                            />
                            <h3>Data Structures & Algorithms</h3>
                            <p>Master core computer science fundamentals</p>
                            <button onClick={handleGetStarted}>Start Learning</button>
                        </div>
                        <div className="course-card">
                            <img
                                src="/frontend.jpg"
                                alt="Frontend Development"
                                onError={(e) => {
                                    e.target.src = 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                                }}
                            />
                            <h3>Frontend Frameworks</h3>
                            <p>Modern web development with React, Angular, Vue</p>
                            <button onClick={handleGetStarted}>Start Learning</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Begin Your Tech Journey Today</h2>
                        <p>Take the first step towards a rewarding career in technology with our proven programs</p>
                        <button className="cta-btn" onClick={handleGetStarted}>Get Started Now</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" id="contact">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>LearnPro Academy</h4>
                            <p>Transforming careers through industry-focused tech education</p>
                        </div>
                        <div className="footer-section">
                            <h4>Learning Paths</h4>
                            <a href="#courses">Full Stack Development</a>
                            <a href="#courses">Data Science</a>
                            <a href="#courses">Cloud Engineering</a>
                            <a href="#courses">AI & Machine Learning</a>
                        </div>
                        <div className="footer-section">
                            <h4>Support</h4>
                            <p>Email: admissions@learnpro.com</p>
                            <p>Phone: (+91) 9391644444</p>
                            <p>Career Guidance: 9 AM - 7 PM</p>
                        </div>
                        <div className="footer-section">
                            <h4>Connect With Us</h4>
                            <div className="social-links">
                                <a href="#"><i className="fab fa-linkedin"></i> LinkedIn</a>
                                <a href="#"><i className="fab fa-youtube"></i> YouTube</a>
                                <a href="#"><i className="fab fa-github"></i> GitHub</a>
                                <a href="#"><i className="fab fa-discord"></i> Community</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 LearnPro Academy. Empowering the next generation of tech professionals.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;