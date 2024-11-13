import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader({ setUploadedImageName, setOriginalImageUrl, setOriginalImageInfo, setOptimizedImageUrl }) {
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setOriginalImageUrl(URL.createObjectURL(file)); // set preview URL for the original image

        // reset the optimized image on new selection
        setOptimizedImageUrl(null);

        // set original image info
        setOriginalImageInfo({
            size: file.size,
            type: file.type,
        });
    };

    const handleUpload = async () => {
        if (!imageFile) {
            alert("Please select an image first");
            return;
        }
        debugger;
        const formData = new FormData();
        formData.append("image", imageFile);
        const apiUrl = "http://localhost:8080";
        try {
            setLoading(true);
            const uploadResponse = await axios.post(`${apiUrl}/api/images/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const uploadedImageName = uploadResponse.data;
            setUploadedImageName(uploadedImageName);
        } catch (error) {
            console.error("Error during image upload:", error);
            alert("An error occurred. Check the console for details.");
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
                style={{ fontSize: "18px", padding: "10px" }}
            />
            <button
                onClick={handleUpload}
                disabled={loading}
                style={{
                    margin: "20px",
                    fontSize: "18px",
                    padding: "10px 20px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Uploading..." : "Upload & Optimize"}
            </button>
        </div>
    );
}

export default ImageUploader;
