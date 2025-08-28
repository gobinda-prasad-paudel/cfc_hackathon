import React from "react";

import {
  AlertTriangle,
  BookOpen,
  Heart,
  GraduationCap,
  Tag,
  Megaphone,
  Users,
  UserPlus,
} from "lucide-react";
import PublicNavbar from "../components/PublicNavbar";
import Footer from "../components/Footer";

import { motion } from "framer-motion";
import GenderNeutralitySVG from "../assets/gender-neutrality.svg";
function HeroSection() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-4 md:px-16 py-16">
      {/* Text Section */}
      <div className="text-center md:text-left md:mr-12 mb-12 md:mb-0">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6">
          Empowering Women Together
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto md:mx-0">
          A comprehensive platform providing support, resources, and
          opportunities for women. From harassment reporting to educational
          scholarships, we're here to help you thrive.
        </p>
      </div>

      {/* Animated SVG */}
      <motion.div
        className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mx-auto"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        whileHover={{ scale: 1.1, rotate: 10 }}
      >
        <svg
          fill="#4a5565"
          viewBox="0 0 485.768 485.768"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#fd8b8b"
          className="w-full h-full"
        >
          <g>
            <path d="M107.524,160.052c22.643,0,44.282,9.705,59.371,26.625c5.147,5.771,13.996,6.277,19.767,1.131c5.771-5.146,6.277-13.996,1.132-19.767c-20.396-22.872-49.653-35.989-80.27-35.989C48.235,132.052,0,180.287,0,239.576c0,54.545,40.826,99.731,93.524,106.614v46.354H63.168c-7.732,0-14,6.268-14,14c0,7.732,6.268,14,14,14h30.356v28.447c0,7.732,6.268,14,14,14s14-6.268,14-14v-28.447h30.355c7.732,0,14-6.268,14-14c0-7.732-6.268-14-14-14h-30.355V346.18c25.404-3.347,49.01-15.714,66.27-35.069c5.146-5.771,4.64-14.621-1.132-19.767c-5.77-5.147-14.62-4.639-19.767,1.131c-15.089,16.921-36.729,26.626-59.371,26.626c-43.85,0-79.524-35.675-79.524-79.525C28,195.726,63.675,160.052,107.524,160.052z"></path>
            <path d="M392.077,132.45V67.444l20.837,20.837c2.733,2.734,6.316,4.101,9.9,4.101c3.582-0.001,7.166-1.367,9.899-4.101c5.468-5.467,5.468-14.331,0-19.799l-39.386-39.387c-4.073-4.073-9.488-6.317-15.248-6.317c0,0-0.001,0-0.002,0c-5.761,0-11.177,2.244-15.247,6.316l-39.389,39.388c-5.468,5.467-5.468,14.331,0,19.799c5.467,5.468,14.332,5.468,19.799,0l20.837-20.836v65.013c-26.236,3.431-50.43,16.422-67.872,36.818c-5.025,5.876-4.336,14.713,1.54,19.739c5.876,5.025,14.714,4.336,19.739-1.54c15.182-17.752,37.267-27.933,60.593-27.933c43.942,0,79.691,35.749,79.691,79.692c0,21.287-8.289,41.299-23.341,56.351c-15.053,15.052-35.064,23.341-56.352,23.341c-23.325,0.001-45.41-10.181-60.591-27.934c-5.026-5.876-13.864-6.567-19.739-1.542c-5.876,5.025-6.566,13.862-1.542,19.739c20.509,23.983,50.351,37.737,81.873,37.736c0.001,0,0.001,0,0.003,0c28.763,0,55.807-11.202,76.146-31.542c20.34-20.34,31.542-47.384,31.542-76.15C485.768,184.596,444.868,139.334,392.077,132.45z"></path>
            <path d="M209.384,223.62h70.496c7.732,0,14-6.268,14-14c0-7.732-6.268-14-14-14h-70.496c-7.732,0-14,6.268-14,14C195.384,217.352,201.651,223.62,209.384,223.62z"></path>
            <path d="M279.88,251.117h-70.496c-7.732,0-14,6.268-14,14c0,7.732,6.268,14,14,14h70.496c7.732,0,14-6.268,14-14C293.88,257.385,287.612,251.117,279.88,251.117z"></path>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

const Home = ({ setCurrentPage }) => {
  const quickLinks = [
    {
      title: "Report Harassment",
      description: "Safely report incidents and get support",
      icon: AlertTriangle,
      page: "reports",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Education Resources",
      description: "Access learning materials and courses",
      icon: BookOpen,
      page: "education",
      color: "bg-accent text-accent-foreground",
    },
    {
      title: "Scholarships",
      description: "Find funding opportunities for education",
      icon: GraduationCap,
      page: "scholarships",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      title: "Mentorship Programs",
      description: "Connect with mentors and grow professionally",
      icon: Users,
      page: "mentorship",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Crowdfunding",
      description: "Support causes and get financial help",
      icon: Heart,
      page: "crowdfunding",
      color: "bg-accent text-accent-foreground",
    },
    {
      title: "Discount Coupons",
      description: "Access exclusive deals and offers",
      icon: Tag,
      page: "coupons",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      title: "Awareness Programs",
      description: "Join events and awareness campaigns",
      icon: Megaphone,
      page: "awareness",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "User Registration",
      description: "Create your account to get started",
      icon: UserPlus,
      page: "registration",
      color: "bg-accent text-accent-foreground",
    },
  ];

  return (
    <>
      <PublicNavbar />
      <div className={` max-w-7xl mx-auto`}>
        {/* Hero Section */}
        <HeroSection />

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <button
                key={link.page}
                onClick={() => setCurrentPage(link.page)}
                className="group block text-left w-full"
              >
                <div className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`inline-flex p-3 rounded-lg ${link.color} mb-4`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">
                    {link.title}
                  </h3>
                  <p className="text-muted-foreground text-sm text-pretty">
                    {link.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold text-card-foreground mb-4 text-balance">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-6 text-pretty">
            Join our community of empowered women and access all the resources
            you need to succeed.
          </p>
          <button
            onClick={() => setCurrentPage("registration")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <UserPlus size={20} />
            Create Your Account
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
