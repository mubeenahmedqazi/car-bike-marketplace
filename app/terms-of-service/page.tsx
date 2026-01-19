"use client"

import { FileText, Scale, AlertTriangle, Shield, Lock, CheckCircle } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Please read these terms carefully before using our platform.
            </p>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-orange-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-800 text-center">
            <strong>Last Updated:</strong> January 17, 2024 | 
            <strong className="ml-4">Effective Date:</strong> January 1, 2024
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Agreement */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <FileText className="text-red-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Agreement to Terms</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                By accessing or using CAR-BIKE MARKETPLACE ("the Platform"), you agree to be bound 
                by these Terms of Service and all applicable laws and regulations.
              </p>
              <p>
                If you do not agree with any of these terms, you are prohibited from using or 
                accessing this site. The materials contained in this website are protected by 
                applicable copyright and trademark law.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-yellow-600 mt-1" size={20} />
                  <p className="text-yellow-800">
                    <strong>Important:</strong> These terms contain important information about 
                    your legal rights, remedies, and obligations. By accessing or using the Platform, 
                    you agree to comply with and be bound by these Terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Accounts */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="text-blue-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">User Accounts</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Creation</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>You must be at least 18 years old to create an account</li>
                  <li>You must provide accurate and complete information</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You must notify us immediately of any unauthorized use</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Account Responsibilities</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>All activities under your account are your responsibility</li>
                  <li>You may not share your account credentials</li>
                  <li>You may not create multiple accounts for fraudulent purposes</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Listing Rules */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Listing Guidelines</h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Permitted Listings</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>Personal vehicles owned by the seller</li>
                  <li>Accurate and truthful vehicle descriptions</li>
                  <li>Clear, unaltered photos of the actual vehicle</li>
                  <li>Realistic pricing based on market value</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Prohibited Listings</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>Stolen vehicles or vehicles with fraudulent documentation</li>
                  <li>Vehicles with undisclosed accidents or damage</li>
                  <li>Commercial dealership listings without authorization</li>
                  <li>Duplicate listings or spam</li>
                  <li>Vehicles used for illegal purposes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Scale className="text-red-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Transactions & Payments</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p>
                CAR-BIKE MARKETPLACE is a platform that connects buyers and sellers. We are not 
                a party to any transactions between users.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Important Disclosures:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>All transactions are between buyer and seller directly</li>
                  <li>We do not handle payments unless using our escrow service</li>
                  <li>We recommend conducting transactions in safe, public locations</li>
                  <li>Always verify vehicle documentation before purchase</li>
                  <li>We are not responsible for transaction disputes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Fees */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fees & Charges</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Basic Listing</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Free</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Standard vehicle listing for 30 days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Featured Listing</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PKR 999</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Priority placement for 7 days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Verification Service</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PKR 1,499</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Professional vehicle inspection</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Escrow Service</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2% of transaction</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Secure payment handling (min PKR 500)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              * All fees are subject to change with 30 days notice
            </p>
          </div>

          {/* Prohibited Activities */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Lock className="text-red-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Prohibited Activities</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Security Violations</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Hacking or attempting to gain unauthorized access</li>
                  <li>Distributing viruses or malicious code</li>
                  <li>Spamming or flooding the platform</li>
                  <li>Attempting to disrupt service</li>
                </ul>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Fraudulent Activities</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Impersonating other users or entities</li>
                  <li>Providing false information</li>
                  <li>Engaging in deceptive practices</li>
                  <li>Money laundering activities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                The Platform and its original content, features, and functionality are owned by 
                CAR-BIKE MARKETPLACE and are protected by international copyright, trademark, 
                patent, trade secret, and other intellectual property laws.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">User Content License</h4>
                <p className="text-sm text-gray-700">
                  By posting content on the Platform, you grant us a worldwide, non-exclusive, 
                  royalty-free license to use, reproduce, modify, and display such content in 
                  connection with the Platform.
                </p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                To the maximum extent permitted by law, CAR-BIKE MARKETPLACE shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages, 
                including without limitation, loss of profits, data, use, goodwill, or other 
                intangible losses.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>Disclaimer:</strong> The Platform is provided "as is" and "as available" 
                  without any warranties of any kind. We do not warrant that the service will be 
                  uninterrupted, secure, or error-free.
                </p>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                These Terms shall be governed and construed in accordance with the laws of 
                Pakistan, without regard to its conflict of law provisions.
              </p>
              
              <p>
                Any disputes arising from these Terms or your use of the Platform shall be 
                subject to the exclusive jurisdiction of the courts located in Karachi, Pakistan.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
            
            <div className="space-y-4 text-gray-700">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms 
                at any time. If a revision is material, we will provide at least 30 days' notice 
                prior to any new terms taking effect.
              </p>
              
              <p>
                By continuing to access or use our Platform after those revisions become 
                effective, you agree to be bound by the revised terms. If you do not agree to 
                the new terms, you must stop using the Platform.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact for Terms Questions</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="space-y-2">
                <p><strong>Legal Department:</strong> legal@carbikemarketplace.pk</p>
                <p><strong>Phone:</strong> 0300-CAR-BIKE (ext. 2)</p>
                <p><strong>Address:</strong> 123 Auto Street, Karachi, Pakistan</p>
              </div>
              
              <p className="text-sm text-gray-600 mt-4">
                For legal notices, please include "Legal Notice" in the subject line.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Acceptance Checkbox */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Have You Read Our Terms?</h3>
          <p className="mb-6 max-w-2xl mx-auto opacity-90">
            By using our platform, you acknowledge that you have read, understood, 
            and agree to be bound by these Terms of Service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-red-600 font-bold px-8 py-4 rounded-xl hover:shadow-xl transition-all hover:scale-105"
            >
              Return to Homepage
            </a>
            <a
              href="/contact-us"
              className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-red-600 transition-all"
            >
              Ask Questions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}