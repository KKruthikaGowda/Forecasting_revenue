import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import RevenueForecastDashboard from './components/RevenueForecastDashboard';
import BfdDetailsPage from './components/BfdDetailsPage';
import BaselineDetailsPage from './components/BaselineDetailsPage';
import MostLikelyDetailsPage from './components/MostLikelyDetailsPage';
import UpsideDetailsPage from './components/UpsideDetailsPage';
import LandingPage from './components/LandingPage';
import UploadPage from './components/UploadPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 👇 Landing Page is now the default route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<RevenueForecastDashboard />} />
          <Route path="/bfd-details" element={<BfdDetailsPage />} />
          <Route path="/baseline-details" element={<BaselineDetailsPage />} />
          <Route path="/mostlikely-details" element={<MostLikelyDetailsPage />} />
          <Route path="/upside-details" element={<UpsideDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
