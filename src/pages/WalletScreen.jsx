// src/pages/WalletScreen.jsx
import { useState } from "react"
import { Wallet, Phone, Signal, CheckCircle, X, Sparkles } from "lucide-react"
import BottomNav from "../components/BottomNav.jsx"

export default function WalletScreen() {
  const [activeTab, setActiveTab] = useState("airtime")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const user = { name: "Raji Abdulfatai Ridwan", balance: 5234.84 }

  const airtimeAmounts = [1000, 2000, 3000, 5000, 10000, 20000]
  const dataAmounts = ["1gig", "2gig", "3gig", "4gig", "5gig", "6gig", "7gig", "8gig"]

  const canRedeem = phoneNumber && selectedAmount

  const handleRedeem = () => {
    if (!canRedeem) return
    setIsRedeeming(true)

    setTimeout(() => {
      setIsRedeeming(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        setPhoneNumber("")
        setSelectedAmount(null)
      }, 2500)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-24">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-purple-600 bg-clip-text text-transparent">
            Wallet
          </h1>
          <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Wallet className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6">
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/50">
          <p className="text-sm text-gray-600 font-semibold">{user.name}</p>
          <p className="text-xs text-gray-500 mt-1">Your CheckAM Balance</p>
          <p className="text-4xl font-bold text-brand-blue mt-2">
            C {user.balance.toLocaleString()}
          </p>
          <div className="h-1 bg-gradient-to-r from-brand-blue to-purple-600 rounded-full mt-4"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 mt-8">
        <div className="flex bg-white/70 backdrop-blur-md rounded-2xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("airtime")}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === "airtime"
                ? "bg-gradient-to-r from-brand-blue to-purple-600 text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            <Phone className="w-5 h-5" />
            <span>Airtime</span>
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
              activeTab === "data"
                ? "bg-gradient-to-r from-brand-blue to-purple-600 text-white shadow-md"
                : "text-gray-600"
            }`}
          >
            <Signal className="w-5 h-5" />
            <span>Data</span>
          </button>
        </div>
      </div>

      {/* Amount Section */}
      <div className="px-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Select Amount to Redeem
        </h3>

        {/* Phone Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g. 08012345678"
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Amount Grid */}
        <div className="grid grid-cols-3 gap-3">
          {(activeTab === "airtime" ? airtimeAmounts : dataAmounts).map((amount, i) => (
            <button
              key={i}
              onClick={() => setSelectedAmount(amount)}
              className={`
                py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform
                ${selectedAmount === amount
                  ? "bg-gradient-to-r from-brand-blue to-purple-600 text-white shadow-xl scale-105"
                  : "bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 hover:shadow-md hover:scale-102"
                }
              `}
            >
              {amount}
            </button>
          ))}
        </div>

        {/* Redeem Button — ONLY ENABLED WHEN READY */}
        <button
          onClick={handleRedeem}
          disabled={!canRedeem || isRedeeming}
          className={`
            mt-10 w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-300
            ${canRedeem && !isRedeeming
              ? "bg-gradient-to-r from-brand-blue to-purple-600 text-white shadow-2xl hover:shadow-3xl transform hover:scale-105"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
        >
          {isRedeeming ? (
            <>
              <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Redeeming...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>
                Redeem Your {activeTab === "airtime" ? "Airtime" : "Data"}
              </span>
            </>
          )}
        </button>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center transform animate-bounce-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Recharged!
            </h3>
            <p className="text-gray-600 mb-1">
              {selectedAmount} {activeTab === "airtime" ? "Airtime" : "Data"}
            </p>
            <p className="text-sm text-gray-500">
              Sent to {phoneNumber}
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 w-full bg-brand-blue text-white py-3 rounded-2xl font-bold hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}