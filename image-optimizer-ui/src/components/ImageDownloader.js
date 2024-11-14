import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageDownloader({ uploadedImageName, setOptimizedImageUrl, setOptimizedImageInfo }) {
    const [loading, setLoading] = useState(true);
    const maxRetries = 20; //max retries num

    useEffect(() => {
        let timeoutCounter = 0;

        const pollForOptimizedImage = () => {
            const interval = setInterval(async () => {
                if (timeoutCounter >= maxRetries) {
                    console.error("maximum retries reached. stopping attempts to retrieve optimized image.");
                    clearInterval(interval);
                    setLoading(false);
                    alert("Unable to retrieve optimized image, please try again later.");
                    return;
                }

                try {
                    const apiUrl = `{process.env.BASE_URL_BE}/azurewebsites.net`;
                    const response = await axios.get(`${process.env.REACT_APP_BASE_URL_BE}/api/images/optimized/${uploadedImageName}`, {
                        responseType: "arraybuffer",
                    });

                    const blob = new Blob([response.data], { type: 'image/webp' });
                    const imageUrl = URL.createObjectURL(blob);
                    setOptimizedImageUrl(imageUrl);

                    // set optimized image info
                    setOptimizedImageInfo({
                        size: (response.data.byteLength / (1024 * 1024)).toFixed(2),
                        type: 'image/webp',
                    });

                    setLoading(false); // stop loading when image is ready
                    clearInterval(interval); // stop polling
                } catch (error) {
                    if (error.response && error.response.status !== 404) {
                        console.error("error retrieving optimized image:", error);
                        clearInterval(interval);
                        alert("An error occurred, check the console for details.");
                        setLoading(false);
                    }
                }

                timeoutCounter++; // incrementing the retries counter
            }, 3000); // poll every 3 seconds
        };

        if (uploadedImageName) {
            setLoading(true);
            pollForOptimizedImage();
        }

        return () => clearInterval(pollForOptimizedImage);
    }, [uploadedImageName, setOptimizedImageUrl, setOptimizedImageInfo]);

    return loading ? <div>Loading optimized image...</div> : null;
}

export default ImageDownloader;