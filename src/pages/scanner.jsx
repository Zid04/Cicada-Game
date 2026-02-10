import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";
import { winnersData } from "../data/winnerData";

export default function ScannerPage() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [manualCode, setManualCode] = useState("");
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState(null);
  const [laserPos, setLaserPos] = useState(0);

  const handleCode = (raw) => {
    if (!raw) {
      setError("Invalid code. Please try again.");
      return;
    }
    const code = raw.trim().toUpperCase();
    
    // Check if it's a registered winner code
    if (winnersData[code]) {
      setWinner(winnersData[code]);
    } else {
      // Display any QR code content
      setWinner({
        title: "📱 QR Code Scanned 📱",
        image: null,
        content: raw,
        advices: ["QR code content: " + raw]
      });
    }
    setManualCode("");
  };

  const handleManualSubmit = () => handleCode(manualCode);
  const handleKeyPress = (e) => { if (e.key === "Enter") handleManualSubmit(); };

  useEffect(() => {
    let rafId;
    let mounted = true;
    let stream;

    const stopStream = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };

    const scanLoop = () => {
      if (!mounted || !videoRef.current) return;

      const video = videoRef.current;
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const result = jsQR(imageData.data, imageData.width, imageData.height);
          if (result) {
            handleCode(result.data);
            return; //  stop scanning after a successful read
          }
        } catch {}
      }

      rafId = requestAnimationFrame(scanLoop);
    };

    const initScanner = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (!mounted || !videoRef.current) return;

        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => { /* ignore AbortError */ });

        scanLoop();
      } catch (err) {
        console.error("Camera error:", err);
      }
    };

    initScanner();

    return () => {
      mounted = false;
      stopStream();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Animate laser position continuously
  useEffect(() => {
    if (winner) return; // Stop laser animation when showing winner
    
    let animationFrameId;
    let startTime = Date.now();
    
    const animateLaser = () => {
      const elapsed = (Date.now() - startTime) % 20000; // 20s cycle
      const position = elapsed < 10000 
        ? (elapsed / 10000) * 100  // 0 to 100% in first 10s
        : ((20000 - elapsed) / 10000) * 100; // 100 to 0% in next 10s
      
      setLaserPos(position);
      animationFrameId = requestAnimationFrame(animateLaser);
    };
    
    animationFrameId = requestAnimationFrame(animateLaser);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [winner]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
      <h1 className="text-3xl text-pink-400 mb-5">CICADA-3302 Scanner</h1>

      {!winner && (
        <>
          <div className="relative w-full max-w-lg mb-5 overflow-hidden rounded-lg border border-gray-700">
            <video ref={videoRef} className="w-full"></video>
            <div
              className="absolute left-0 w-full h-1 bg-red-500 opacity-75"
              style={{
                top: `${laserPos}%`,
              }}
            ></div>
          </div>

          <div className="w-full max-w-lg flex gap-2">
            <input
              type="text"
              placeholder="Enter your code here"
              className="flex-1 p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-pink-400"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="px-4 py-2 bg-pink-400 text-gray-900 font-bold rounded hover:bg-pink-500"
              onClick={handleManualSubmit}
            >
              Submit
            </button>
          </div>
          
          <button
            className="mt-4 px-4 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-600"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </>
      )}

      {winner && (
        <div className="mt-5 max-w-lg bg-gray-800 p-5 rounded-lg flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl text-pink-400">{winner.title}</h2>
          {winner.image && <img src={winner.image} alt={winner.title} className="w-64 h-64 object-cover rounded-lg" />}
          {winner.content && !winner.image && (
            <div className="mt-3 p-3 bg-gray-700 rounded text-pink-300 break-all max-h-40 overflow-auto">
              <strong>Code:</strong> {winner.content}
              {winner.content.match(/^https?:\/\//) && (
                <div className="mt-2">
                  <a
                    href={winner.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Open Link ↗
                  </a>
                </div>
              )}
            </div>
          )}
          <ul className="mt-3 list-disc list-inside text-gray-200">
            {winner.advices.map((advice, idx) => <li key={idx}>{advice}</li>)}
          </ul>
          <div className="mt-4 flex gap-3">
            <button
              className="px-4 py-2 bg-pink-400 text-gray-900 font-bold rounded hover:bg-pink-500"
              onClick={() => setWinner(null)}
            >
              Scan Again
            </button>
            <button
              className="px-4 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-600"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg shadow-xl max-w-sm">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-red-400">Error</h2>
              <button
                className="text-gray-400 hover:text-white text-2xl"
                onClick={() => setError(null)}
              >
                ✕
              </button>
            </div>
            <p className="mb-4">{error}</p>
            <button
              className="w-full px-4 py-2 bg-pink-400 text-gray-900 font-bold rounded hover:bg-pink-500"
              onClick={() => setError(null)}
            >
              Close & Scan Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
