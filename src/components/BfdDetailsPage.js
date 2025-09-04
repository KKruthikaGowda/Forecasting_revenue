import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

DataTable.use(DT);

const BfdDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bfdData } = location.state || {};
  const dataTableRef = useRef(null);

  if (!bfdData || !bfdData.details) {
    return (
      <div className="bfd-details-page">
        <h2>BFD Details</h2>
        <p>No BFD data available. Please go back to the dashboard.</p>
        <button onClick={() => navigate('/')}>Go to Dashboard</button>
      </div>
    );
  }

  const { details } = bfdData;
  const rowData = details[0]; // Assuming only one row for simplicity as in mock data

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const tableData = [];
  if (rowData) {
    const totalGrossRevenue = rowData.monthlyData.reduce((sum, item) => sum + item.grossRevenue, 0);
    const totalDiscount = totalGrossRevenue * (rowData.discountPercentage || 0);
    const totalNetAmount = totalGrossRevenue - totalDiscount;

    const monthlyRevenue = {};
    rowData.monthlyData.forEach(item => {
      monthlyRevenue[item.month] = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(item.grossRevenue);
      
    });

    tableData.push({
      'Project ID': rowData.projectId,
      'Project Name': rowData.projectName,
      ...monthlyRevenue,
      'Total Gross Revenue': new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(totalGrossRevenue),

'Total Discount (5%)': new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(totalDiscount),

'Total Net Amount': new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(totalNetAmount),

    });
  }

  const columns = [
    { title: 'Project ID', data: 'Project ID' },
    { title: 'Project Name', data: 'Project Name' },
    ...months.map(month => ({ title: month, data: month })),
    { title: 'Total Gross Revenue', data: 'Total Gross Revenue' },
    { title: 'Total Discount (5%)', data: 'Total Discount (5%)' },
    { title: 'Total Net Amount', data: 'Total Net Amount' }
  ];

  return (
    <div className="bfd-details-page">
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
      <h2>BFD Details</h2>
      <DataTable
        columns={columns}
        data={tableData}
        options={{ paging: false, searching: false, info: false }}
      />
    </div>
  );
};

export default BfdDetailsPage; 