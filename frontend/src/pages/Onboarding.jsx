// src/pages/Onboarding.jsx
import { Link } from "react-router-dom";
import { CheckCircle, Shield, Zap, Globe } from "lucide-react";

export default function Onboarding() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between px-6 py-12 relative"
      style={{
        backgroundImage: `url('/background.jpg')`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center flex-1 justify-center max-w-md mx-auto text-center">
        {/* Logo */}
        <div className="mb-10 animate-fade-in">
          <img
            src="/pwa-512x512.png"
            alt="CheckAm Logo"
            className="w-28 h-28 mx-auto rounded-3xl shadow-2xl"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-white mb-4 animate-slide-up">
          Welcome to <span className="text-brand-blue">CheckAm</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg text-white/90 mb-12 animate-slide-up animation-delay-200">
          Verify product authenticity in seconds with AI
        </p>

        {/* Feature Highlights */}
        <div className="space-y-6 w-full mb-12">
          {[
            { icon: Shield, text: "100% Secure Verification" },
            { icon: Zap, text: "AI-Powered Instant Scan" },
            { icon: Globe, text: "Works Offline with PWA" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-slide-up"
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              <div className="w-12 h-12 bg-brand-blue/20 rounded-full flex items-center justify-center">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-white font-medium text-left flex-1">
                {item.text}
              </p>
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <Link
          to="/dashboard"
          className="w-full bg-gradient-to-r from-brand-blue to-purple-600 text-white py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 animate-bounce-subtle"
        >
          <span>Get Started</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-white/70 text-sm mt-8">
        Powered by AI • Trusted by Thousands
      </p>
    </div>
  );
}
