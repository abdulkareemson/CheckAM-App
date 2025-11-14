// src/App.jsx
import { Routes, Route } from "react-router-dom";

// Pages
import Onboarding from "./pages/Onboarding.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ScanScreen from "./pages/ScanScreen.jsx";
import VerifiedScreen from "./pages/VerifiedScreen.jsx";
import WarningScreen from "./pages/WarningScreen.jsx";
import WalletScreen from "./pages/WalletScreen.jsx";
import HistoryScreen from "./pages/HistoryScreen.jsx";
import ReportScreen from "./pages/ReportScreen.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scan" element={<ScanScreen />} />
        <Route path="/verified" element={<VerifiedScreen />} />
        <Route path="/warning" element={<WarningScreen />} />
        <Route path="/report" element={<ReportScreen />} />
        <Route path="/wallet" element={<WalletScreen />} />
        <Route path="/history" element={<HistoryScreen />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
