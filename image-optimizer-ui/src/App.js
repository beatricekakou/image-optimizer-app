import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ImageDownloader from './components/ImageDownloader';
import ImageComparison from './components/ImageComparison';

function App() {
    const [uploadedImageName, setUploadedImageName] = useState(null);
    const [originalImageUrl, setOriginalImageUrl] = useState(null);
    const [optimizedImageUrl, setOptimizedImageUrl] = useState(null);
    const [originalImageInfo, setOriginalImageInfo] = useState(null);
    const [optimizedImageInfo, setOptimizedImageInfo] = useState(null);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Image Optimizer</h1>
            <ImageUploader 
                setUploadedImageName={setUploadedImageName} 
                setOriginalImageUrl={setOriginalImageUrl} 
                setOriginalImageInfo={setOriginalImageInfo}
                setOptimizedImageUrl={setOptimizedImageUrl} // reset optimized image URL
            />
            {uploadedImageName && (
                <ImageDownloader 
                    uploadedImageName={uploadedImageName} 
                    setOptimizedImageUrl={setOptimizedImageUrl} 
                    setOptimizedImageInfo={setOptimizedImageInfo} 
                />
            )}
            <ImageComparison 
                originalImageUrl={originalImageUrl} 
                optimizedImageUrl={optimizedImageUrl} 
                originalImageInfo={originalImageInfo} 
                optimizedImageInfo={optimizedImageInfo} 
            />
        </div>
    );
}

export default App;
