// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, CloudUpload, Sun, AlertCircle } from "lucide-react";
import BottomNav from "../components/BottomNav.jsx";
// REMOVED: import { getDashboard, getUser } from "../api.js"

export default function Dashboard() {
  const [user, setUser] = useState({ name: "Raji Abdulfatai Ridwan" });
  const [weather, setWeather] = useState({
    day: "Monday",
    location: "Sabon Gari Zaria, Kaduna",
    temp: "29",
    condition: "Windy",
  });
  const [stats, setStats] = useState({
    points: 35,
    scans: 12,
    alerts: 1,
  });

  // MOCK DATA ONLY — NO API CALLS
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setUser({ name: "Raji Abdulfatai Ridwan" });
      setWeather({
        day: "Monday",
        location: "Sabon Gari Zaria, Kaduna",
        temp: "29",
        condition: "Windy",
      });
      setStats({ points: 35, scans: 12, alerts: 1 });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-3">Good Morning!</p>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
          </div>
          <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Weather Card with Background Image */}
      <div className="px-6 mt-6">
        <div
          className="bg-brand-blue text-white p-5 rounded-3xl shadow-lg relative overflow-hidden"
          style={{
            backgroundImage: `url('/morning.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold">{weather.day}</h3>
                <p className="text-sm opacity-90">{weather.location}</p>

                <p className="text-4xl font-bold mt-2">{weather.temp}°</p>
                <p className="text-sm opacity-90">{weather.condition}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Card */}
      <div className="px-6 mt-6">
        <div className="bg-white p-5 rounded-3xl shadow">
          <h3 className="text-2xl font-bold text-gray-900 font-bold">
            Welcome to the CheckAM
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Central hub where users start a scan, see updates, and access
            features.
          </p>
        </div>
      </div>

      {/* Upload CTA */}
      <div className="px-6 mt-6">
        <Link
          to="/scan"
          className="block bg-brand-orange text-white p-5 rounded-3xl shadow-lg flex items-center justify-center space-x-3 hover:shadow-xl transition"
        >
          <CloudUpload className="w-7 h-7" />
          <span className="font-bold text-lg">Upload New PRODUCT</span>
        </Link>
      </div>

      {/* Quick Stats Card */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Quick Stats Card
        </h3>
        <div className="bg-white p-5 rounded-3xl shadow">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Points:</span>
              <span className="text-2xl font-bold text-brand-blue">
                {stats.points}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Scans:</span>
              <span className="text-2xl font-bold text-gray-900">
                {stats.scans}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-brand-red" />
                <span className="font-medium text-gray-700">Alerts:</span>
              </div>
              <span className="text-xl font-bold text-brand-red">
                {stats.alerts} near you
              </span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
