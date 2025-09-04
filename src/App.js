import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; // Import App.css
import RevenueForecastDashboard from './components/RevenueForecastDashboard';
import BfdDetailsPage from './components/BfdDetailsPage'; // Will create this file
import BaselineDetailsPage from './components/BaselineDetailsPage';
import MostLikelyDetailsPage from './components/MostLikelyDetailsPage';
import UpsideDetailsPage from './components/UpsideDetailsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RevenueForecastDashboard />} />
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
