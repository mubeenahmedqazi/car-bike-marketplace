"use client"

import { Shield, Lock, Eye, FileText, UserCheck, Bell } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - UPDATED TO ORANGE/RED GRADIENT */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Your privacy is important to us. Learn how we protect and handle your information.
            </p>
          </div>
        </div>
      </div>

      {/* Last Updated - UPDATED TO ORANGE */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <p className="text-orange-800 text-center">
            <strong>Last Updated:</strong> January 17, 2024
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Introduction */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="text-orange-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Welcome to CAR-BIKE MARKETPLACE ("we," "our," or "us"). We are committed to 
                protecting your personal information and your right to privacy.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website or use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms 
                of this privacy policy, please do not access the site or use our services.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FileText className="text-orange-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Name and contact information (email, phone number, address)</li>
                  <li>Account credentials (username, password)</li>
                  <li>Payment information (when making transactions)</li>
                  <li>Vehicle information for listings</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, clicks)</li>
                  <li>Location data (general location based on IP address)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Eye className="text-orange-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Service Delivery</h4>
                <p className="text-gray-700 text-sm">
                  To provide, maintain, and improve our services
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Communication</h4>
                <p className="text-gray-700 text-sm">
                  To send updates, security alerts, and support messages
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Security</h4>
                <p className="text-gray-700 text-sm">
                  To protect against fraud and unauthorized access
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Personalization</h4>
                <p className="text-gray-700 text-sm">
                  To personalize your experience and show relevant content
                </p>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                <UserCheck className="text-orange-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Data Sharing & Disclosure</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We do not sell your personal information. We may share information with:
              </p>
              
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Trusted third parties who assist in operating our platform
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger or acquisition
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly agree to share information
                </li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Lock className="text-orange-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We implement appropriate technical and organizational security measures to 
                protect your personal information against unauthorized access, alteration, 
                disclosure, or destruction.
              </p>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-semibold text-gray-900 mb-2">Our Security Measures Include:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers with firewalls</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                  <li>Data encryption at rest</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                <Bell className="text-orange-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Privacy Rights</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Access & Correction</h4>
                <p className="text-gray-700 text-sm">
                  Access and update your personal information
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Deletion</h4>
                <p className="text-gray-700 text-sm">
                  Request deletion of your personal data
                </p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Objection</h4>
                <p className="text-gray-700 text-sm">
                  Object to processing of your personal data
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Data Portability</h4>
                <p className="text-gray-700 text-sm">
                  Receive your data in a structured format
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies & Tracking Technologies</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We use cookies and similar tracking technologies to track activity on our 
                service and hold certain information.
              </p>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-100">
                <h4 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic functionality
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Help us understand how visitors interact
                  </li>
                  <li>
                    <strong>Functionality Cookies:</strong> Remember your preferences
                  </li>
                  <li>
                    <strong>Advertising Cookies:</strong> Deliver relevant advertisements
                  </li>
                </ul>
              </div>
              
              <p>
                You can instruct your browser to refuse all cookies or to indicate when a 
                cookie is being sent. However, if you do not accept cookies, you may not be 
                able to use some portions of our service.
              </p>
            </div>
          </div>

          {/* Changes to Policy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the 
                "Last Updated" date.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. 
                Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>
          </div>

          {/* Contact Information - UPDATED TO ORANGE */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@carbikemarketplace.pk</p>
                <p><strong>Phone:</strong> 0300-CAR-BIKE</p>
                <p><strong>Address:</strong> Karachi, Pakistan</p>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                For data protection requests, please include "Privacy Request" in the subject line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action - ADDED TO MATCH WEBSITE STYLE */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Need Help with Privacy?</h3>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            Contact our privacy team if you have questions about your data or rights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all hover:scale-105"
            >
              Contact Privacy Team
            </a>
            <a
              href="/"
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}