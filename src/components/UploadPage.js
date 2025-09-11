import React, { useState } from 'react';
import '../App.css';

import { useNavigate } from 'react-router-dom';

const uploadTypes = [
  'Cognizant Holiday',
  'Associate Holiday',
  'Baseline',
  'BFD',
  'Upside',
  'Most Likely'
];

const UploadPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({});

  const handleFileChange = (type, file) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
  };

  const handleUpload = (type) => {
    const file = files[type];
    if (file) {
      console.log(`Uploading ${type}:`, file.name);
      // Add actual upload logic here
    } else {
      alert(`Please select a file for ${type}`);
    }
  };

  const handleCancel = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
  };

  return (
    <div className="upload-page">
      <h2>Upload Excel Files</h2>
      <div className="upload-cards">
        {uploadTypes.map((type) => (
          <div key={type} className="upload-card">
            <h3>{type}</h3>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => handleFileChange(type, e.target.files[0])}
            />
            {files[type] && <p>Selected: {files[type].name}</p>}
            <div className="card-buttons">
              <button onClick={() => handleUpload(type)}>Upload</button>
              <button onClick={() => handleCancel(type)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/')}>Back</button>
        <button onClick={() => navigate('/dashboard')}>View Dashboard</button>
      </div>
    </div>
  );
};

export default UploadPage;
