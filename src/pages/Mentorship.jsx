import React from "react";

import { useState } from "react";
import {
  Search,
  Users,
  Star,
  MapPin,
  Clock,
  MessageCircle,
  X,
  Mail,
} from "lucide-react";

const Mentorship = () => {
  const [activeTab, setActiveTab] = useState("browse");
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExpertise, setFilterExpertise] = useState("all");
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [applicationData, setApplicationData] = useState({
    mentorId: "",
    programType: "",
    goals: "",
    experience: "",
    timeCommitment: "",
    preferredFormat: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState({});

  // Dummy data for mentors
  const [mentors] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc.",
      expertise: ["Technology", "Career Development", "Leadership"],
      experience:
        "8+ years in software development, team leadership, and mentoring junior developers",
      rating: 4.9,
      reviewCount: 47,
      location: "San Francisco, CA",
      availability: "Available",
      languages: ["English", "Spanish"],
      menteeCount: 23,
      successStories: 18,
      bio: "Passionate about empowering women in tech through mentorship and career guidance. Specializes in software engineering, technical leadership, and work-life balance.",
      programs: [
        "Career Transition",
        "Technical Skills",
        "Leadership Development",
      ],
      imageUrl: "/mentor-sarah.png",
      hourlyRate: "Free",
      responseTime: "Within 24 hours",
    },
    {
      id: 2,
      name: "Dr. Maria Rodriguez",
      title: "Entrepreneur & Business Consultant",
      company: "Rodriguez Consulting",
      expertise: ["Entrepreneurship", "Business Strategy", "Finance"],
      experience:
        "15+ years building and scaling businesses, with expertise in startup funding and growth strategies",
      rating: 4.8,
      reviewCount: 62,
      location: "Austin, TX",
      availability: "Limited",
      languages: ["English", "Spanish", "Portuguese"],
      menteeCount: 41,
      successStories: 35,
      bio: "Serial entrepreneur who has founded 3 successful companies. Dedicated to helping women navigate the challenges of starting and growing businesses.",
      programs: [
        "Startup Guidance",
        "Business Planning",
        "Funding & Investment",
      ],
      imageUrl: "/mentor-maria.png",
      hourlyRate: "$75/hour",
      responseTime: "Within 48 hours",
    },
    {
      id: 3,
      name: "Jennifer Chen",
      title: "Marketing Director",
      company: "Global Brands Agency",
      expertise: ["Marketing", "Brand Strategy", "Digital Marketing"],
      experience:
        "10+ years in marketing and brand management, helping companies build strong market presence",
      rating: 4.7,
      reviewCount: 34,
      location: "New York, NY",
      availability: "Available",
      languages: ["English", "Mandarin"],
      menteeCount: 19,
      successStories: 16,
      bio: "Creative marketing professional with a passion for helping women develop their personal brand and marketing skills in competitive industries.",
      programs: ["Personal Branding", "Digital Marketing", "Career Growth"],
      imageUrl: "/mentor-jennifer.png",
      hourlyRate: "$50/hour",
      responseTime: "Within 12 hours",
    },
    {
      id: 4,
      name: "Dr. Aisha Patel",
      title: "Healthcare Administrator",
      company: "Metropolitan Medical Center",
      expertise: ["Healthcare", "Management", "Work-Life Balance"],
      experience:
        "12+ years in healthcare administration and medical practice management",
      rating: 4.9,
      reviewCount: 28,
      location: "Chicago, IL",
      availability: "Available",
      languages: ["English", "Hindi", "Gujarati"],
      menteeCount: 15,
      successStories: 13,
      bio: "Healthcare leader committed to supporting women in medical and healthcare careers while maintaining personal well-being and family life.",
      programs: [
        "Healthcare Careers",
        "Leadership in Medicine",
        "Work-Life Integration",
      ],
      imageUrl: "/mentor-aisha.png",
      hourlyRate: "Free",
      responseTime: "Within 24 hours",
    },
    {
      id: 5,
      name: "Lisa Thompson",
      title: "Financial Advisor",
      company: "Wealth Management Partners",
      expertise: ["Finance", "Investment", "Financial Planning"],
      experience:
        "9+ years helping individuals and families achieve financial independence and security",
      rating: 4.8,
      reviewCount: 51,
      location: "Denver, CO",
      availability: "Waitlist",
      languages: ["English"],
      menteeCount: 32,
      successStories: 28,
      bio: "Certified financial planner specializing in helping women take control of their finances and build long-term wealth.",
      programs: [
        "Financial Literacy",
        "Investment Strategies",
        "Retirement Planning",
      ],
      imageUrl: "/mentor-lisa.png",
      hourlyRate: "$60/hour",
      responseTime: "Within 72 hours",
    },
    {
      id: 6,
      name: "Rachel Kim",
      title: "Creative Director",
      company: "Design Studio Pro",
      expertise: ["Design", "Creative Arts", "Freelancing"],
      experience:
        "7+ years in graphic design, branding, and creative direction for major brands",
      rating: 4.6,
      reviewCount: 39,
      location: "Los Angeles, CA",
      availability: "Available",
      languages: ["English", "Korean"],
      menteeCount: 26,
      successStories: 22,
      bio: "Award-winning creative director passionate about helping women build successful careers in design and creative industries.",
      programs: [
        "Creative Career Development",
        "Freelance Success",
        "Portfolio Building",
      ],
      imageUrl: "/mentor-rachel.png",
      hourlyRate: "$45/hour",
      responseTime: "Within 24 hours",
    },
  ]);

  const expertiseAreas = [
    "Technology",
    "Entrepreneurship",
    "Marketing",
    "Healthcare",
    "Finance",
    "Design",
    "Leadership",
    "Career Development",
  ];

  const availabilityFilters = [
    { value: "all", label: "All Mentors" },
    { value: "Available", label: "Available Now" },
    { value: "Limited", label: "Limited Availability" },
    { value: "Waitlist", label: "Waitlist Only" },
  ];

  const programTypes = [
    "Career Transition",
    "Technical Skills",
    "Leadership Development",
    "Startup Guidance",
    "Personal Branding",
    "Financial Literacy",
    "Work-Life Balance",
  ];

  const updateApplicationData = (field, value) => {
    setApplicationData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateApplication = () => {
    const newErrors = {};

    if (!applicationData.programType)
      newErrors.programType = "Please select a program type";
    if (!applicationData.goals.trim())
      newErrors.goals = "Please describe your goals";
    if (!applicationData.experience.trim())
      newErrors.experience = "Please describe your experience";
    if (!applicationData.timeCommitment)
      newErrors.timeCommitment = "Please select time commitment";
    if (!applicationData.preferredFormat)
      newErrors.preferredFormat = "Please select preferred format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (validateApplication()) {
      alert(`Application submitted successfully to ${selectedMentor?.name}!`);
      setApplicationData({
        mentorId: "",
        programType: "",
        goals: "",
        experience: "",
        timeCommitment: "",
        preferredFormat: "",
        additionalInfo: "",
      });
      setShowApplicationForm(false);
      setSelectedMentor(null);
    }
  };

  const openApplication = (mentor) => {
    setSelectedMentor(mentor);
    setApplicationData((prev) => ({ ...prev, mentorId: mentor.id }));
    setShowApplicationForm(true);
  };

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      searchTerm === "" ||
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.expertise.some((exp) =>
        exp.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesExpertise =
      filterExpertise === "all" || mentor.expertise.includes(filterExpertise);

    const matchesAvailability =
      filterAvailability === "all" ||
      mentor.availability === filterAvailability;

    return matchesSearch && matchesExpertise && matchesAvailability;
  });

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case "Available":
        return "text-primary";
      case "Limited":
        return "text-accent";
      case "Waitlist":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  const getAvailabilityBadge = (availability) => {
    switch (availability) {
      case "Available":
        return "bg-primary/10 text-primary";
      case "Limited":
        return "bg-accent/10 text-accent";
      case "Waitlist":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Users className="text-secondary" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary text-balance">
              Mentorship Programs
            </h1>
            <p className="text-muted-foreground text-pretty">
              Connect with experienced mentors to accelerate your career growth
              and personal development.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-border">
        <button
          onClick={() => setActiveTab("browse")}
          className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
            activeTab === "browse"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Browse Mentors
        </button>
        <button
          onClick={() => setActiveTab("programs")}
          className={`pb-3 px-1 border-b-2 font-medium transition-colors ${
            activeTab === "programs"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Program Types
        </button>
      </div>

      {activeTab === "browse" && (
        <>
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={filterExpertise}
                  onChange={(e) => setFilterExpertise(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                >
                  <option value="all">All Expertise</option>
                  {expertiseAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>

                <select
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                >
                  {availabilityFilters.map((filter) => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-card rounded-lg border border-border">
                <Users
                  className="mx-auto text-muted-foreground mb-4"
                  size={48}
                />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  No Mentors Found
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm ||
                  filterExpertise !== "all" ||
                  filterAvailability !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No mentors available at the moment."}
                </p>
              </div>
            ) : (
              filteredMentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={
                          mentor.imageUrl ||
                          "/placeholder.svg?height=80&width=80&query=professional woman"
                        }
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-card-foreground mb-1">
                          {mentor.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                          {mentor.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {mentor.company}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityBadge(
                          mentor.availability
                        )}`}
                      >
                        {mentor.availability}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-accent fill-current" size={16} />
                        <span className="text-sm font-medium">
                          {mentor.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({mentor.reviewCount})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        <span>{mentor.location}</span>
                      </div>
                    </div>

                    <p className="text-sm text-card-foreground mb-4 text-pretty">
                      {mentor.bio}
                    </p>

                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-2">
                        Expertise:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Mentees</p>
                        <p className="font-medium text-card-foreground">
                          {mentor.menteeCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Success Stories</p>
                        <p className="font-medium text-card-foreground">
                          {mentor.successStories}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rate</p>
                        <p className="font-medium text-card-foreground">
                          {mentor.hourlyRate}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Response Time</p>
                        <p className="font-medium text-card-foreground">
                          {mentor.responseTime}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => openApplication(mentor)}
                        disabled={mentor.availability === "Waitlist"}
                        className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                          mentor.availability === "Waitlist"
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        {mentor.availability === "Waitlist"
                          ? "Join Waitlist"
                          : "Apply for Mentorship"}
                      </button>

                      <div className="flex gap-2">
                        <a
                          href={`mailto:mentor${mentor.id}@example.com`}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors"
                        >
                          <Mail size={14} />
                          Contact
                        </a>
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                          <MessageCircle size={14} />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === "programs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Career Transition",
              description:
                "Navigate career changes with guidance from experienced professionals",
              duration: "3-6 months",
              format: "1-on-1 sessions",
              focus: [
                "Resume building",
                "Interview prep",
                "Networking",
                "Industry insights",
              ],
            },
            {
              title: "Technical Skills",
              description:
                "Develop technical expertise with hands-on mentorship",
              duration: "4-8 months",
              format: "Project-based",
              focus: [
                "Skill development",
                "Code reviews",
                "Best practices",
                "Portfolio building",
              ],
            },
            {
              title: "Leadership Development",
              description:
                "Build leadership skills and advance to management roles",
              duration: "6-12 months",
              format: "Group & 1-on-1",
              focus: [
                "Team management",
                "Communication",
                "Strategic thinking",
                "Decision making",
              ],
            },
            {
              title: "Startup Guidance",
              description:
                "Launch and scale your business with entrepreneurial mentorship",
              duration: "6-18 months",
              format: "Flexible",
              focus: [
                "Business planning",
                "Funding",
                "Market validation",
                "Growth strategies",
              ],
            },
            {
              title: "Personal Branding",
              description: "Build your professional brand and online presence",
              duration: "2-4 months",
              format: "Workshop style",
              focus: [
                "Brand strategy",
                "Content creation",
                "Social media",
                "Networking",
              ],
            },
            {
              title: "Financial Literacy",
              description: "Master personal finance and investment strategies",
              duration: "3-6 months",
              format: "Educational",
              focus: [
                "Budgeting",
                "Investing",
                "Retirement planning",
                "Debt management",
              ],
            },
          ].map((program, index) => (
            <div
              key={index}
              className="bg-card rounded-lg border border-border p-6"
            >
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {program.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 text-pretty">
                {program.description}
              </p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="text-muted-foreground" size={14} />
                  <span className="text-card-foreground">
                    Duration: {program.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="text-muted-foreground" size={14} />
                  <span className="text-card-foreground">
                    Format: {program.format}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">
                  Focus Areas:
                </p>
                <div className="flex flex-wrap gap-1">
                  {program.focus.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Find Mentors
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Apply for Mentorship with {selectedMentor.name}
                </h2>
                <button
                  onClick={() => {
                    setShowApplicationForm(false);
                    setSelectedMentor(null);
                  }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                {/* Program Type */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Program Type *
                  </label>
                  <select
                    value={applicationData.programType}
                    onChange={(e) =>
                      updateApplicationData("programType", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.programType
                        ? "border-destructive"
                        : "border-border"
                    } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                  >
                    <option value="">Select a program type</option>
                    {programTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.programType && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.programType}
                    </p>
                  )}
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Goals *
                  </label>
                  <textarea
                    value={applicationData.goals}
                    onChange={(e) =>
                      updateApplicationData("goals", e.target.value)
                    }
                    placeholder="What do you hope to achieve through this mentorship?"
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.goals ? "border-destructive" : "border-border"
                    } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none`}
                  />
                  {errors.goals && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.goals}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your Experience *
                  </label>
                  <textarea
                    value={applicationData.experience}
                    onChange={(e) =>
                      updateApplicationData("experience", e.target.value)
                    }
                    placeholder="Tell us about your background and current situation"
                    rows={3}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.experience ? "border-destructive" : "border-border"
                    } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none`}
                  />
                  {errors.experience && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Time Commitment */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Time Commitment *
                  </label>
                  <select
                    value={applicationData.timeCommitment}
                    onChange={(e) =>
                      updateApplicationData("timeCommitment", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.timeCommitment
                        ? "border-destructive"
                        : "border-border"
                    } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                  >
                    <option value="">Select time commitment</option>
                    <option value="1-2 hours/week">1-2 hours per week</option>
                    <option value="3-4 hours/week">3-4 hours per week</option>
                    <option value="5+ hours/week">5+ hours per week</option>
                    <option value="Flexible">Flexible schedule</option>
                  </select>
                  {errors.timeCommitment && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.timeCommitment}
                    </p>
                  )}
                </div>

                {/* Preferred Format */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preferred Format *
                  </label>
                  <select
                    value={applicationData.preferredFormat}
                    onChange={(e) =>
                      updateApplicationData("preferredFormat", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.preferredFormat
                        ? "border-destructive"
                        : "border-border"
                    } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                  >
                    <option value="">Select preferred format</option>
                    <option value="Video calls">Video calls</option>
                    <option value="Phone calls">Phone calls</option>
                    <option value="In-person">In-person meetings</option>
                    <option value="Email/messaging">Email/messaging</option>
                    <option value="Mixed">Mixed approach</option>
                  </select>
                  {errors.preferredFormat && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.preferredFormat}
                    </p>
                  )}
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Information
                  </label>
                  <textarea
                    value={applicationData.additionalInfo}
                    onChange={(e) =>
                      updateApplicationData("additionalInfo", e.target.value)
                    }
                    placeholder="Any additional information you'd like to share"
                    rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => {
                      setShowApplicationForm(false);
                      setSelectedMentor(null);
                    }}
                    className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mentorship;
