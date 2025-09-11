import React from 'react';
import '../App.css';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>Welcome to Revenue Forecast System</h1>
      <div className="button-group">
        <button onClick={() => navigate('/upload')}>Upload Excel Sheet</button>
        <button onClick={() => navigate('/dashboard')}>View Dashboard</button>
      </div>
    </div>
  );
};

export default LandingPage;
