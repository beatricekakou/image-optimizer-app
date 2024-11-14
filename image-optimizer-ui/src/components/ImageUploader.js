import React, { useState, useRef } from 'react';
import axios from 'axios';

function ImageUploader({ setUploadedImageName, setOriginalImageUrl, setOriginalImageInfo, setOptimizedImageUrl }) {
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        // check if the file size exceeds 25 MB
        const maxSizeInBytes = 25 * 1024 * 1024; // 25 MB in bytes
        if (file.size > maxSizeInBytes) {
            setErrorMessage("File size exceeds the 25 MB limit, please select a smaller file.");
            return;
        }

        // clear error message if file size is valid
        setErrorMessage("");

        setImageFile(file);
        setOriginalImageUrl(URL.createObjectURL(file)); // set preview URL for the original image

        // reset the optimized image on new selection
        setOptimizedImageUrl(null);

        // set original image info
        setOriginalImageInfo({
            size: (file.size / (1024 * 1024)).toFixed(2),
            type: file.type,
        });
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // simulate click on hidden file input
    };

    const handleUpload = async () => {
        if (!imageFile) {
            alert("Please select an image first");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            setLoading(true);
            const uploadResponse = await axios.post(`${process.env.REACT_APP_BASE_URL_BE}/api/images/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const uploadedImageName = uploadResponse.data;
            setUploadedImageName(uploadedImageName);
        } catch (error) {
            console.error("error during image upload:", error);
            alert("An error occurred, please check the console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ margin: "20px", textAlign: "center" }}>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }} // hide the input field
            />
            <button onClick={handleButtonClick} style={{ fontSize: "18px", padding: "10px" }}>
                Choose File
            </button>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} 
            <button
                onClick={handleUpload}
                disabled={loading || !imageFile} // disable if loading or no valid file
                style={{
                    margin: "20px",
                    fontSize: "18px",
                    padding: "10px 20px",
                    cursor: loading || !imageFile ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Uploading..." : "Upload & Optimize"}
            </button>
        </div>
    );
}

export default ImageUploader;
