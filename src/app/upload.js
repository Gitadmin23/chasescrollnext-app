import React, { useState } from 'react'
import AWSHook from '../hooks/awsHook';


const Upload = () => {

    const [files, setFiles] = useState([])
    const [filePreviews, setFilePreviews] = useState([]);

    const { loading, uploadedFile, fileUploadHandler } = AWSHook()


    const onChangeHandler = (e) => {
        const { name, files } = e.target
        setFiles(files)


        const previews = Array.from(files).map((file) => ({
            name: file.name,
            size: file.size * 1 / (1024 * 1024)
        }));
        setFilePreviews(previews);
    }

    return (
        <div>
            <p>Upload to AMS S3 Bucket</p>

            <input type="file" name="files" onChange={onChangeHandler} multiple />

            <div>

                {filePreviews.map((file, idx) => (
                    <div key={`file__${idx}`}>
                        <p>File: {file?.name}</p>
                        <p>Size: {file?.size} mb</p>
                    </div>
                ))}

                <button disabled={!filePreviews.length > 0 || loading} className='btn btn-primary' onClick={() => fileUploadHandler(files)}>
                    {loading ? "Uploading..." : "Upload"}
                </button>

                <p>-------------- Uploded File ----------------</p>

                {uploadedFile.map((file, idx) => (
                    <div key={`uploadedFile__${idx}`}>
                        <p>File: {file?.file}</p>
                        <p>Type: {file?.url}</p>
                    </div>
                ))}
            </div>


        </div>
    )
}

export default Upload