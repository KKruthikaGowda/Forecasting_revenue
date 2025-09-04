import React from 'react';

const RevenueDetailModal = ({ viewType, data, onClose }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  const renderTable = () => {
    if (!data || data.length === 0) {
      return <p>No data to display.</p>;
    }

    const headers = Object.keys(data[0]);

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {headers.map((key) => {
                const value = row[key];
                const isCurrencyField =
                  key.toLowerCase().includes('revenue') ||
                  key.toLowerCase().includes('amount') ||
                  key.toLowerCase().includes('rate');

                return (
                  <td key={key}>
                    {isCurrencyField && typeof value === 'number'
                      ? formatCurrency(value)
                      : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
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
