import React, { useState, useEffect } from 'react';
import '../App.css';

import { useNavigate } from 'react-router-dom';
import RevenueDetailModal from './RevenueDetailModal';

const RevenueForecastDashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [revenueData, setRevenueData] = useState({});
  const [totalRevenue, setTotalRevenue] = useState(0); // New state for total revenue
  const [selectedView, setSelectedView] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRevenueData();
  }, [year, month]);

  useEffect(() => {
    // Calculate total revenue whenever revenueData changes
    const calculateTotal = () => {
      const baseline = revenueData.baseline?.totalRevenue || 0;
      const mostLikely = revenueData.mostLikely?.totalRevenue || 0;
      const upside = revenueData.upside?.totalRevenue || 0;
      const bfd = revenueData.bfd?.totalRevenue || 0;
      setTotalRevenue(baseline + mostLikely + upside + bfd);
    };

    if (revenueData.baseline || revenueData.mostLikely || revenueData.upside || revenueData.bfd) {
      calculateTotal();
    }
  }, [revenueData]); // Depend on revenueData

  const fetchRevenueData = async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockData = {
      baseline: {
        totalRevenue: 1200000,
        details: [
          {
            associateId: 'A101',
            name: 'Ravi Kumar',
            serviceLine: 'Consulting',
            projectId: 'P001',
            projectName: 'Apollo',
            startDate: '2025-01-01',
            endDate: '2025-12-31',
            currentStartDate: '2025-01-01',
            currentEndDate: '2025-12-31',
            billabilityType: 'Billable',
            city: 'Bengaluru',
            state: 'Karnataka',
            rate: 1500,
            hours: 160,
            monthHours: 160,
            monthRevenue: 240000,
            prevMonthRevenue: 230000,
            variance: 10000,
            varianceReason: 'Rate increase'
          }
        ]
      },
      mostLikely: {
        totalRevenue: 1350000,
        details: [
          {
            associateId: 'A102',
            name: 'Priya Sharma',
            serviceLine: 'Technology',
            projectId: 'P002',
            projectName: 'Zeus',
            startDate: '2025-02-01',
            endDate: '2025-11-30',
            currentStartDate: '2025-02-01',
            currentEndDate: '2025-11-30',
            billabilityType: 'Billable',
            city: 'Mumbai',
            state: 'Maharashtra',
            rate: 1400,
            hours: 150,
            monthHours: 150,
            monthRevenue: 210000,
            prevMonthRevenue: 200000,
            variance: 10000,
            varianceReason: 'Extra hours',
            confidencePercent: 80 // default confidence
          }
        ]
      },
      upside: {
        totalRevenue: 1500000,
        details: [
          {
            serviceLine: 'Strategy',
            project: 'Hermes',
            totalRevenue: 500000,
            monthlySplit: [100000, 120000, 130000, 150000]
          }
        ]
      },
      bfd: {
        totalRevenue: 1200000,
        details: [
          {
            projectId: 'P003',
            projectName: 'Athena',
            discountPercentage: 0.05, // 5% discount
            monthlyData: [
              { month: 'Jan', grossRevenue: 100000 },
              { month: 'Feb', grossRevenue: 80000 },
              { month: 'Mar', grossRevenue: 90000 },
              { month: 'Apr', grossRevenue: 110000 },
              { month: 'May', grossRevenue: 120000 },
              { month: 'Jun', grossRevenue: 100000 },
              { month: 'Jul', grossRevenue: 95000 },
              { month: 'Aug', grossRevenue: 105000 },
              { month: 'Sep', grossRevenue: 115000 },
              { month: 'Oct', grossRevenue: 125000 },
              { month: 'Nov', grossRevenue: 130000 },
              { month: 'Dec', grossRevenue: 140000 }
            ]
          }
        ]
      }
    };

    setRevenueData(mockData);
  };

  const handleCardClick = (viewType) => {
    if (viewType === 'bfd') {
      navigate('/bfd-details', { state: { bfdData: revenueData.bfd } });
    } else if (viewType === 'baseline') {
      navigate('/baseline-details', { state: { baselineData: revenueData.baseline } });
    } else if (viewType === 'mostLikely') {
      navigate('/mostlikely-details', { state: { mostLikelyData: revenueData.mostLikely } });
    } else if (viewType === 'upside') {
      navigate('/upside-details', { state: { upsideData: revenueData.upside } });
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Revenue Forecast Dashboard</h1>

      <div className="filters">
        <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
          {[2023, 2024, 2025].map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))}>
          {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
        </select>
      </div>

      <div className="summary-cards-wrapper">
        {/* Total Revenue Card */}
        <div className="total-revenue-card card">
          <h3>TOTAL REVENUE</h3>
          <p>₹ {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="summary-cards">
          {['baseline', 'mostLikely', 'upside', 'bfd'].map((type) => (
            <div key={type} className="card" onClick={() => handleCardClick(type)}>
              <h3>{type.toUpperCase()}</h3>
              <p>₹ {revenueData[type]?.totalRevenue?.toLocaleString() || '0'}</p>
            </div>
          ))}
        </div>
      </div>

      {/* {selectedView && (
        <RevenueDetailModal
          viewType={selectedView}
          data={revenueData[selectedView]}
          onClose={() => setSelectedView(null)}
        />
      )} */}
    </div>
  );
};

export default RevenueForecastDashboard;
