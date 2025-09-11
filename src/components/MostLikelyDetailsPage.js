import React, { useState } from 'react';
import '../App.css';

import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

DataTable.use(DT);

const MostLikelyDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mostLikelyData } = location.state || {};

  const initialRows = (mostLikelyData?.details ?? []).map((row) => ({
    ...row,
    confidencePercent: row.confidencePercent ?? 80,
    baseMonthRevenue: row.monthRevenue
  }));

  const [rows, setRows] = useState(initialRows);

  const handleConfidenceChange = (index, value) => {
    let percent = parseFloat(value);
    if (isNaN(percent)) percent = 0;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    setRows((prev) => {
      const updated = [...prev];
      const r = { ...updated[index] };
      r.confidencePercent = percent;
      const base = r.baseMonthRevenue ?? r.monthRevenue;
      r.monthRevenue = Math.round((base * percent) / 100);
      updated[index] = r;
      return updated;
    });
  };

  const columns = [
    { title: 'Associate ID', data: 'associateId' },
    { title: 'Name', data: 'name' },
    { title: 'Service Line', data: 'serviceLine' },
    { title: 'Project ID', data: 'projectId' },
    { title: 'Project Name', data: 'projectName' },
    { title: 'Start Date', data: 'startDate' },
    { title: 'End Date', data: 'endDate' },
    { title: 'Current Start', data: 'currentStartDate' },
    { title: 'Current End', data: 'currentEndDate' },
    { title: 'Billability', data: 'billabilityType' },
    { title: 'City', data: 'city' },
    { title: 'State', data: 'state' },
    { title: 'Rate', data: 'rate' },
    { title: 'Hours', data: 'hours' },
    { title: 'Month Hours', data: 'monthHours' },
    { title: 'Month Revenue', data: 'monthRevenue' },
    {
      title: 'Confidence %',
      data: 'confidencePercent',
      render: (data, type, row, meta) => {
        if (type === 'display') {
          return `<input type="number" min="0" max="100" value="${data ?? 0}" style="width: 80px;" data-row-index="${meta.row}" class="confidence-input" />`;
        }
        return data;
      }
    },
    { title: 'Prev Revenue', data: 'prevMonthRevenue' },
    { title: 'Variance', data: 'variance' },
    { title: 'Reason', data: 'varianceReason' }
  ];

  const noData = !mostLikelyData || !mostLikelyData.details;

  return (
    <div className="details-page">
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
      <h2>Most Likely Details</h2>
      {noData ? (
        <p>No Most Likely data available. Please go back to the dashboard.</p>
      ) : (
        <DataTable
          columns={columns}
          data={rows}
          options={{
            paging: true,
            searching: true,
            info: true,
            createdRow: (row, data, dataIndex) => {
              const input = row.querySelector('input.confidence-input');
              if (input) {
                input.addEventListener('change', (e) => {
                  handleConfidenceChange(dataIndex, e.target.value);
                  e.target.value = String((rows[dataIndex]?.confidencePercent) ?? 0);
                  const revenueCell = row.querySelector('td:nth-child(16)');
                  if (revenueCell) {
                    revenueCell.textContent = String(rows[dataIndex]?.monthRevenue ?? 0);
                  }
                });
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default MostLikelyDetailsPage; 