import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

DataTable.use(DT);

const UpsideDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { upsideData } = location.state || {};

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  if (!upsideData || !upsideData.details) {
    return (
      <div className="details-page">
        <h2>Upside Details</h2>
        <p>No Upside data available. Please go back to the dashboard.</p>
        <button onClick={() => navigate('/')}>Go to Dashboard</button>
      </div>
    );
  }

  // Format data before passing to DataTable
  const formattedData = upsideData.details.map((item) => ({
    ...item,
    totalRevenue: formatCurrency(item.totalRevenue),
    monthlySplit: item.monthlySplit.map(formatCurrency),
  }));

  const columns = [
    { title: 'Service Line', data: 'serviceLine' },
    { title: 'Project', data: 'project' },
    { title: 'Total Revenue', data: 'totalRevenue' },
    {
      title: 'Monthly Split',
      data: 'monthlySplit',
      render: (data) => data.join(', ')
    }
  ];

  return (
    <div className="details-page">
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
      <h2>Upside Details</h2>
      <DataTable
        columns={columns}
        data={formattedData}
        options={{ paging: true, searching: true, info: true }}
      />
    </div>
  );
};

export default UpsideDetailsPage;
