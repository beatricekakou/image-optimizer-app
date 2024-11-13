import React from 'react';

function ImageComparison({ originalImageUrl, optimizedImageUrl, originalImageInfo, optimizedImageInfo }) {
    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
            {originalImageUrl && (
                <div style={{ textAlign: "center" }}>
                    <h3>Original Image</h3>
                    <img src={originalImageUrl} alt="Original" style={{ maxWidth: "300px", height: "auto" }} />
                    {originalImageInfo && (
                        <div>
                            <p><strong>Size:</strong> {originalImageInfo.size} bytes</p>
                            <p><strong>Type:</strong> {originalImageInfo.type}</p>
                        </div>
                    )}
                </div>
            )}
            {optimizedImageUrl && (
                <div style={{ textAlign: "center" }}>
                    <h3>Optimized Image</h3>
                    <img src={optimizedImageUrl} alt="Optimized" style={{ maxWidth: "300px", height: "auto" }} />
                    {optimizedImageInfo && (
                        <div>
                            <p><strong>Size:</strong> {optimizedImageInfo.size} bytes</p>
                            <p><strong>Type:</strong> {optimizedImageInfo.type}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ImageComparison;
