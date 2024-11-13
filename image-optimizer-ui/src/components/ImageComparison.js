import React from 'react';

function ImageComparison({ originalImageUrl, optimizedImageUrl, originalImageInfo, optimizedImageInfo }) {
    return (
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginTop: "40px" }}>
            {originalImageUrl && (
                <div style={{ textAlign: "center" }}>
                    <h3>Original Image</h3>
                    <img src={originalImageUrl} alt="Original" style={{ maxWidth: "400px", height: "auto", borderRadius: "8px" }} />
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
                    <img src={optimizedImageUrl} alt="Optimized" style={{ maxWidth: "400px", height: "auto", borderRadius: "8px" }} />
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
