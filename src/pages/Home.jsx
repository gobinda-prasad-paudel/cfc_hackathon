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
    <div className={` max-w-7xl mx-auto`}>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 text-balance">
          Empowering Women Together
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          A comprehensive platform providing support, resources, and
          opportunities for women. From harassment reporting to educational
          scholarships, we're here to help you thrive.
        </p>
      </div>

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
          Join our community of empowered women and access all the resources you
          need to succeed.
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
  );
};

export default Home;
