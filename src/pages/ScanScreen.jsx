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
  Image as ImageIcon,
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
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  // Detect mobile
  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
  }, []);

  // Haptic feedback
  const triggerHaptic = () => {
    if (navigator.vibrate) navigator.vibrate(50);
  };

  // Open file picker
  const openFilePicker = (useCamera = false) => {
    triggerHaptic();

    fileInputRef.current?.setAttribute(
      "capture",
      useCamera ? "environment" : ""
    );

    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    processImage(file);
  };

  // Process image with Tesseract
  const processImage = async (file) => {
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

      const code = text.trim().replace(/\s+/g, "");
      if (code.length < 3) throw new Error("No valid code detected");

      setScannedCode(code);
      setShowModal(true);
      triggerHaptic();
    } catch (err) {
      setApiError(
        "AI scan failed. Try a clearer, well-lit photo of the NAFDAC code."
      );
    } finally {
      setIsLoading(false);
      setScanProgress("");
      if (fileInputRef.current) fileInputRef.current.value = null;
    }
  };

  // Drag & drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) processImage(file);
  };

  const handleVerify = async () => {
    if (!scannedCode.trim()) return;

    setIsLoading(true);
    setShowModal(false);
    setApiError(null);

    try {
      const result = await verifyCode(scannedCode);
      const { status, ...data } = result;

      if (status === "verified") {
        navigate("/verified", { state: { result: data } });
      } else if (status === "not_found") {
        navigate("/warning", {
          state: { code: scannedCode, drugName: data.name },
        });
      } else if (status === "fake" || status === "reported") {
        navigate("/critical", { state: { result: { ...data, status } } });
      } else {
        setApiError("Unknown response from server.");
      }
    } catch (err) {
      setApiError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hidden but not display:none */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="w-0 h-0 opacity-0 absolute"
        aria-label="Upload drug image"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center px-6 pb-24 relative overflow-hidden">
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

          {/* Progress Card */}
          {isLoading && !showModal && (
            <div className="my-8 p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50">
              <div className="flex flex-col items-center justify-center min-h-24">
                <Loader2 className="w-8 h-8 text-brand-blue animate-spin" />
                <p className="font-medium text-brand-blue text-center mt-2">
                  {scanProgress}
                </p>
              </div>
            </div>
          )}

          {apiError && (
            <div className="my-4 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm animate-shake">
              {apiError}
            </div>
          )}
        </div>

        {/* Upload Zone */}
        <div
          ref={dropZoneRef}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`z-10 w-full max-w-md transition-all duration-300 ${
            dragActive ? "scale-105" : ""
          }`}
        >
          {isMobile ? (
            <div className="flex justify-center gap-6">
              <button
                onClick={() => openFilePicker(true)}
                disabled={isLoading}
                className={`relative group w-24 h-24 rounded-full shadow-2xl transition-all ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-gradient-to-br from-brand-blue to-purple-600"
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30"></div>
                <Camera className="w-12 h-12 text-white relative z-10" />
                <div className="absolute inset-0 rounded-full animate-ping bg-white/30"></div>
              </button>

              <button
                onClick={() => openFilePicker(false)}
                disabled={isLoading}
                className={`relative group w-24 h-24 rounded-full shadow-2xl transition-all ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-gradient-to-br from-green-500 to-emerald-600"
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30"></div>
                <ImageIcon className="w-12 h-12 text-white relative z-10" />
                <div className="absolute inset-0 rounded-full animate-ping bg-white/30"></div>
              </button>
            </div>
          ) : (
            <div className="relative flex justify-center">
              <button
                onClick={() => openFilePicker(false)}
                disabled={isLoading}
                className={`relative group w-28 h-28 rounded-full shadow-2xl transition-all ${
                  isLoading
                    ? "bg-gray-400"
                    : "bg-gradient-to-br from-brand-blue to-purple-600"
                }`}
              >
                <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30"></div>
                <Upload className="w-14 h-14 text-white relative z-10" />
                <div className="absolute inset-0 rounded-full animate-ping bg-white/30"></div>
              </button>

              {dragActive && (
                <div className="absolute inset-0 bg-brand-blue/20 backdrop-blur-sm rounded-3xl border-4 border-dashed border-brand-blue flex items-center justify-center animate-pulse">
                  <p className="text-brand-blue font-bold text-lg">
                    Drop Image Here
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 text-center z-10">
          {isMobile ? (
            <p className="text-sm font-medium text-gray-600">
              Tap <Camera className="inline w-4 h-4" /> to scan or{" "}
              <ImageIcon className="inline w-4 h-4" /> to pick from gallery
            </p>
          ) : (
            <p className="text-sm font-medium text-gray-600 max-w-xs mx-auto">
              Click to upload or{" "}
              <span className="text-brand-blue underline">drag & drop</span> an
              image
            </p>
          )}
        </div>

        {/* Confirm Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6 animate-fade-in">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-slide-up">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-blue" />
                  Code Detected!
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
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
                  spellCheck={false}
                />
              </div>

              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-brand-blue to-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-xl"
              >
                <CheckCircle className="w-6 h-6" />
                Verify Now
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full mt-3 text-gray-600 py-3 rounded-2xl font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <BottomNav />
      </div>
    </>
  );
}
