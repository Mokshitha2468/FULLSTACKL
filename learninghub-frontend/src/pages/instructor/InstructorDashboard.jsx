import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './InstructorDashboard.css';

const InstructorDashboard = () => {
  const [username, setUsername] = useState('Instructor');
  const [uploadedCourses, setUploadedCourses] = useState([]);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotApiKey, setChatbotApiKey] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);
  const navigate = useNavigate();

  // Stats container style
  const statsContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px 0',
    gap: '20px',
  };

  const statCardStyle = {
    flex: 1,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const statValueStyle = {
    fontSize: '2.8rem',
    fontWeight: 'bold',
    margin: '15px 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { username: storedUsername } = JSON.parse(userData);
      if (storedUsername) {
        setUsername(storedUsername);
        fetchUploadedCourses(storedUsername);
      }
    } else {
      navigate('/');
    }

    const savedApiKey = localStorage.getItem('geminiApiKey');
    if (savedApiKey) {
      setChatbotApiKey(savedApiKey);
    }
  }, [navigate]);

  const fetchUploadedCourses = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8083/courses?username=${username}`);
      setUploadedCourses(response.data);
    } catch (error) {
      console.error('Error fetching uploaded courses:', error);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/InsAddCourseContent?courseId=${courseId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
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
        return;
      }
    }
    setIsChatbotOpen(!isChatbotOpen);
  };

  const renderDashboard = () => {
    const totalCourses = uploadedCourses.length;
    const totalStudents = uploadedCourses.reduce((acc, course) => acc + (course.enrolledStudents || 0), 0);
    const totalRevenue = uploadedCourses.reduce((acc, course) => acc + (course.revenue || 0), 0);

    return (
      <div className="dashboard-content">
        <div className="welcome-banner">
          <div className="welcome-text">
            <h2>Welcome back, {username}!</h2>
            <p>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="welcome-message">Manage your courses and track your performance.</p>
          </div>
          <div className="illustration">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/teacher-3678118-3061147.png" 
                 alt="Teaching illustration" />
          </div>
        </div>
        
        <div style={statsContainerStyle} className="stats-container">
          <div style={statCardStyle} className="stat-card">
            <h3>Total Courses</h3>
            <p style={statValueStyle} className="stat-value">{totalCourses}</p>
          </div>
          <div style={statCardStyle} className="stat-card">
            <h3>Total Students</h3>
            <p style={statValueStyle} className="stat-value">{totalStudents}</p>
          </div>
          <div style={statCardStyle} className="stat-card">
            <h3>Total Revenue</h3>
            <p style={statValueStyle} className="stat-value">${totalRevenue}</p>
          </div>
        </div>

        <div className="uploaded-courses-section styled-section">
          <h2>Your Uploaded Courses</h2>
          {uploadedCourses.length > 0 ? (
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Description</th>
                  <th>Duration (hours)</th>
                  <th>Enrolled Students</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedCourses.map((course) => (
                  <tr key={course.courseid}>
                    <td>{course.courseid}</td>
                    <td>{course.description}</td>
                    <td>{course.time}</td>
                    <td>{course.enrolledStudents || 0}</td>
                    <td>
                      <button 
                        className="manage-course-button"
                        onClick={() => handleCourseClick(course.courseid)}
                      >
                        Manage Content
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="styled-message">No courses uploaded yet.</p>
          )}
        </div>
      </div>
    );
  };

  const renderCourseManagement = () => {
    return (
      <div className="course-management-content">
        <h2 className="section-title">Course Management</h2>
        <div className="management-actions">
          <div className="action-card" onClick={() => navigate('/InsAddCourse')}>
            <div className="action-icon">
              <i className="fas fa-plus-circle"></i>
            </div>
            <h3>Add New Course</h3>
            <p>Create and publish a new course</p>
          </div>
          
          <div className="action-card" onClick={() => navigate('/InsAddCourseContent')}>
            <div className="action-icon">
              <i className="fas fa-edit"></i>
            </div>
            <h3>Manage Content</h3>
            <p>Add modules, videos, and quizzes</p>
          </div>
          
          <div className="action-card">
            <div className="action-icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <h3>View Analytics</h3>
            <p>Track course performance</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <nav className="themed-navbar">
        <div className="logo">Learning Hub</div>
        <div className="profile-menu">
          <span className="user-name">Welcome, {username}</span>
          <img className="avatar" src={`https://ui-avatars.com/api/?name=${username}&background=667eea&color=fff`} alt="Profile" />
        </div>
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
      
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <ul className="sidebar-menu">
            <li 
              className={`menu-item ${activeSection === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </li>
            <li 
              className={`menu-item ${activeSection === 'course-management' ? 'active' : ''}`}
              onClick={() => setActiveSection('course-management')}
            >
              <i className="fas fa-book"></i>
              <span>Course Management</span>
            </li>
            <li 
              className={`menu-item ${isChatbotOpen ? 'active' : ''}`}
              onClick={toggleChatbot}
            >
              <i className="fas fa-robot"></i>
              <span>AI Assistant</span>
            </li>
          </ul>
        </aside>
        
        <main className="dashboard-main">
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'course-management' && renderCourseManagement()}
        </main>
      </div>

      {showApiKeyForm && (
        <div className="api-key-modal">
          <div className="api-key-dialog">
            <h3>Enter Your Gemini API Key</h3>
            <p>To use the AI assistant, you need to provide a valid Gemini API key.</p>
            <input 
              type="password"
              className="api-key-input"
              placeholder="Enter your Gemini API key"
              onChange={(e) => setChatbotApiKey(e.target.value)}
              value={chatbotApiKey}
            />
            <div className="api-key-actions">
              <button 
                className="cancel-button"
                onClick={() => {
                  setShowApiKeyForm(false);
                  setIsChatbotOpen(false);
                }}
              >
                Cancel
              </button>
              <button 
                className="submit-button"
                onClick={() => handleApiKeySubmit(chatbotApiKey)}
                disabled={!chatbotApiKey.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {isChatbotOpen && !showApiKeyForm && (
        <div className="chatbot-modal">
          <div className="chatbot-container">
            <div className="chatbot-header">
              <h3>Instructor Assistant</h3>
              <button className="close-chatbot" onClick={() => setIsChatbotOpen(false)}>×</button>
            </div>
            <div className="chatbot-content">
              <div className="chatbot-placeholder">
                <p>AI Assistant functionality would be implemented here</p>
                <p>This would help with course creation, student queries, and content management.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorDashboard;