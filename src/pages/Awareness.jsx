import React from "react";

import { useState } from "react";
import {
  Plus,
  Search,
  Megaphone,
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  X,
  User,
} from "lucide-react";

const Awareness = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    isOnline: false,
    organizer: "",
    contactEmail: "",
    websiteLink: "",
    maxParticipants: "",
    objectives: "",
    targetAudience: "",
  });
  const [errors, setErrors] = useState({});

  // Dummy data for awareness programs
  const [programs] = useState([
    {
      id: 1,
      title: "Know Your Rights: Legal Awareness Workshop",
      description:
        "Comprehensive workshop covering women's legal rights, workplace harassment laws, and how to seek legal help.",
      type: "Workshop",
      startDate: "2024-03-15",
      endDate: "2024-03-15",
      startTime: "10:00",
      endTime: "16:00",
      location: "Community Center, Downtown",
      isOnline: false,
      organizer: "Legal Aid Society",
      contactEmail: "info@legalaid.org",
      websiteLink: "https://legalaid.org/workshop",
      maxParticipants: 50,
      currentParticipants: 32,
      objectives:
        "Educate women about their legal rights and available resources",
      targetAudience: "Women of all ages, especially working professionals",
      status: "upcoming",
      imageUrl: "/legal-awareness-workshop.png",
    },
    {
      id: 2,
      title: "Digital Safety & Privacy Campaign",
      description:
        "Learn how to protect yourself online, secure your digital presence, and recognize cyber threats.",
      type: "Campaign",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      startTime: "09:00",
      endTime: "17:00",
      location: "Online",
      isOnline: true,
      organizer: "CyberSafe Women",
      contactEmail: "contact@cybersafewomen.org",
      websiteLink: "https://cybersafewomen.org/campaign",
      maxParticipants: 500,
      currentParticipants: 287,
      objectives: "Increase digital literacy and online safety awareness",
      targetAudience: "Women using social media and digital platforms",
      status: "ongoing",
      imageUrl: "/digital-safety-campaign.png",
    },
    {
      id: 3,
      title: "Financial Independence Seminar",
      description:
        "Empowering women with financial literacy, investment strategies, and entrepreneurship opportunities.",
      type: "Seminar",
      startDate: "2024-04-10",
      endDate: "2024-04-10",
      startTime: "14:00",
      endTime: "18:00",
      location: "Business Center, Main Street",
      isOnline: false,
      organizer: "Women's Financial Network",
      contactEmail: "events@wfn.org",
      websiteLink: "https://wfn.org/seminar",
      maxParticipants: 100,
      currentParticipants: 67,
      objectives: "Promote financial independence and business skills",
      targetAudience:
        "Women interested in financial planning and entrepreneurship",
      status: "upcoming",
      imageUrl: "/financial-independence-seminar.png",
    },
    {
      id: 4,
      title: "Mental Health & Wellness Webinar Series",
      description:
        "Monthly webinar series focusing on mental health awareness, stress management, and self-care practices.",
      type: "Webinar",
      startDate: "2024-02-15",
      endDate: "2024-12-15",
      startTime: "19:00",
      endTime: "20:30",
      location: "Online",
      isOnline: true,
      organizer: "Wellness Warriors",
      contactEmail: "support@wellnesswarriors.org",
      websiteLink: "https://wellnesswarriors.org/webinars",
      maxParticipants: 1000,
      currentParticipants: 456,
      objectives:
        "Promote mental health awareness and provide coping strategies",
      targetAudience:
        "Women dealing with stress, anxiety, or mental health challenges",
      status: "ongoing",
      imageUrl: "/mental-health-webinar.png",
    },
    {
      id: 5,
      title: "Workplace Equality Advocacy Event",
      description:
        "Panel discussion on gender equality in the workplace, pay gap issues, and career advancement strategies.",
      type: "Event",
      startDate: "2024-01-20",
      endDate: "2024-01-20",
      startTime: "18:00",
      endTime: "21:00",
      location: "Convention Center",
      isOnline: false,
      organizer: "Equal Rights Foundation",
      contactEmail: "events@equalrights.org",
      websiteLink: "https://equalrights.org/workplace-event",
      maxParticipants: 200,
      currentParticipants: 200,
      objectives: "Advocate for workplace equality and career development",
      targetAudience: "Working women and HR professionals",
      status: "completed",
      imageUrl: "/workplace-equality-event.png",
    },
    {
      id: 6,
      title: "Self-Defense Training Program",
      description:
        "Practical self-defense training sessions to build confidence and personal safety skills.",
      type: "Training",
      startDate: "2024-05-01",
      endDate: "2024-05-30",
      startTime: "18:00",
      endTime: "20:00",
      location: "Fitness Center, Oak Avenue",
      isOnline: false,
      organizer: "Safe & Strong Academy",
      contactEmail: "training@safestrong.org",
      websiteLink: "https://safestrong.org/training",
      maxParticipants: 30,
      currentParticipants: 18,
      objectives:
        "Teach practical self-defense techniques and build confidence",
      targetAudience: "Women of all ages interested in personal safety",
      status: "upcoming",
      imageUrl: "/self-defense-training.png",
    },
  ]);

  const programTypes = [
    "Workshop",
    "Campaign",
    "Seminar",
    "Webinar",
    "Event",
    "Training",
    "Conference",
  ];

  const statusFilters = [
    { value: "all", label: "All Programs" },
    { value: "upcoming", label: "Upcoming" },
    { value: "ongoing", label: "Ongoing" },
    { value: "completed", label: "Completed" },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Program title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.type) newErrors.type = "Program type is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.organizer.trim())
      newErrors.organizer = "Organizer is required";
    if (!formData.contactEmail.trim())
      newErrors.contactEmail = "Contact email is required";
    if (
      formData.contactEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)
    ) {
      newErrors.contactEmail = "Please enter a valid email address";
    }
    if (!formData.isOnline && !formData.location.trim()) {
      newErrors.location = "Location is required for in-person events";
    }
    if (formData.websiteLink && !/^https?:\/\/.+/.test(formData.websiteLink)) {
      newErrors.websiteLink = "Please enter a valid URL";
    }
    if (formData.maxParticipants && formData.maxParticipants <= 0) {
      newErrors.maxParticipants = "Please enter a valid number of participants";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Awareness program added successfully!");
      setFormData({
        title: "",
        description: "",
        type: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        location: "",
        isOnline: false,
        organizer: "",
        contactEmail: "",
        websiteLink: "",
        maxParticipants: "",
        objectives: "",
        targetAudience: "",
      });
      setShowAddForm(false);
    }
  };

  const getProgramStatus = (program) => {
    const today = new Date();
    const startDate = new Date(program.startDate);
    const endDate = new Date(program.endDate || program.startDate);

    if (endDate < today) return "completed";
    if (startDate <= today && endDate >= today) return "ongoing";
    return "upcoming";
  };

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch =
      searchTerm === "" ||
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || program.type === filterType;

    const programStatus = getProgramStatus(program);
    const matchesStatus =
      filterStatus === "all" || programStatus === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-muted-foreground";
      case "ongoing":
        return "text-primary";
      case "upcoming":
        return "text-accent";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-muted text-muted-foreground";
      case "ongoing":
        return "bg-primary/10 text-primary";
      case "upcoming":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      Workshop: "bg-primary text-primary-foreground",
      Campaign: "bg-accent text-accent-foreground",
      Seminar: "bg-secondary text-secondary-foreground",
      Webinar: "bg-primary text-primary-foreground",
      Event: "bg-accent text-accent-foreground",
      Training: "bg-secondary text-secondary-foreground",
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Megaphone className="text-secondary" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary text-balance">
              Awareness Programs
            </h1>
            <p className="text-muted-foreground text-pretty">
              Join educational programs, workshops, and campaigns to raise
              awareness about women's rights and empowerment.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          Add Program
        </button>

        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              type="text"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              <option value="all">All Types</option>
              {programTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              {statusFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-card rounded-lg border border-border">
            <Megaphone
              className="mx-auto text-muted-foreground mb-4"
              size={48}
            />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No Programs Found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== "all" || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No awareness programs available at the moment."}
            </p>
          </div>
        ) : (
          filteredPrograms.map((program) => {
            const status = getProgramStatus(program);
            const participationRate = Math.round(
              (program.currentParticipants / program.maxParticipants) * 100
            );

            return (
              <div
                key={program.id}
                className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={
                    program.imageUrl ||
                    "/placeholder.svg?height=200&width=400&query=awareness program"
                  }
                  alt={program.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(
                        program.type
                      )}`}
                    >
                      {program.type}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        status
                      )}`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty">
                    {program.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className={getStatusColor(status)} size={14} />
                      <span className="text-card-foreground">
                        {formatDate(program.startDate)}
                        {program.endDate &&
                          program.endDate !== program.startDate && (
                            <span> - {formatDate(program.endDate)}</span>
                          )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="text-muted-foreground" size={14} />
                      <span className="text-card-foreground">
                        {formatTime(program.startTime)}
                        {program.endTime && (
                          <span> - {formatTime(program.endTime)}</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="text-muted-foreground" size={14} />
                      <span className="text-card-foreground">
                        {program.isOnline ? "Online Event" : program.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <User className="text-muted-foreground" size={14} />
                      <span className="text-card-foreground">
                        by {program.organizer}
                      </span>
                    </div>

                    {program.maxParticipants && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="text-muted-foreground" size={14} />
                        <span className="text-card-foreground">
                          {program.currentParticipants} /{" "}
                          {program.maxParticipants} participants (
                          {participationRate}%)
                        </span>
                      </div>
                    )}
                  </div>

                  {program.maxParticipants && (
                    <div className="mb-4">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${participationRate}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    {program.objectives && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Objectives:
                        </p>
                        <p className="text-sm text-card-foreground text-pretty">
                          {program.objectives}
                        </p>
                      </div>
                    )}

                    {program.targetAudience && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Target Audience:
                        </p>
                        <p className="text-sm text-card-foreground text-pretty">
                          {program.targetAudience}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {program.websiteLink && (
                      <a
                        href={program.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          status === "completed"
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        <ExternalLink size={16} />
                        {status === "completed"
                          ? "Program Ended"
                          : status === "ongoing"
                          ? "Join Now"
                          : "Learn More"}
                      </a>
                    )}

                    {program.contactEmail && (
                      <a
                        href={`mailto:${program.contactEmail}`}
                        className="text-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Contact: {program.contactEmail}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Program Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Add New Awareness Program
                </h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Program Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateFormData("title", e.target.value)}
                      placeholder="Enter program title"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.title ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.title && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        updateFormData("description", e.target.value)
                      }
                      placeholder="Describe the program..."
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.description
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none`}
                    />
                    {errors.description && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Program Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => updateFormData("type", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.type ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    >
                      <option value="">Select type</option>
                      {programTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.type && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.type}
                      </p>
                    )}
                  </div>

                  {/* Organizer */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Organizer *
                    </label>
                    <input
                      type="text"
                      value={formData.organizer}
                      onChange={(e) =>
                        updateFormData("organizer", e.target.value)
                      }
                      placeholder="Organization name"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.organizer
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.organizer && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.organizer}
                      </p>
                    )}
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) =>
                        updateFormData("startDate", e.target.value)
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.startDate
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.startDate && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.startDate}
                      </p>
                    )}
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) =>
                        updateFormData("endDate", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Start Time */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        updateFormData("startTime", e.target.value)
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.startTime
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.startTime && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.startTime}
                      </p>
                    )}
                  </div>

                  {/* End Time */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        updateFormData("endTime", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Online Event Checkbox */}
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isOnline}
                        onChange={(e) =>
                          updateFormData("isOnline", e.target.checked)
                        }
                        className="rounded border-border"
                      />
                      <span className="text-sm font-medium text-foreground">
                        This is an online event
                      </span>
                    </label>
                  </div>

                  {/* Location */}
                  {!formData.isOnline && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) =>
                          updateFormData("location", e.target.value)
                        }
                        placeholder="Enter venue address"
                        className={`w-full px-3 py-2 rounded-lg border ${
                          errors.location
                            ? "border-destructive"
                            : "border-border"
                        } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                      />
                      {errors.location && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.location}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Contact Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        updateFormData("contactEmail", e.target.value)
                      }
                      placeholder="contact@example.com"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.contactEmail
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.contactEmail && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.contactEmail}
                      </p>
                    )}
                  </div>

                  {/* Max Participants */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Max Participants
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.maxParticipants}
                      onChange={(e) =>
                        updateFormData("maxParticipants", e.target.value)
                      }
                      placeholder="100"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.maxParticipants
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.maxParticipants && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.maxParticipants}
                      </p>
                    )}
                  </div>

                  {/* Website Link */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Website Link
                    </label>
                    <input
                      type="url"
                      value={formData.websiteLink}
                      onChange={(e) =>
                        updateFormData("websiteLink", e.target.value)
                      }
                      placeholder="https://example.com"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.websiteLink
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.websiteLink && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.websiteLink}
                      </p>
                    )}
                  </div>

                  {/* Objectives */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Program Objectives
                    </label>
                    <textarea
                      value={formData.objectives}
                      onChange={(e) =>
                        updateFormData("objectives", e.target.value)
                      }
                      placeholder="What are the main goals of this program?"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                    />
                  </div>

                  {/* Target Audience */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Target Audience
                    </label>
                    <textarea
                      value={formData.targetAudience}
                      onChange={(e) =>
                        updateFormData("targetAudience", e.target.value)
                      }
                      placeholder="Who is this program designed for?"
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Add Program
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

export default Awareness;
