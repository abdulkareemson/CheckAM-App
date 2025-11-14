// src/pages/WarningScreen.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { X, AlertTriangle } from "lucide-react";
import BottomNav from "../components/BottomNav.jsx";

export default function WarningScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { points = 5 } = location.state || {};

  const handleClose = () => {
    navigate("/dashboard", { replace: true });
  };

  const handleReport = () => {
    // Directly navigate to /report without any API call
    navigate("/report");
  };

  return (
    <div className="min-h-screen bg-brand-red text-white flex flex-col">
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleClose}
          className="text-white/70 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Title & Content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-6">Fake</h1>

        {/* Warning Icon with Dots */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
          </div>
          <div className="relative z-10 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <AlertTriangle className="w-16 h-16 text-brand-red" />
          </div>
          <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute top-2 right-4 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-4 left-6 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full"></div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white">
          Critical Warning!
        </h2>
        <p className="text-lg opacity-90 mb-8">
          This PIN has Already been used
          <br />
          Do not use this product
        </p>

        <Link
          to="/scan"
          className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition mb-3 w-full max-w-xs"
        >
          Scan Another
        </Link>

        <button
          onClick={handleReport}
          className="bg-white text-brand-red px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition w-full max-w-xs"
        >
          Report this Product
        </button>

        <p className="mt-6 text-sm opacity-80">
          You've received <strong>{points} checkAm Point</strong>
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
