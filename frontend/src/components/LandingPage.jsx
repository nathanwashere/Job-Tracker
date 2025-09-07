import { useNavigate } from "react-router-dom";
import { Briefcase, CheckCircle, BarChart3, Target, Users, Clock, Award } from "lucide-react";
import "../style/LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <div className="landing-container">
      <div className="landing-card">
        <div className="landing-title">
          <Briefcase size={48} />
          Job Tracker
        </div>
        
        <p className="landing-subtitle">
          The ultimate tool to organize, track, and manage your job applications. 
          Never miss an opportunity again with our comprehensive job search management platform.
        </p>
        
        <div className="landing-features">
          <div className="feature-item">
            <div className="feature-icon">
              <CheckCircle size={20} />
            </div>
            <div className="feature-text">
              <strong>Track Applications</strong><br />
              Keep track of all your job applications in one centralized location
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <BarChart3 size={20} />
            </div>
            <div className="feature-text">
              <strong>Monitor Progress</strong><br />
              Visualize your application status and track your job search progress
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <Target size={20} />
            </div>
            <div className="feature-text">
              <strong>Stay Organized</strong><br />
              Never miss deadlines or follow-ups with our smart organization system
            </div>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon">
              <Award size={20} />
            </div>
            <div className="feature-text">
              <strong>Achieve Success</strong><br />
              Increase your chances of landing your dream job with better organization
            </div>
          </div>
        </div>
        
        <div className="stats-section">
          <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
            Why Choose Job Tracker?
          </h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Free to Use</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Always Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number"></div>
              <div className="stat-label">Unlimited Applications</div>
            </div>
          </div>
        </div>
        
        <div className="landing-buttons">
          <button
            className="landing-button primary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/sign-up");
            }}
          >
            Get Started - Sign Up Free
          </button>
          
          <button
            className="landing-button secondary"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
