// src/components/BottomNav.jsx
import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Camera, User, History } from "lucide-react";

function BottomNav() {
  const { pathname } = useLocation();

  const nav = [
    { to: "/dashboard", label: "Home", icon: Home },
    { to: "/wallet", label: "Reward", icon: Wallet },
    { to: "/scan", label: "Scan", icon: Camera },
    { to: "/profile", label: "Profile", icon: User },
    { to: "/history", label: "History", icon: History },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl z-50">
      <div className="flex justify-around items-center px-4 py-3">
        {nav.map(({ to, label, icon: Icon }) => {
          const isActive = pathname === to;

          return (
            <Link
              key={to}
              to={to}
              className={`
                relative flex flex-col items-center justify-center
                w-16 h-16 rounded-2xl transition-all duration-300
                ${
                  isActive
                    ? "text-brand-blue"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
            >
              {/* Active Indicator Dot */}
              {isActive && (
                <div className="absolute -top-1 w-2 h-2 bg-brand-blue rounded-full animate-ping"></div>
              )}
              {isActive && (
                <div className="absolute -top-1 w-2 h-2 bg-brand-blue rounded-full"></div>
              )}

              {/* Icon */}
              <div
                className={`
                transition-all duration-300
                ${isActive ? "scale-110" : "scale-100"}
              `}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Label */}
              <span
                className={`
                text-xs font-medium mt-1 transition-all duration-300
                ${isActive ? "opacity-100" : "opacity-70"}
              `}
              >
                {label}
              </span>

              {/* Ripple Effect on Active */}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl bg-brand-blue/10 -z-10"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNav;
