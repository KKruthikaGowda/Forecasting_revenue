import React from 'react';

const RevenueDetailModal = ({ viewType, data, onClose }) => {
  const renderTable = () => {
    if (viewType === 'baseline' || viewType === 'mostLikely') {
      return (
        <table>
          <thead>
            <tr>
              <th>Associate ID</th><th>Name</th><th>Service Line</th><th>Project ID</th>
              <th>Project Name</th><th>Start Date</th><th>End Date</th>
              <th>Current Start</th><th>Current End</th><th>Billability</th>
              <th>City</th><th>State</th><th>Rate</th><th>Hours</th>
              <th>Month Hours</th><th>Month Revenue</th>
              <th>Prev Revenue</th><th>Variance</th><th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {data?.details?.map((row, i) => (
              <tr key={i}>
                <td>{row.associateId}</td><td>{row.name}</td><td>{row.serviceLine}</td>
                <td>{row.projectId}</td><td>{row.projectName}</td><td>{row.startDate}</td>
                <td>{row.endDate}</td><td>{row.currentStartDate}</td><td>{row.currentEndDate}</td>
                <td>{row.billabilityType}</td><td>{row.city}</td><td>{row.state}</td>
                <td>{row.rate}</td><td>{row.hours}</td><td>{row.monthHours}</td>
                <td>{row.monthRevenue}</td><td>{row.prevMonthRevenue}</td>
                <td>{row.variance}</td><td>{row.varianceReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (viewType === 'upside') {
      return (
        <table>
          <thead>
            <tr><th>Service Line</th><th>Project</th><th>Total Revenue</th><th>Monthly Split</th></tr>
          </thead>
          <tbody>
            {data?.details?.map((row, i) => (
              <tr key={i}>
                <td>{row.serviceLine}</td><td>{row.project}</td><td>{row.totalRevenue}</td>
                <td>{row.monthlySplit.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <h2>{viewType.toUpperCase()} Details</h2>
      {renderTable()}
    </div>
  );
};

export default RevenueDetailModal;
