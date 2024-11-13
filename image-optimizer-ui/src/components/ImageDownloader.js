import React, { useEffect } from 'react';
import axios from 'axios';

function ImageDownloader({ uploadedImageName, setOptimizedImageUrl, setOptimizedImageInfo }) {
    useEffect(() => {
        const pollForOptimizedImage = () => {
            const interval = setInterval(async () => {
                try {
                    debugger;
                    const response = await axios.get(`http://localhost:8080/api/images/optimized/${uploadedImageName}`, {
                        responseType: "arraybuffer",
                    });

                    const blob = new Blob([response.data], { type: 'image/webp' });
                    const imageUrl = URL.createObjectURL(blob);
                    setOptimizedImageUrl(imageUrl);

                    // set optimized image info
                    setOptimizedImageInfo({
                        size: response.data.byteLength,
                        type: 'image/webp'
                    });

                    clearInterval(interval); // stop polling once the image is ready
                } catch (error) {
                    if (error.response && error.response.status !== 404) {
                        console.error("Error retrieving optimized image:", error);
                        clearInterval(interval);
                        alert("An error occurred. Check the console for details.");
                    }
                }
            }, 2000); // poll every 2 seconds
        };

        if (uploadedImageName) {
            pollForOptimizedImage();
        }
    }, [uploadedImageName, setOptimizedImageUrl, setOptimizedImageInfo]);

    return null; // this component only performs polling and does not render anything
}

export default ImageDownloader;
