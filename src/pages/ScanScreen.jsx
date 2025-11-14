// src/pages/ScanScreen.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Camera,
  Upload,
  X,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { verifyCode } from "../api.js";
import { createWorker } from "tesseract.js";
import BottomNav from "../components/BottomNav.jsx";

export default function ScanScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [scannedCode, setScannedCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [scanProgress, setScanProgress] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const fileInputRef = useRef(null);

  // Detect mobile (has camera)
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
  }, []);

  const handleScan = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setApiError(null);
    setScanProgress("AI scanner activated...");

    try {
      const worker = await createWorker("eng");
      await worker.setParameters({
        tessedit_char_whitelist: "0123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      });

      setScanProgress("Reading code from image...");
      const {
        data: { text },
      } = await worker.recognize(file);
      await worker.terminate();

      const code = text.trim();
      if (code.length < 3) throw new Error("No code detected");

      setScannedCode(code);
      setShowModal(true);
    } catch (err) {
      setApiError("AI scan failed. Try a clearer photo.");
    } finally {
      setIsLoading(false);
      setScanProgress("");
      e.target.value = null;
    }
  };

  const handleVerify = async () => {
    if (!scannedCode.trim()) return;

    setIsLoading(true);
    setShowModal(false);
    setApiError(null);

    try {
      const res = await verifyCode(scannedCode);
      const { status, ...data } = res.data;

      if (status === "verified") {
        navigate("/verified", { state: data });
      } else if (status === "not_found") {
        navigate("/warning", { state: data });
      } else if (status === "replay_attack" || status === "reported") {
        navigate("/critical", { state: data });
      } else {
        setApiError("Unknown response");
      }
    } catch (err) {
      setApiError("Server error. Check backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center px-6 pb-24 relative overflow-hidden">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        capture={isMobile ? "environment" : undefined}
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-8 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="text-center max-w-md z-10">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-brand-blue to-purple-600 bg-clip-text text-transparent">
            CheckAm
          </h1>
          <p className="text-lg text-gray-700 mt-3 font-medium">
            AI-powered drug verification
          </p>
        </div>

        {/* Progress */}
        {isLoading && !showModal && (
          <div className="my-8 p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50">
            <div className="flex flex-col items-center justify-center h-full min-h-24">
              <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
              <p className="font-medium text-brand-blue text-center mt-2">
                {scanProgress}
              </p>
            </div>
          </div>
        )}

        {apiError && (
          <div className="my-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
            {apiError}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center space-y-6 z-10">
        {/* Primary Button */}
        <button
          onClick={handleScan}
          disabled={isLoading}
          className={`
            relative group w-24 h-24 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95
            ${
              isLoading
                ? "bg-gray-400"
                : "bg-gradient-to-br from-brand-blue to-purple-600"
            }
          `}
        >
          <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition"></div>
          {isMobile ? (
            <Camera className="w-12 h-12 text-white relative z-10" />
          ) : (
            <Upload className="w-12 h-12 text-white relative z-10" />
          )}
          <div className="absolute inset-0 rounded-full animate-ping bg-white/30"></div>
        </button>

        {/* Label */}
        <p className="text-center text-sm font-medium text-gray-600 max-w-xs">
          {isMobile ? "Tap to scan with camera" : "Click to upload image"}
        </p>

        {/* Secondary Option */}
        {!isMobile && (
          <button
            onClick={handleScan}
            className="text-brand-blue font-medium text-sm underline hover:no-underline transition"
          >
            Or drag & drop image here
          </button>
        )}
      </div>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl transform transition-all animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-brand-blue" />
                <span>Code Detected!</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Please confirm the code:
            </p>

            <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl mb-4">
              <input
                type="text"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
                className="w-full text-center text-2xl font-mono font-bold text-brand-blue bg-transparent outline-none"
                autoFocus
              />
            </div>

            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-brand-blue to-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:shadow-xl transition disabled:opacity-50"
            >
              <CheckCircle className="w-6 h-6" />
              <span>Verify Now</span>
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-3 text-gray-600 py-3 rounded-2xl font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
