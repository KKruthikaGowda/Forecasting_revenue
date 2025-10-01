// import React, { useEffect, useRef } from 'react';
// import '../App.css';

// import { useLocation, useNavigate } from 'react-router-dom';
// import DataTable from 'datatables.net-react';
// import DT from 'datatables.net-dt';
// import 'datatables.net-dt/css/dataTables.dataTables.css';


// DataTable.use(DT);

// const BaselineDetailsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { baselineData } = location.state || {};

//   if (!baselineData || !baselineData.details) {
//     return (
//       <div className="details-page">
//         <h2>Baseline Details</h2>
//         <p>No Baseline data available. Please go back to the dashboard.</p>
//         <button onClick={() => navigate('/')}>Go to Dashboard</button>
//       </div>
//     );
//   }

//   const columns = [
//     { title: 'Associate ID', data: 'associateId' },
//     { title: 'Name', data: 'name' },
//     { title: 'Service Line', data: 'serviceLine' },
//     { title: 'Project ID', data: 'projectId' },
//     { title: 'Project Name', data: 'projectName' },
//     { title: 'Start Date', data: 'startDate' },
//     { title: 'End Date', data: 'endDate' },
//     { title: 'Current Start', data: 'currentStartDate' },
//     { title: 'Current End', data: 'currentEndDate' },
//     { title: 'Billability', data: 'billabilityType' },
//     { title: 'City', data: 'city' },
//     { title: 'State', data: 'state' },
//     { title: 'Rate', data: 'rate' },
//     { title: 'Hours', data: 'hours' },
//     { title: 'Month Hours', data: 'monthHours' },
//     { title: 'Month Revenue', data: 'monthRevenue' },
//     { title: 'Prev Revenue', data: 'prevMonthRevenue' },
//     { title: 'Variance', data: 'variance' },
//     { title: 'Reason', data: 'varianceReason' }
//   ];

//   return (
//     <div className="details-page">
//       <button onClick={() => navigate('/')}>Back to Dashboard</button>
//       <h2>Baseline Details</h2>
//       <DataTable
//         columns={columns}
//         data={baselineData.details}
//         options={{ paging: true, searching: true, info: true }}
//       />
//     </div>
//   );
// };

// export default BaselineDetailsPage; 

import React from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

DataTable.use(DT);

const BaselineDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { baselineData } = location.state || {};

  if (!baselineData || !baselineData.details || baselineData.details.length === 0) {
    return (
      <div className="details-page">
        <h2>Baseline Details</h2>
        <p>No Baseline data available. Please go back to the dashboard.</p>
        <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      </div>
    );
  }

  const columns = [
    { title: 'Associate ID', data: 'associateId' },
    { title: 'Name', data: 'name' },
    { title: 'Service Line', data: 'serviceLine' },
    { title: 'Project ID', data: 'projectId' },
    { title: 'Project Name', data: 'projectName' },
    { title: 'Current Start', data: 'currentStart' },
    { title: 'Current End', data: 'currentEnd' },
    { title: 'Billability', data: 'billability' },
    { title: 'City', data: 'city' },
    { title: 'Rate', data: 'rate' },
    { title: 'Hours', data: 'hours' },
    { title: 'Month Hours', data: 'monthHours' },
    { title: 'Month Revenue', data: 'monthRevenue' },
    { title: 'Previous Revenue', data: 'previousRevenue' },
    { title: 'Variance', data: 'variance' }
  ];

  return (
    <div className="details-page">
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <h2>Baseline Details</h2>
      <DataTable
        columns={columns}
        data={baselineData.details}
        options={{ paging: true, searching: true, info: true }}
      />
    </div>
  );
};

export default BaselineDetailsPage;