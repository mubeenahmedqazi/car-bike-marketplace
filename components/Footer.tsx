"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Car, 
  Bike, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Linkedin, 
  MessageCircle,
  Shield,
  Award,
  Truck,
  CreditCard,
  Headphones,
  ChevronUp,
  Download,
  Globe,
  Clock,
  Users,
  CheckCircle
} from "lucide-react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log("Subscribed:", email)
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <MessageCircle size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Stay Updated with Best Deals</h3>
                <p className="text-white/90">Get exclusive offers and new listings directly in your inbox</p>
              </div>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-6 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/30 focus:outline-none text-gray-900 w-full md:w-80"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
          
          {isSubscribed && (
            <div className="mt-4 text-center animate-fadeIn">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <CheckCircle size={16} />
                <span>Thank you for subscribing!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-2xl">
                <div className="flex">
                  <Car size={24} />
                  <Bike size={20} className="-ml-2" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">AutoBazaar</h2>
                <p className="text-sm text-gray-400">Pakistan's #1 Automotive Marketplace</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting millions of buyers and sellers across Pakistan. 
              Find your perfect vehicle or sell yours quickly with our trusted platform.
            </p>
            
            {/* App Download */}
            <div className="mb-8">
              <p className="text-gray-300 mb-3 font-medium">Download Our App</p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6 1.4 1.4-9 9z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6 1.4 1.4-9 9z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Buy Car", href: "/cars" },
                { label: "Buy Bike", href: "/bikes" },
                { label: "Sell Vehicle", href: "/sell" },
                { label: "Featured Ads", href: "/featured" },
                { label: "Urgent Sale", href: "/urgent" },
                { label: "New Arrivals", href: "/new" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <ChevronUp size={12} className="rotate-90" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Resources</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Blog & Guides", href: "/blog" },
                { label: "Help Center", href: "/help" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2"
                  >
                    <ChevronUp size={12} className="rotate-90" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-orange-400 mt-1" />
                <div>
                  <div className="text-gray-400 text-sm">Call Us</div>
                  <div className="font-semibold">0300-CAR-BIKE</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-orange-400 mt-1" />
                <div>
                  <div className="text-gray-400 text-sm">Email</div>
                  <div className="font-semibold">support@autobazaar.com</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-400 mt-1" />
                <div>
                  <div className="text-gray-400 text-sm">Head Office</div>
                  <div className="font-semibold">Karachi, Pakistan</div>
                </div>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-gray-300 mb-4 font-medium">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, label: "Facebook" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Youtube, label: "YouTube" },
                  { icon: Linkedin, label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors hover:scale-110"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: Shield, label: "Secure Payments", color: "text-green-400" },
              { icon: Award, label: "Verified Sellers", color: "text-blue-400" },
              { icon: Truck, label: "Free Inspection", color: "text-purple-400" },
              { icon: CreditCard, label: "Easy Financing", color: "text-yellow-400" },
              { icon: Headphones, label: "24/7 Support", color: "text-pink-400" },
              { icon: Users, label: "5M+ Users", color: "text-orange-400" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <badge.icon size={20} className={badge.color} />
                <span className="text-sm text-gray-300">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} AutoBazaar Pakistan. All rights reserved.
              <span className="mx-2">•</span>
              <span className="text-gray-400">A product of Tech Innovations Pvt Ltd.</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Globe size={14} />
                <span>English</span>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <Clock size={14} />
                <span>Last updated: Today</span>
              </div>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              >
                <ChevronUp size={16} />
                <span className="text-sm">Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  )
}