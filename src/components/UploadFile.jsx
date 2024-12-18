import React, { useState } from "react";

function UploadFile({ onFileSelect }) {
  const [file, setFile] = useState(null); // State to store the selected file
  const [error, setError] = useState(""); // State to store any error message related to file selection

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // Validate file type (image, video, or document)
      const validTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf", "application/msword"];
      if (!validTypes.includes(selectedFile.type)) {
        setError("Unsupported file type. Please select an image, PDF, or Word document.");
        setFile(null);
      } else {
        setError(""); // Clear any previous error
        setFile(selectedFile);
        onFileSelect(selectedFile); // Pass the file to parent component via callback
      }
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        id="fileInput"
        accept="image/*,application/pdf,application/msword"
        className="hidden"
        onChange={handleFileChange}
      />
      {/* File upload button */}
      <label htmlFor="fileInput" className="cursor-pointer">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Attach File
        </button>
      </label>

      {/* Display the selected file name */}
      {file && (
        <div className="mt-2 text-sm text-gray-600 dark:text-white">
          <span>{file.name}</span>
        </div>
      )}

      {/* Display error message if file type is invalid */}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}

export default UploadFile;
