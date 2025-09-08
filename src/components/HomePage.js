import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1 className="dashboard-title">Revenue Forecast Dashboard</h1>
      <div className="action-buttons">
        <button onClick={() => navigate('/upload')}>Upload Excel Sheets</button>
        <button onClick={() => navigate('/dashboard')}>View Dashboard</button>
      </div>
    </div>
  );
};

export default HomePage;
