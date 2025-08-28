import React from "react";

import { ArrowRight, Shield, Users, Heart, BookOpen } from "lucide-react";

const PublicHome = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-50 via-green-50 to-pink-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
              Empowering Women,
              <span className="text-pink-600"> Protecting Lives</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto text-pretty">
              A safe, confidential platform providing comprehensive support for
              women facing harassment, seeking education, funding, and
              mentorship opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage("signup")}
                className="bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button
                onClick={() => setCurrentPage("login")}
                className="border border-pink-600 text-pink-600 px-8 py-3 rounded-lg font-medium hover:bg-pink-50 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Support Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to feel safe, empowered, and supported in one
              secure platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-pink-50 p-6 rounded-xl">
              <Shield className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Safe Reporting
              </h3>
              <p className="text-gray-600">
                Report harassment incidents confidentially with complete
                identity protection and legal support.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <BookOpen className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Education Resources
              </h3>
              <p className="text-gray-600">
                Access educational programs, workshops, and skill development
                opportunities.
              </p>
            </div>

            <div className="bg-pink-50 p-6 rounded-xl">
              <Heart className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Financial Support
              </h3>
              <p className="text-gray-600">
                Find scholarships, crowdfunding opportunities, and financial
                assistance programs.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mentorship
              </h3>
              <p className="text-gray-600">
                Connect with experienced mentors for career guidance and
                personal development.
              </p>
            </div>

            <div className="bg-pink-50 p-6 rounded-xl">
              <Shield className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Awareness Programs
              </h3>
              <p className="text-gray-600">
                Join community programs and campaigns to raise awareness about
                women's rights.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <Heart className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Exclusive Discounts
              </h3>
              <p className="text-gray-600">
                Access special discounts and coupons from partner organizations
                and businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Latest from Our Blog
            </h2>
            <p className="text-lg text-gray-600">
              Stories, insights, and resources to empower and inspire women
              everywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-pink-100 to-pink-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Breaking the Silence: Your Voice Matters
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how to speak up against harassment and find your
                  strength in difficult situations.
                </p>
                <button
                  onClick={() => setCurrentPage("blog")}
                  className="text-pink-600 font-medium hover:text-pink-700"
                >
                  Read More →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-100 to-green-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Financial Independence: A Guide for Women
                </h3>
                <p className="text-gray-600 mb-4">
                  Discover resources and strategies to achieve financial freedom
                  and security.
                </p>
                <button
                  onClick={() => setCurrentPage("blog")}
                  className="text-green-600 font-medium hover:text-green-700"
                >
                  Read More →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-pink-100 to-green-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Building Supportive Communities
                </h3>
                <p className="text-gray-600 mb-4">
                  How women can come together to create safe spaces and support
                  networks.
                </p>
                <button
                  onClick={() => setCurrentPage("blog")}
                  className="text-pink-600 font-medium hover:text-pink-700"
                >
                  Read More →
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setCurrentPage("blog")}
              className="bg-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
            >
              View All Posts
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
