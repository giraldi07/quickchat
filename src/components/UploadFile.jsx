// src/components/UploadFile.jsx
import React, { useState } from 'react';
import { uploadFile } from '../features/messageArea/apiMessages';

const UploadFile = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      const filePath = await uploadFile(file);
      if (filePath) {
        onFileUpload(filePath); // Kirim path file ke parent (komponen chat)
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadFile;
