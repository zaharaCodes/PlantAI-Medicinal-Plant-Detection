import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';

export default function CameraModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [facingMode, setFacingMode] = useState('environment'); // Prefer back camera on mobile
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setCameraError('');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please allow camera permissions or upload an image file.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureSnapshot = () => {
    if (!videoRef.current) return;

    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'camera_capture.jpg', { type: 'image/jpeg' });
        const previewUrl = URL.createObjectURL(blob);
        stopCamera();
        onCapture(file, previewUrl);
        onClose();
      }
    }, 'image/jpeg', 0.92);
  };

  const toggleFacingMode = () => {
    stopCamera();
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="camera-modal-backdrop" onClick={onClose}>
      <div className="camera-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="camera-modal-header">
          <div className="camera-modal-title">
            <Camera size={20} color="#10B981" />
            <span>Live Botanical Viewfinder</span>
          </div>
          <button className="icon-btn-close" onClick={onClose} aria-label="Close Camera">
            <X size={18} />
          </button>
        </div>

        {/* Camera Viewport */}
        <div className="camera-viewport-container">
          {flash && <div className="camera-flash-overlay" />}

          {cameraError ? (
            <div className="camera-error-prompt">
              <AlertCircle size={40} color="#EF4444" />
              <p>{cameraError}</p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="camera-video-stream"
              />
              
              {/* Botanical Leaf Alignment Overlay HUD */}
              <div className="viewfinder-hud">
                <div className="hud-corner top-left" />
                <div className="hud-corner top-right" />
                <div className="hud-corner bottom-left" />
                <div className="hud-corner bottom-right" />
                <div className="hud-crosshair" />
                
                {/* SVG Leaf Outline Guide */}
                <svg className="hud-leaf-guide" viewBox="0 0 100 100">
                  <path
                    d="M50 15 C30 35 25 65 50 85 C75 65 70 35 50 15 Z"
                    fill="none"
                    stroke="rgba(52, 211, 153, 0.45)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                <div className="viewfinder-instruction">
                  Position leaf centered inside the frame
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="camera-modal-footer">
          <button
            type="button"
            className="secondary-btn"
            onClick={toggleFacingMode}
            title="Switch front/back camera"
          >
            <RefreshCw size={16} />
            <span>Switch Lens</span>
          </button>

          <button
            type="button"
            className="shutter-btn"
            onClick={captureSnapshot}
            disabled={!!cameraError}
          >
            <div className="shutter-inner" />
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
