// import React, { useState } from 'react';
// import '../App.css';

// import { useNavigate } from 'react-router-dom';

// const uploadTypes = [
//   'Cognizant Holiday',
//   'Associate Holiday',
//   'Baseline',
//   'BFD',
//   'Upside'
// ];

// const UploadPage = () => {
//   const navigate = useNavigate();
//   const [files, setFiles] = useState({});

//   const handleFileChange = (type, file) => {
//     setFiles((prev) => ({ ...prev, [type]: file }));
//   };

//   const handleUpload = async (type) => {
//     const file = files[type];
//     if (!file) {
//       alert(`Please select a file for ${type}`);
//       return;
//     }
  
//     const formData = new FormData();
//     const keyMap = {
//       'Baseline': 'baseline',
//       'BFD': 'bfd',
//       'Cognizant Holiday': 'cognizantHoliday',
//       'Associate Holiday': 'associateHoliday'
//     };
  
//     const backendKey = keyMap[type];
//     if (!backendKey) {
//       alert(`${type} upload not supported yet.`);
//       return;
//     }
  
//     formData.append(backendKey, file);
  
//     try {
//       const response = await fetch('http://localhost:8081/upload', {
//         method: 'POST',
//         body: formData
//       });
  
//       const result = await response.text();
//       alert(result);
//     } catch (error) {
//       console.error('Upload failed:', error);
//       alert('Upload failed. Please try again.');
//     }
//   };
  
//   const handleCancel = (type) => {
//     setFiles((prev) => ({ ...prev, [type]: null }));
//   };

//   return (
//     <div className="upload-page">
//       <h2>Upload Excel Files</h2>
//       <div className="upload-cards">
//         {uploadTypes.map((type) => (
//           <div key={type} className="upload-card">
//             <h3>{type}</h3>
//             <input
//               type="file"
//               accept=".xlsx, .xls"
//               onChange={(e) => handleFileChange(type, e.target.files[0])}
//             />
//             {files[type] && <p>Selected: {files[type].name}</p>}
//             <div className="card-buttons">
//               <button onClick={() => handleUpload(type)}>Upload</button>
//               <button onClick={() => handleCancel(type)}>Cancel</button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="navigation-buttons">
//         <button onClick={() => navigate('/')}>Back</button>
//         <button onClick={() => navigate('/dashboard')}>View Dashboard</button>
//       </div>
//     </div>
//   );
// };

// export default UploadPage;


import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const uploadTypes = [
  'Cognizant Holiday',
  'Associate Holiday',
  'Baseline',
  'BFD',
  'Upside'
];

const UploadPage = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState({});
  const [uploadStatus, setUploadStatus] = useState({});

  const handleFileChange = (type, file) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
    setUploadStatus((prev) => ({ ...prev, [type]: null }));
  };

  const handleUpload = async (type) => {
    const file = files[type];
    if (!file) {
      alert(`Please select a file for ${type}`);
      return;
    }

    const keyMap = {
      'Baseline': 'baseline',
      'BFD': 'bfd',
      'Cognizant Holiday': 'cognizantHoliday',
      'Associate Holiday': 'associateHoliday'
    };

    const backendKey = keyMap[type];
    if (!backendKey) {
      alert(`${type} upload is not supported yet.`);
      return;
    }

    const formData = new FormData();
    formData.append(backendKey, file);

    try {
      const response = await fetch('http://localhost:8081/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.text();
      setUploadStatus((prev) => ({ ...prev, [type]: 'success' }));
      alert(`${type} uploaded successfully! You can now view it in the dashboard.`);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus((prev) => ({ ...prev, [type]: 'error' }));
      alert('Upload failed. Please try again.');
    }
  };

  const handleCancel = (type) => {
    setFiles((prev) => ({ ...prev, [type]: null }));
    setUploadStatus((prev) => ({ ...prev, [type]: null }));
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
              disabled={type === 'Upside'}
            />
            {files[type] && <p>Selected: {files[type].name}</p>}
            <div className="card-buttons">
              <button
                onClick={() => handleUpload(type)}
                disabled={type === 'Upside'}
              >
                Upload
              </button>
              <button onClick={() => handleCancel(type)}>Cancel</button>
            </div>
            {uploadStatus[type] === 'success' && (
              <p style={{ color: 'green' }}>✅ Uploaded successfully</p>
            )}
            {uploadStatus[type] === 'error' && (
              <p style={{ color: 'red' }}>❌ Upload failed</p>
            )}
            {type === 'Upside' && (
              <p style={{ color: 'gray' }}>⚠️ Upload not supported yet</p>
            )}
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