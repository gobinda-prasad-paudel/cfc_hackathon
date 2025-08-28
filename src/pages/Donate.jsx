import React from "react";

import { useState } from "react";
import {
  Heart,
  CreditCard,
  DollarSign,
  Users,
  Target,
  Award,
} from "lucide-react";

const Donate = ({ setCurrentPage }) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState("one-time");
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
    isAnonymous: false,
  });

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Thank you for your donation! This is a demo - no actual payment processed."
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart size={16} />
            Donation Raised to Fight for Gender Equality
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-balance">
            Support Women's Rights & Safety
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-balance">
            Your donation helps us provide essential services, legal aid,
            education, and support to women in need. Together, we can create a
            safer, more equal world.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="text-pink-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">15,000+</h3>
            <p className="text-gray-600">Women Supported</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="text-green-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Legal Cases Won</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Award className="text-amber-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">1,200+</h3>
            <p className="text-gray-600">Scholarships Awarded</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Make a Donation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donation Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Donation Type
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setDonationType("one-time")}
                    className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-colors ${
                      donationType === "one-time"
                        ? "bg-pink-50 border-pink-200 text-pink-700"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType("monthly")}
                    className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-colors ${
                      donationType === "monthly"
                        ? "bg-pink-50 border-pink-200 text-pink-700"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => {
                        setDonationAmount(amount.toString());
                        setCustomAmount("");
                      }}
                      className={`py-3 px-4 rounded-lg border font-medium transition-colors ${
                        donationAmount === amount.toString()
                          ? "bg-pink-50 border-pink-200 text-pink-700"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setDonationAmount("");
                    }}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Donor Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Donor Information</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={donorInfo.name}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required={!donorInfo.isAnonymous}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={donorInfo.email}
                    onChange={(e) =>
                      setDonorInfo({ ...donorInfo, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={donorInfo.isAnonymous}
                    onChange={(e) =>
                      setDonorInfo({
                        ...donorInfo,
                        isAnonymous: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <label htmlFor="anonymous" className="text-sm text-gray-700">
                    Make this donation anonymous
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-green-600 text-white py-4 px-6 rounded-lg font-medium hover:from-pink-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <CreditCard size={20} />
                Donate{" "}
                {(donationAmount || customAmount) &&
                  `$${donationAmount || customAmount}`}
              </button>
            </form>
          </div>

          {/* Impact Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-50 to-green-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Your Impact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">$25</p>
                    <p className="text-sm text-gray-600">
                      Provides legal consultation for one woman
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">$50</p>
                    <p className="text-sm text-gray-600">
                      Funds emergency shelter for one night
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">$100</p>
                    <p className="text-sm text-gray-600">
                      Supports educational workshop for 10 women
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">$500</p>
                    <p className="text-sm text-gray-600">
                      Funds a full scholarship for vocational training
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Why Donate?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-2"></div>
                  <span>Support survivors of harassment and violence</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                  <span>Fund legal aid and advocacy programs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                  <span>
                    Provide educational opportunities and scholarships
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2"></div>
                  <span>Create awareness and prevention programs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
