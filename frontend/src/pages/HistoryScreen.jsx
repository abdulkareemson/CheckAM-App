// src/pages/HistoryScreen.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import BottomNav from "../components/BottomNav.jsx";
import { getHistory } from "../api.js"; // You'll create this

export default function HistoryScreen() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getHistory();
      setScans(res.data || []);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-6 pt-12 pb-4 shadow-sm flex items-center justify-between">
        <h1 className="text-3xl font-bold text-brand-blue">History</h1>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Grid */}
      <div className="px-6">
        {loading ? (
          <div className="text-center py-10">
            <div className="w-10 h-10 border-4 border-brand-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : scans.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No scan history yet</p>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {scans.map((scan, i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-2xl shadow-sm"
              >
                {/* Image */}
                <div className="aspect-square bg-gray-200 border-2 border-dashed rounded-2xl">
                  <img
                    src={scan.image || "/placeholder.jpg"}
                    alt={scan.product_name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay Badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>

                {/* Status Badge */}
                <div className="absolute top-2 right-2">
                  {scan.status === "verified" ? (
                    <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center shadow-lg">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs font-medium bg-gradient-to-t from-black/70 to-transparent">
                  <p className="truncate">{scan.product_name}</p>
                  <p className="text-[10px] opacity-80">
                    {scan.company} • {scan.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
