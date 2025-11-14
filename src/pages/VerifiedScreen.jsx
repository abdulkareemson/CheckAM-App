// src/pages/VerifiedScreen.jsx
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { X, CheckCircle } from 'lucide-react'
import BottomNav from '../components/BottomNav.jsx'

export default function VerifiedScreen() {
  const location = useLocation()
  const navigate = useNavigate()
  const { product_name = 'Product', points = 5 } = location.state || {}

  const handleClose = () => {
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="min-h-screen bg-brand-blue text-white flex flex-col">
      {/* Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={handleClose}
          className="text-white/70 hover:text-white transition"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Title */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-4xl font-bold mb-8">Checked</h1>

        {/* Icon Circle with Dots */}
        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
          </div>
          <div className="relative z-10 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <CheckCircle className="w-16 h-16 text-brand-blue" />
          </div>
          {/* Decorative Dots */}
          <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full"></div>
          <div className="absolute top-2 right-4 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-4 left-6 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-white rounded-full"></div>
        </div>

        <h2 className="text-2xl font-bold mb-2">This product is genuine.</h2>
        <p className="text-lg opacity-90 mb-10">
          This product has been verified<br />and is safe to use.
        </p>

        <Link
          to="/scan"
          className="bg-white text-brand-blue px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition"
        >
          Continue to Check
        </Link>

        <p className="mt-8 text-sm opacity-80">
          You just earned <strong>{points} points</strong> for verifying this product!
        </p>
      </div>

      <BottomNav />
    </div>
  )
}