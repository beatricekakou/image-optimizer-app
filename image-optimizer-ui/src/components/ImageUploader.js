import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader({ setUploadedImageName, setOriginalImageUrl, setOriginalImageInfo }) {
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        setOriginalImageUrl(URL.createObjectURL(file)); // set preview URL for the original image

        // set original image info
        setOriginalImageInfo({
            name: file.name,
            size: file.size, // in bytes
            type: file.type
        });
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
            const uploadResponse = await axios.post("http://localhost:8080/api/images/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let uploadedImageName = uploadResponse.data;
            
            setUploadedImageName(uploadedImageName);
        } catch (error) {
            console.error("Error during image upload:", error);
            alert("An error occurred. Check the console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload} disabled={loading} style={{ margin: "20px" }}>
                {loading ? "Uploading..." : "Upload & Optimize"}
            </button>
        </div>
    );
}

export default ImageUploader;
