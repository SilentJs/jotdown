import React, { useState } from 'react';

const JsonDownloadButton = ({jsonData,jsonKey}:{jsonData:any,jsonKey?:string}) => {
  
    const handleDownload = () => {
        // Convert JSON object to string
        const jsonString = JSON.stringify(jsonData);
        
        // Create a Blob object containing the JSON data
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(blob);
        
        // Create a link element to trigger the download
        const link = document.createElement('a');
        const fileName = jsonKey ? jsonData[jsonKey] : 'file';
        link.href = url;
        link.download = `${fileName}.json`;
        
        // Simulate a click on the link element to trigger the download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup: remove the link and revoke the URL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    };
  
  return(
    <button className='jsonDownloadButton' onClick={handleDownload}>Download JSON</button>
  )
};

export default JsonDownloadButton;