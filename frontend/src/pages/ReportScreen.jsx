// src/pages/ReportScreen.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle, Loader2 } from "lucide-react";
import BottomNav from "../components/BottomNav.jsx";

export default function ReportScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const points = location.state?.points || 10;

  // Auto-redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 pb-24 text-center">
      {/* Warning Icon with Red Dots */}
      <div className="relative mb-10">
        <div className="w-32 h-32 bg-brand-red/10 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-24 h-24 bg-brand-red rounded-full flex items-center justify-center shadow-xl">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
        </div>
        {/* Decorative Red Dots */}
        <div className="absolute top-0 left-4 w-3 h-3 bg-brand-red rounded-full"></div>
        <div className="absolute top-2 right-6 w-2 h-2 bg-brand-red rounded-full"></div>
        <div className="absolute bottom-6 left-8 w-2 h-2 bg-brand-red rounded-full"></div>
        <div className="absolute bottom-2 right-4 w-3 h-3 bg-brand-red rounded-full"></div>
      </div>

      {/* Text */}
      <h1 className="text-2xl font-bold text-brand-blue mb-2">
        Thank you for reporting
        <br />
        this product
      </h1>
      <p className="text-gray-600 mb-10">
        You earned <strong>{points} points</strong>.
      </p>

      {/* Spinner */}
      <div className="w-12 h-12 relative">
        <Loader2 className="w-full h-full text-brand-blue animate-spin" />
      </div>

      <BottomNav />
    </div>
  );
}
