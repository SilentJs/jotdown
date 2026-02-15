'use client'
import React, { useRef } from "react";
import { useState } from "react";
import './global.css'
import styles from './dashboard/order/order.module.css'
import { serverUrl } from "./types";

export default function Fileupload({ onUploadChange }){
    const [ file,setFile ]=useState(null)
    const [completed,setCompleted]=useState(false)
    const [failed,setFailed]=useState(false)
    const [ completionPercentage , setCompletionPercentage ]=useState(null)
    const uploadRef = useRef(null)
    function handleFile(event){
        setFile(event.target.files[0])
        console.log(event.target.files[0])
        
    }
    function handleUpload(e){
        e.preventDefault()
        setFailed(false)
        const formData = new FormData()
        formData.append('file',file)
        if(!uploadRef.current.value) return;
        const xhr = new XMLHttpRequest();

        // Track the progress of the upload
        xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.log(`Upload progress: ${percentComplete.toFixed(2)}%`);
            setCompletionPercentage(percentComplete.toFixed(2))
            if(percentComplete.toFixed(2)==='100.00') setCompleted(true)
        }
        });

        // Handle the completion of the upload
        xhr.addEventListener('load', () => {
        // Handle the response when the upload is complete
        
        const result = JSON.parse(xhr.responseText);
            console.log(result);
            // Call your function to handle the result
            if(result.uploadName==='ERROR'){setFailed(true);setCompleted(false)} 
            onUploadChange(result);
        });

        // Handle errors during the upload
        xhr.addEventListener('error', () => {
        console.error('Error occurred during upload.');
        });

        // Set up the request
        xhr.open('POST', serverUrl+'upload', true);

        // Send the FormData with the XMLHttpRequest
        xhr.send(formData);

        // Clear the input value after the request is sent
            // uploadRef.current.value=''
    }
    return(
        <div>
            <form onSubmit={handleUpload} className={styles.handleUpload}>
                <input type="file" name="file" ref={uploadRef} onChange={handleFile} />
                {completionPercentage && <div className="completionPercentage">{completionPercentage}%</div>}
                {completed ? 'Done' : <button className="uploadButton">Upload</button>}
                {failed && <div className={styles.errorMsg}>Failed Max file size is 40MB</div>}
            </form>
        </div>
    )
}