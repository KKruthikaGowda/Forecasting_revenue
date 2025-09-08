import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();
  const [cognizantUploaded, setCognizantUploaded] = useState(false);
  const [files, setFiles] = useState({
    cognizant: null,
    associate: null,
    baseline: null,
    bfd: null,
    upside: null,
    mostlikely: null,
  });

  const handleFileChange = (type, file) => {
    if (type !== 'cognizant' && !cognizantUploaded) {
      alert('Please upload Cognizant Holiday sheet first.');
      return;
    }
    setFiles((prev) => ({ ...prev, [type]: file }));
    if (type === 'cognizant') setCognizantUploaded(true);
  };

  const handleCancel = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
    if (type === 'cognizant') setCognizantUploaded(false);
  };

  const handleShowData = () => {
    console.log('Uploaded files:', files);
    navigate('/dashboard');
  };

  const uploadCards = [
    { key: 'cognizant', label: 'Cognizant Holiday' },
    { key: 'associate', label: 'Associate Holiday' },
    { key: 'baseline', label: 'Baseline' },
    { key: 'bfd', label: 'BFD' },
    { key: 'upside', label: 'Upside' },
    { key: 'mostlikely', label: 'Most Likely' },
  ];

  return (
    <div className="upload-page">
      <h2>Upload Revenue Forecast Sheets</h2>
      <div className="upload-cards">
        {uploadCards.map(({ key, label }) => (
          <div key={key} className="upload-card">
            <h3>{label}</h3>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileChange(key, e.target.files[0])}
            />
            <div className="card-actions">
              <button
                onClick={() => {
                  if (files[key]) {
                    alert(`${label} sheet already selected.`);
                  } else {
                    alert(`Please select a file to upload for ${label}.`);
                  }
                }}
              >
                Upload
              </button>
              <button onClick={() => handleCancel(key)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
      <div className="upload-actions">
        <button onClick={() => navigate('/')}>Back</button>
        <button onClick={handleShowData}>Show Data</button>
      </div>
    </div>
  );
};

export default UploadPage;
