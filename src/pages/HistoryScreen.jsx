// src/pages/HistoryScreen.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  Package,
} from "lucide-react";
import BottomNav from "../components/BottomNav.jsx";

// DUMP DATA — PHARMA DRUGS (NO MAPS)
const mockHistory = [
  {
    id: 1,
    product_name: "Paracetamol 500mg",
    company: "Emzor Pharmaceutical",
    date: "Nov 12, 2025",
    time: "2:34 PM",
    status: "verified",
  },
  {
    id: 2,
    product_name: "Amoxicillin 250mg",
    company: "May & Baker Nigeria",
    date: "Nov 11, 2025",
    time: "10:15 AM",
    status: "verified",
  },
  {
    id: 3,
    product_name: "Fake Coartem",
    company: "Unknown",
    date: "Nov 10, 2025",
    time: "6:22 PM",
    status: "fake",
  },
  {
    id: 4,
    product_name: "Augmentin 625mg",
    company: "GSK Nigeria",
    date: "Nov 9, 2025",
    time: "11:47 AM",
    status: "verified",
  },
  {
    id: 5,
    product_name: "Expired Flagyl",
    company: "Sanofi",
    date: "Nov 8, 2025",
    time: "3:10 PM",
    status: "fake",
  },
  {
    id: 6,
    product_name: "Lonart DS",
    company: "Bliss GVS Pharma",
    date: "Nov 7, 2025",
    time: "9:05 AM",
    status: "verified",
  },
];

export default function HistoryScreen() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScans(mockHistory);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-xl z-10 px-6 pt-12 pb-4 shadow-sm flex items-center justify-between border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-brand-blue bg-clip-text text-transparent">
            Scanned History
          </h1>
          <p className="text-xs text-gray-500 mt-1 flex items-center space-x-1">
            <Package className="w-3 h-3" />
            <span>{mockHistory.length} drug verifications</span>
          </p>
        </div>
        <button
          onClick={handleClose}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading drug history...
          </p>
        </div>
      ) : scans.length === 0 ? (
        <div className="text-center py-20 px-6">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No drug scans yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Scan medicines to verify authenticity
          </p>
        </div>
      ) : (
        <div className="px-6 py-6">
          {/* 2-CARD PER ROW GRID */}
          <div className="grid grid-cols-2 gap-4">
            {scans.map((scan) => (
              <div
                key={scan.id}
                className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between"
              >
                {/* Status Badge */}
                <div className="flex justify-end mb-3">
                  {scan.status === "verified" ? (
                    <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Drug Info */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 flex items-center space-x-2">
                    <Package className="w-5 h-5 text-teal-600" />
                    <span className="truncate">{scan.product_name}</span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {scan.company}
                  </p>
                </div>

                {/* Date & Time */}
                <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{scan.date}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{scan.time}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
