import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageDownloader({ uploadedImageName, setOptimizedImageUrl, setOptimizedImageInfo }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pollForOptimizedImage = () => {
            const interval = setInterval(async () => {
                const maxTimeOutCounter = 5;
                let timeoutCounter = 0;
                try {
                    const apiUrl = "http://localhost:8080";
                    const response = await axios.get(`${apiUrl}/api/images/optimized/${uploadedImageName}`, {
                        responseType: "arraybuffer",
                    });
                    timeoutCounter++;

                    const blob = new Blob([response.data], { type: 'image/webp' });
                    const imageUrl = URL.createObjectURL(blob);
                    setOptimizedImageUrl(imageUrl);

                    // set optimized image info
                    setOptimizedImageInfo({
                        size: response.data.byteLength,
                        type: 'image/webp',
                    });

                    setLoading(false); // stop loading when image is ready
                    clearInterval(interval); // stop polling
                } catch (error) {
                    if ((error.response && error.response.status !== 404) || timeoutCounter == maxTimeOutCounter) {
                        console.error("Error retrieving optimized image:", error);
                        clearInterval(interval);
                        alert("An error occurred. Check the console for details.");
                        setLoading(false);
                    }
                }
            }, 2000); // poll every 2 seconds
        };

        if (uploadedImageName) {
            setLoading(true);
            pollForOptimizedImage();
        }
    }, [uploadedImageName, setOptimizedImageUrl, setOptimizedImageInfo]);

    return loading ? <div>Loading optimized image...</div> : null;
}

export default ImageDownloader;
