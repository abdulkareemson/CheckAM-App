// src/pages/ScanScreen.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, CheckCircle } from "lucide-react";
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

  const fileInputRef = useRef(null);

  const handleCameraScan = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setApiError(null);
    setScanProgress("Starting AI scanner...");

    try {
      const worker = await createWorker("eng");
      await worker.setParameters({
        tessedit_char_whitelist: "0123456789-ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      });

      setScanProgress("Reading text from image...");
      const {
        data: { text },
      } = await worker.recognize(file);
      await worker.terminate();

      const code = text.trim();
      if (code.length < 3) throw new Error("No code detected");

      setScannedCode(code);
      setShowModal(true);
    } catch (err) {
      console.error("OCR Error:", err);
      setApiError("AI scan failed. Try taking a clearer photo.");
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
        setApiError("Unknown response from server");
      }
    } catch (err) {
      console.error("API Error:", err);
      setApiError("Server error. Is backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 pb-24">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Main Content */}
      <div className="text-center max-w-sm">
        <h1 className="text-3xl font-bold text-brand-blue mb-2">CheckAm</h1>
        <p className="text-gray-600 mb-8">
          Scan product code to verify authenticity
        </p>

        {isLoading && !showModal && (
          <div className="my-6 text-brand-blue">
            <p className="font-medium">{scanProgress || "Verifying..."}</p>
          </div>
        )}

        {apiError && <p className="text-brand-red text-sm mb-4">{apiError}</p>}
      </div>

      {/* Camera Button */}
      <button
        onClick={handleCameraScan}
        disabled={isLoading}
        className="bg-brand-blue text-white w-20 h-20 rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl transition disabled:opacity-50"
      >
        <Camera className="w-10 h-10" />
      </button>

      <p className="mt-6 text-center text-sm text-gray-500 max-w-xs">
        Tap the camera to scan. AI will read the code automatically.
      </p>

      {/* Confirm Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Confirm Code</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Please verify the detected code:
            </p>

            <input
              type="text"
              value={scannedCode}
              onChange={(e) => setScannedCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl text-lg font-mono text-center mb-4 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              autoFocus
            />

            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-700 transition disabled:opacity-50"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verify This Code</span>
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 text-gray-600 py-2 rounded-xl hover:bg-gray-100 transition"
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
