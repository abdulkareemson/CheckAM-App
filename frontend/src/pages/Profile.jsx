// src/pages/Profile.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit2,
  LogOut,
  Shield,
  Award,
  Settings,
  ChevronRight,
} from "lucide-react";
import BottomNav from "../components/BottomNav.jsx";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Raji Abdulfatai Ridwan");

  // DUMP DATA — NO API
  const user = {
    email: "raji@example.com",
    phone: "+234 801 234 5678",
    location: "Zaria, Kaduna",
    level: "Gold Member",
    totalScans: 127,
    points: 5235,
  };

  const menuItems = [
    { icon: Shield, label: "Security", to: "/security" },
    { icon: Award, label: "Achievements", to: "/achievements" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-blue">Profile</h1>
          <button className="text-gray-400 hover:text-gray-600">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-lg font-bold placeholder-white/70"
                  autoFocus
                />
              ) : (
                <h2 className="text-xl font-bold flex items-center space-x-2">
                  <span>{name}</span>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-white/80 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </h2>
              )}
              <p className="text-sm opacity-90 flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>{user.level}</span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold">{user.totalScans}</p>
              <p className="text-xs opacity-80">Total Scans</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 text-center">
              <p className="text-2xl font-bold">{user.points}</p>
              <p className="text-xs opacity-80">Points</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-6 mt-6 space-y-3">
        <div className="bg-white p-4 rounded-2xl shadow flex items-center space-x-3">
          <Mail className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center space-x-3">
          <Phone className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{user.phone}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center space-x-3">
          <MapPin className="w-5 h-5 text-gray-500" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Location</p>
            <p className="font-medium">{user.location}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl shadow divide-y divide-gray-200">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item.to}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="px-6 mt-6">
        <button className="w-full bg-brand-red text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-red-700 transition">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
