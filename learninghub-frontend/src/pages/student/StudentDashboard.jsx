import React, { useState, useEffect } from 'react';
import MyCourses from './MyCourses';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import Chatbot from '../Chatbot';

// Register Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
    const [username, setUsername] = useState('');
    const [activeSection, setActiveSection] = useState('dashboard');
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [quizResult, setQuizResult] = useState(null);
    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});
    const [completedModules, setCompletedModules] = useState({});
    const [certificates, setCertificates] = useState([]);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);
    const [chatbotApiKey, setChatbotApiKey] = useState('');
    const [showApiKeyForm, setShowApiKeyForm] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignmentAnswers, setAssignmentAnswers] = useState({});
    const [assignmentResult, setAssignmentResult] = useState(null);
    const [submittedAssignments, setSubmittedAssignments] = useState({});

    // Sample data (keeping your existing data structure)
    const coursesData = [
        {
            id: 1,
            title: 'Web Development Fundamentals',
            description: 'Master HTML, CSS, and JavaScript',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            progress: 75,
            instructor: 'Prof. Sarah Johnson',
            modules: [] // Your existing modules data
        },
        // ... your other course data
    ];

    const assignmentsData = [
        {
            id: 1,
            title: "Java OOPs Concepts Quiz",
            description: "Test your knowledge of Object-Oriented Programming concepts in Java",
            dueDate: "2023-12-15",
            points: 100,
            timeLimit: 20,
            type: "quiz",
            category: "Java",
            questions: [] // Your existing questions data
        },
        // ... your other assignment data
    ];

    useEffect(() => {
        // Load user data
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.username) {
                setUsername(user.username);
            } else {
                setUsername('Guest User');
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            setUsername('Guest User');
        }
        
        // Initialize with sample data
        setCourses(coursesData);
        setEnrolledCourses([1, 2, 3]);
        setAssignments(assignmentsData);

        const savedCompletedModules = JSON.parse(localStorage.getItem('completedModules') || '{}');
        setCompletedModules(savedCompletedModules);

        const savedApiKey = localStorage.getItem('geminiApiKey');
        if (savedApiKey) {
            setChatbotApiKey(savedApiKey);
        }

        // Load submitted assignments
        try {
            const savedSubmissions = JSON.parse(localStorage.getItem('submittedAssignments') || '{}');
            setSubmittedAssignments(savedSubmissions);
        } catch (error) {
            console.error('Error loading submitted assignments:', error);
        }
    }, []);

    // Your existing functions (handleQuizSubmit, updateCourseProgress, etc.)
    const handleQuizSubmit = () => {
        // Your existing quiz submission logic
    };

    const updateCourseProgress = (courseId) => {
        // Your existing progress update logic
    };

    const handleAnswerSelect = (questionId, optionIndex) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: optionIndex
        });
    };

    const startQuiz = (course, module) => {
        setSelectedCourse(course);
        setSelectedModule(module);
        setCurrentQuiz(module.quiz);
        setUserAnswers({});
        setQuizResult(null);
        setActiveSection('quiz');
    };

    const handleApiKeySubmit = (key) => {
        localStorage.setItem('geminiApiKey', key);
        setChatbotApiKey(key);
        setShowApiKeyForm(false);
    };

    const toggleChatbot = () => {
        if (!isChatbotOpen) {
            if (!chatbotApiKey) {
                setShowApiKeyForm(true);
            }
        }
        setIsChatbotOpen(!isChatbotOpen);
    };

    // Modern Dashboard Section
    const renderDashboard = () => {
        const totalModulesCompleted = Object.keys(completedModules).length;
        const activeCourses = courses.filter(c => enrolledCourses.includes(c.id) && c.progress > 0 && c.progress < 100).length;
        const timeSpentLearning = totalModulesCompleted * 2.5;

        return (
            <div className="modern-dashboard">
                {/* Welcome Banner */}
                <div className="welcome-banner">
                    <div className="welcome-content">
                        <h1>Welcome back, {username}! 👋</h1>
                        <p>Continue your learning journey and unlock new skills today</p>
                    </div>
                    <div className="welcome-stats">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-book-open"></i>
                            </div>
                           
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-trophy"></i>
                            </div>
                            
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-clock"></i>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="quick-actions">
                    <h2>Quick Actions</h2>
                    <div className="action-grid">
                        <div className="action-card" onClick={() => setActiveSection('my-courses')}>
                            <div className="action-icon">
                                <i className="fas fa-play-circle"></i>
                            </div>
                            <h3>Continue Learning</h3>
                            <p>Resume your courses</p>
                        </div>
                        <div className="action-card" onClick={() => setActiveSection('assignments')}>
                            <div className="action-icon">
                                <i className="fas fa-tasks"></i>
                            </div>
                            <h3>Assignments</h3>
                            <p>View pending tasks</p>
                        </div>
                        <div className="action-card" onClick={() => setActiveSection('all-courses')}>
    <div className="action-icon">
        <i className="fas fa-compass"></i>
    </div>
    <h3>Browse Courses</h3>
    <p>Explore all available subjects</p>
</div>
<div className="action-card" onClick={() => setActiveSection('certificates')}>
    <div className="action-icon">
        <i className="fas fa-certificate"></i>
    </div>
    <h3>My Certificates</h3>
    <p>View and download certificates</p>
</div>


                        <div className="action-card" onClick={() => setActiveSection('all-courses')}>
                            <div className="action-icon">
                                <i className="fas fa-plus-circle"></i>
                            </div>
                            <h3>Browse Courses</h3>
                            <p>Discover new content</p>
                        </div>
                        <div className="action-card" onClick={toggleChatbot}>
                            <div className="action-icon">
                                <i className="fas fa-robot"></i>
                            </div>
                            <h3>AI Assistant</h3>
                            <p>Get help with learning</p>
                        </div>
                    </div>
                </div>

                {/* Progress Overview */}
                <div className="progress-overview">
                    <div className="section-header">
                        <h2>Learning Progress</h2>
                        <button className="view-all-btn" onClick={() => setActiveSection('my-courses')}>
                            View All
                        </button>
                    </div>
                    <div className="progress-grid">
                        {courses.filter(c => enrolledCourses.includes(c.id) && c.progress > 0)
                               .slice(0, 3)
                               .map(course => (
                            <div key={course.id} className="progress-card">
                                <div className="course-image">
                                    <img src={course.image} alt={course.title} />
                                </div>
                                <div className="course-info">
                                    <h4>{course.title}</h4>
                                    <p>{course.instructor}</p>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{width: `${course.progress}%`}}></div>
                                    </div>
                                    <span className="progress-text">{course.progress}% complete</span>
                                </div>
                                <button 
                                    className="continue-btn"
                                    onClick={() => {
                                        setSelectedCourse(course);
                                        setActiveSection('course-detail');
                                    }}
                                >
                                    Continue
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="recent-activity">
                    <div className="section-header">
                        <h2>Recent Activity</h2>
                    </div>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon completed">
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <div className="activity-content">
                                <h4>Completed Quiz</h4>
                                <p>HTML Fundamentals Quiz</p>
                                <span>2 days ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon video">
                                <i className="fas fa-play-circle"></i>
                            </div>
                            <div className="activity-content">
                                <h4>Watched Video</h4>
                                <p>React Hooks Explained</p>
                                <span>3 days ago</span>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon enrolled">
                                <i className="fas fa-plus-circle"></i>
                            </div>
                            <div className="activity-content">
                                <h4>Enrolled in Course</h4>
                                <p>Data Science with Python</p>
                                <span>1 week ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Modern All Courses Section
    const renderAllCourses = () => {
        const handleEnroll = async (course) => {
            const payload = {
                username,
                courseHead: course.title,
                courseId: course.id,
                percentage: 0,
            };

            try {
                const response = await axios.post(`http://localhost:8083/student-course`, payload);
                alert(response.data || 'Enrolled successfully!');
            } catch (error) {
                console.error('Error enrolling in course:', error);
                alert('Failed to enroll in the course. Please try again.');
            }
        };

        return (
            <div className="modern-courses-section">
                <div className="section-header">
                    <h1>Explore Courses</h1>
                    <p>Discover new skills and advance your career</p>
                </div>
                
                <div className="courses-grid-modern">
                    {courses.map(course => (
                        <div key={course.id} className="course-card-modern">
                            <div className="course-image-modern">
                                <img src={course.image} alt={course.title} />
                                <div className="course-overlay">
                                    <span className="difficulty-badge">
                                        {course.progress > 60 ? "Advanced" : course.progress > 30 ? "Intermediate" : "Beginner"}
                                    </span>
                                </div>
                            </div>
                            <div className="course-content-modern">
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <div className="course-meta-modern">
                                    <span><i className="fas fa-user-tie"></i> {course.instructor}</span>
                                    <span><i className="fas fa-book"></i> {course.modules?.length || 0} modules</span>
                                </div>
                                <button 
                                    className="enroll-btn-modern"
                                    onClick={() => handleEnroll(course)}
                                >
                                    <i className="fas fa-plus-circle"></i>
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // Modern Assignments Section
    const renderAssignments = () => {
        const pendingAssignments = assignments.filter(a => !submittedAssignments[a.id]);
        const completedAssignments = assignments.filter(a => submittedAssignments[a.id]);

        return (
            <div className="modern-assignments">
                <div className="section-header">
                    <h1>My Assignments</h1>
                    <p>Track your progress and submit your work</p>
                </div>

                {pendingAssignments.length > 0 && (
                    <div className="assignments-section">
                        <h2>Pending Assignments</h2>
                        <div className="assignments-grid-modern">
                            {pendingAssignments.map(assignment => (
                                <div key={assignment.id} className="assignment-card-modern">
                                    <div className="assignment-header-modern" 
                                         style={{backgroundColor: getCategoryColor(assignment.category)}}>
                                        <span className="assignment-type">{assignment.type.toUpperCase()}</span>
                                        <span className="assignment-points">{assignment.points} pts</span>
                                    </div>
                                    <div className="assignment-body-modern">
                                        <h3>{assignment.title}</h3>
                                        <p>{assignment.description}</p>
                                        <div className="assignment-meta-modern">
                                            <span><i className="fas fa-calendar"></i> Due: {formatDate(assignment.dueDate)}</span>
                                            <span><i className="fas fa-clock"></i> {assignment.timeLimit} min</span>
                                        </div>
                                        <button 
                                            className="start-btn-modern"
                                            onClick={() => startAssignment(assignment)}
                                        >
                                            Start Assignment
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {completedAssignments.length > 0 && (
                    <div className="assignments-section">
                        <h2>Completed Assignments</h2>
                        <div className="assignments-grid-modern">
                            {completedAssignments.map(assignment => {
                                const result = submittedAssignments[assignment.id];
                                return (
                                    <div key={assignment.id} className="assignment-card-modern completed">
                                        <div className="assignment-header-modern"
                                             style={{backgroundColor: getCategoryColor(assignment.category)}}>
                                            <span className="assignment-type">{assignment.type.toUpperCase()}</span>
                                            <span className={`score-badge ${result.passed ? 'passed' : 'failed'}`}>
                                                {result.score}%
                                            </span>
                                        </div>
                                        <div className="assignment-body-modern">
                                            <h3>{assignment.title}</h3>
                                            <p>{assignment.description}</p>
                                            <div className="assignment-meta-modern">
                                                <span><i className="fas fa-check-circle"></i> Completed</span>
                                                <span className={`status ${result.passed ? 'passed' : 'failed'}`}>
                                                    {result.passed ? 'Passed' : 'Failed'}
                                                </span>
                                            </div>
                                            <button 
                                                className="review-btn-modern"
                                                onClick={() => {
                                                    setSelectedAssignment(assignment);
                                                    setAssignmentResult(result);
                                                    setAssignmentAnswers(result.answers);
                                                    setActiveSection('assignment-detail');
                                                }}
                                            >
                                                Review Assignment
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Helper functions
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const getCategoryColor = (category) => {
        const categoryColors = {
            'Java': '#f44336',
            'Web Development': '#2196F3',
            'Backend Development': '#673AB7',
            'Frontend Development': '#8300d4ff',
            'Database': '#4b0096ff',
            'DevOps': '#FF5722',
            'Mobile Development': '#607D8B'
        };
        return categoryColors[category] || '#9C27B0';
    };

    const startAssignment = (assignment) => {
        setSelectedAssignment(assignment);
        setAssignmentAnswers({});
        setAssignmentResult(null);
        setActiveSection('assignment-detail');
    };

    return (
        <div className="modern-dashboard-container">
            {/* Modern Navigation */}
            <nav className="modern-nav">
                <div className="nav-content">
                    <div className="logo-section">
                        <i className="fas fa-graduation-cap"></i>
                        <span className="logo-text">Learning Hub</span>
                    </div>
                    <div className="nav-controls">
                        <div className="user-profile">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${username}&background=6ac1c5&color=fff`} 
                                alt="Profile" 
                                className="user-avatar"
                            />
                            <span className="user-name">Hi, {username}</span>
                        </div>
                        <button 
                            className="logout-btn-modern"
                            onClick={() => {
                                localStorage.removeItem('user');
                                window.location.href = '/';
                            }}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="modern-main-layout">
                {/* Sidebar */}
                <aside className="modern-sidebar">
                    <div className="sidebar-content">
                        <div className="sidebar-menu">
                            <div 
                                className={`menu-item-modern ${activeSection === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveSection('dashboard')}
                            >
                                <i className="fas fa-home"></i>
                                <span>Dashboard</span>
                            </div>
                            <div 
                                className={`menu-item-modern ${activeSection === 'my-courses' ? 'active' : ''}`}
                                onClick={() => setActiveSection('my-courses')}
                            >
                                <i className="fas fa-book"></i>
                                <span>My Courses</span>
                            </div>
                            <div 
                                className={`menu-item-modern ${activeSection === 'all-courses' ? 'active' : ''}`}
                                onClick={() => setActiveSection('all-courses')}
                            >
                                <i className="fas fa-compass"></i>
                                <span>Registered Courses</span>
                            </div>
                            <div 
                                className={`menu-item-modern ${activeSection === 'all-courses' ? 'active' : ''}`}
                                onClick={() => setActiveSection('all-courses')}
                            >
                                <i className="fas fa-compass"></i>
                                <span>Browse Courses</span>
                            </div>
                            <div
  className={`menu-item-modern ${activeSection === 'categories' ? 'active' : ''}`}
  onClick={() => setActiveSection('categories')}
>
  <i className="fas fa-tags"></i>
  <span>Categories</span>
</div>
<div
  className={`menu-item-modern ${activeSection === 'wishlist' ? 'active' : ''}`}
  onClick={() => setActiveSection('wishlist')}
>
  <i className="fas fa-heart"></i>
  <span>Wishlist</span>
</div>

                            <div 
                                className={`menu-item-modern ${activeSection === 'assignments' ? 'active' : ''}`}
                                onClick={() => setActiveSection('assignments')}
                            >
                                <i className="fas fa-tasks"></i>
                                <span>Assignments</span>
                            </div>
                            <div 
                                className={`menu-item-modern ${isChatbotOpen ? 'active' : ''}`}
                                onClick={toggleChatbot}
                            >
                                <i className="fas fa-robot"></i>
                                <span>AI Assistant</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="modern-content-area">
                    {activeSection === 'dashboard' && renderDashboard()}
                    {activeSection === 'my-courses' && <MyCourses />}
                    {activeSection === 'all-courses' && renderAllCourses()}
                    {activeSection === 'assignments' && renderAssignments()}
                    {/* Add other sections as needed */}
                </main>
            </div>

            {/* Chatbot Modal */}
            {isChatbotOpen && !showApiKeyForm && (
                <div className="chatbot-modal-modern">
                    <div className="chatbot-container-modern">
                        <div className="chatbot-header-modern">
                            <h3>Learning Assistant</h3>
                            <button className="close-chatbot-modern" onClick={() => setIsChatbotOpen(false)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="chatbot-content-modern">
                            <Chatbot onApiKeyError={() => setShowApiKeyForm(true)} />
                        </div>
                    </div>
                </div>
            )}

            {/* API Key Modal */}
            {showApiKeyForm && (
                <div className="modal-overlay">
                    <div className="api-key-modal-modern">
                        <div className="modal-header">
                            <h3>AI Assistant Setup</h3>
                        </div>
                        <div className="modal-body">
                            <p>Enter your Gemini API key to use the AI assistant:</p>
                            <input 
                                type="password"
                                className="api-key-input-modern"
                                placeholder="Enter your API key"
                                value={chatbotApiKey}
                                onChange={(e) => setChatbotApiKey(e.target.value)}
                            />
                            <p className="help-text">
                                Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noreferrer">Google AI Studio</a>
                            </p>
                        </div>
                        <div className="modal-actions">
                            <button 
                                className="btn-secondary"
                                onClick={() => {
                                    setShowApiKeyForm(false);
                                    setIsChatbotOpen(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn-primary"
                                onClick={() => handleApiKeySubmit(chatbotApiKey)}
                                disabled={!chatbotApiKey.trim()}
                            >
                                Save & Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;