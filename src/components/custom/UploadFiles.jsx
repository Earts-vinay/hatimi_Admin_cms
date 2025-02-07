'use client';
import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CiCircleRemove } from "react-icons/ci";

const FileSvgDraw = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <svg
        width="40"
        height="40"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
        style={{ marginBottom: '8px', color: '#4A4A4A' }}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <Typography
        variant="body1"
        sx={{
          fontWeight: 600,
          color: '#4A4A4A',
          marginBottom: '4px',
        }}
      >
        Click to upload
        <Typography
          component="span"
          sx={{
            fontWeight: 400,
            marginLeft: '4px',
          }}
        >
          or drag and drop
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: '0.9rem',
          color: '#6C757D',
        }}
      >
        SVG, PNG, JPG or GIF
      </Typography>
    </Box>
  );
};

const FileUploadDropzone = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).filter(
      (file) => file.size <= 1 * 1024 * 1024 // Max size: 1MB
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files).filter(
      (file) => file.type.startsWith('image/') && file.size <= 1 * 1024 * 1024
    );
    setFiles([...files, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ width: '400px', margin: 'auto' }}>
      <Box
        sx={{
          border: '2px dashed #D3D3D3',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: '#FFF',
          padding: '24px',
          cursor: 'pointer',
          '&:hover': {
            borderColor: '#B0B0B0',
          },
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <FileSvgDraw />
        <input
          type="file"
          accept="image/*"
          multiple
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            cursor: 'pointer',
          }}
          onChange={handleFileChange}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '16px',
        }}
      >
        {files.map((file, index) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '150px',
              height: '150px',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid #E0E0E0',
            }}
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
           <Box
           onClick={() => handleDelete(index)}
           sx={{
             position: 'absolute',
             top: '3px',
             right: '8px',
          
             width: '10px',
            
           }}>
<CiCircleRemove sx={{backgroundColor:"#000",fontSize:"18px"}}/>
           </Box>
             
           
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FileUploadDropzone;
