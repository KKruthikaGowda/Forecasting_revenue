import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RevenueForecastDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [revenueData, setRevenueData] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0);
  const navigate = useNavigate();

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  useEffect(() => {
    fetchRevenueData();
  }, [year, month]);

  useEffect(() => {
    const baseline = revenueData.baseline?.totalRevenue || 0;
    const mostLikely = revenueData.mostLikely?.totalRevenue || 0;
    const upside = revenueData.upside?.totalRevenue || 0;
    const bfd = revenueData.bfd?.totalRevenue || 0;
    setTotalRevenue(baseline + mostLikely + upside + bfd);
  }, [revenueData]);

  const fetchRevenueData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setRevenueData({});
  };

  const handleCardClick = (viewType) => {
    const routeMap = {
      baseline: '/baseline-details',
      mostLikely: '/mostlikely-details',
      upside: '/upside-details',
      bfd: '/bfd-details',
    };
    navigate(routeMap[viewType], { state: { [`${viewType}Data`]: revenueData[viewType] } });
  };

  return (
    <div className="dashboard-container">
      <div className="filters">
        <label>Select Year:</label>
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {[2023, 2024, 2025].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <label>Select Month:</label>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>

      <h1 className="dashboard-title">Revenue Forecast Dashboard</h1>

      <div className="summary-cards-wrapper">
        <div className="total-revenue-card card">
          <h3>TOTAL REVENUE</h3>
          <p>{formatCurrency(totalRevenue)}</p>
        </div>

        <div className="summary-cards">
          {['baseline', 'mostLikely', 'upside', 'bfd'].map((type, i) => (
            <div
              key={type}
              className="card"
              style={{ '--i': i }}
              onClick={() => handleCardClick(type)}
            >
              <h3>{type.toUpperCase()}</h3>
              <p>{formatCurrency(revenueData[type]?.totalRevenue || 0)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueForecastDashboard;
