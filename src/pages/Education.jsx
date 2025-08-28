import React from "react";

import { useState } from "react";
import {
  Plus,
  Search,
  BookOpen,
  Calendar,
  MapPin,
  Globe,
  Building,
  X,
  ExternalLink,
} from "lucide-react";

const Education = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "",
    provider: "",
    startDate: "",
    endDate: "",
    location: "",
    isOnline: false,
    resourceLink: "",
  });
  const [errors, setErrors] = useState({});

  // Dummy data for education resources
  const [resources] = useState([
    {
      id: 1,
      title: "Women in Leadership Certificate",
      description:
        "Comprehensive program focusing on developing leadership skills for women in corporate environments.",
      level: "intermediate",
      provider: "Professional Development Institute",
      startDate: "2024-02-15",
      endDate: "2024-05-15",
      location: "New York, NY",
      isOnline: false,
      resourceLink: "https://example.com/leadership-cert",
      category: "Leadership",
    },
    {
      id: 2,
      title: "Digital Marketing Fundamentals",
      description:
        "Learn the basics of digital marketing including SEO, social media, and content marketing strategies.",
      level: "beginner",
      provider: "Online Learning Academy",
      startDate: "2024-01-20",
      endDate: "2024-03-20",
      location: "Online",
      isOnline: true,
      resourceLink: "https://example.com/digital-marketing",
      category: "Marketing",
    },
    {
      id: 3,
      title: "Advanced Data Science Bootcamp",
      description:
        "Intensive program covering machine learning, data visualization, and statistical analysis.",
      level: "advanced",
      provider: "Tech Skills University",
      startDate: "2024-03-01",
      endDate: "2024-08-01",
      location: "San Francisco, CA",
      isOnline: false,
      resourceLink: "https://example.com/data-science",
      category: "Technology",
    },
    {
      id: 4,
      title: "Financial Literacy for Women",
      description:
        "Essential financial planning, investment strategies, and budgeting skills tailored for women.",
      level: "beginner",
      provider: "Women's Financial Network",
      startDate: "2024-02-01",
      endDate: "2024-04-01",
      location: "Online",
      isOnline: true,
      resourceLink: "https://example.com/financial-literacy",
      category: "Finance",
    },
    {
      id: 5,
      title: "Public Speaking Mastery",
      description:
        "Build confidence and master the art of public speaking and presentation skills.",
      level: "intermediate",
      provider: "Communication Excellence Center",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      location: "Chicago, IL",
      isOnline: false,
      resourceLink: "https://example.com/public-speaking",
      category: "Communication",
    },
    {
      id: 6,
      title: "Entrepreneurship for Women",
      description:
        "Complete guide to starting and scaling a business, with focus on challenges faced by women entrepreneurs.",
      level: "intermediate",
      provider: "Business Innovation Hub",
      startDate: "2024-02-10",
      endDate: "2024-06-10",
      location: "Online",
      isOnline: true,
      resourceLink: "https://example.com/entrepreneurship",
      category: "Business",
    },
  ]);

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "online", label: "Online Only" },
    { value: "offline", label: "In-Person Only" },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.level) newErrors.level = "Level is required";
    if (!formData.provider.trim()) newErrors.provider = "Provider is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (
      formData.resourceLink &&
      !/^https?:\/\/.+/.test(formData.resourceLink)
    ) {
      newErrors.resourceLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Resource added successfully!");
      setFormData({
        title: "",
        description: "",
        level: "",
        provider: "",
        startDate: "",
        endDate: "",
        location: "",
        isOnline: false,
        resourceLink: "",
      });
      setShowAddForm(false);
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      filterLevel === "all" || resource.level === filterLevel;

    const matchesType =
      filterType === "all" ||
      (filterType === "online" && resource.isOnline) ||
      (filterType === "offline" && !resource.isOnline);

    return matchesSearch && matchesLevel && matchesType;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "bg-secondary text-secondary-foreground";
      case "intermediate":
        return "bg-accent text-accent-foreground";
      case "advanced":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent/10 rounded-lg">
            <BookOpen className="text-accent" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary text-balance">
              Education Resources
            </h1>
            <p className="text-muted-foreground text-pretty">
              Discover learning opportunities, courses, and educational programs
              to advance your skills and career.
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
          Add Resource
        </button>

        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              {levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              {typeOptions.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-card rounded-lg border border-border">
            <BookOpen
              className="mx-auto text-muted-foreground mb-4"
              size={48}
            />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No Resources Found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || filterLevel !== "all" || filterType !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No education resources available yet."}
            </p>
          </div>
        ) : (
          filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      resource.level
                    )}`}
                  >
                    {resource.level.charAt(0).toUpperCase() +
                      resource.level.slice(1)}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                    {resource.category}
                  </span>
                </div>
                {resource.isOnline ? (
                  <Globe className="text-accent" size={16} />
                ) : (
                  <MapPin className="text-primary" size={16} />
                )}
              </div>

              <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">
                {resource.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 text-pretty">
                {resource.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="text-muted-foreground" size={14} />
                  <span className="text-card-foreground">
                    {resource.provider}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="text-muted-foreground" size={14} />
                  <span className="text-card-foreground">
                    {new Date(resource.startDate).toLocaleDateString()} -{" "}
                    {resource.endDate
                      ? new Date(resource.endDate).toLocaleDateString()
                      : "Ongoing"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {resource.isOnline ? (
                    <Globe className="text-muted-foreground" size={14} />
                  ) : (
                    <MapPin className="text-muted-foreground" size={14} />
                  )}
                  <span className="text-card-foreground">
                    {resource.location}
                  </span>
                </div>
              </div>

              {resource.resourceLink && (
                <a
                  href={resource.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                >
                  <ExternalLink size={14} />
                  View Resource
                </a>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add Resource Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Add Education Resource
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
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateFormData("title", e.target.value)}
                      placeholder="Enter resource title"
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
                      placeholder="Describe the resource..."
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

                  {/* Level */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Level *
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => updateFormData("level", e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.level ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    >
                      <option value="">Select level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                    {errors.level && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.level}
                      </p>
                    )}
                  </div>

                  {/* Provider */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Provider *
                    </label>
                    <input
                      type="text"
                      value={formData.provider}
                      onChange={(e) =>
                        updateFormData("provider", e.target.value)
                      }
                      placeholder="Organization or institution"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.provider ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.provider && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.provider}
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

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        updateFormData("location", e.target.value)
                      }
                      placeholder="City, State or 'Online'"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.location ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.location && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.location}
                      </p>
                    )}
                  </div>

                  {/* Resource Link */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Resource Link
                    </label>
                    <input
                      type="url"
                      value={formData.resourceLink}
                      onChange={(e) =>
                        updateFormData("resourceLink", e.target.value)
                      }
                      placeholder="https://example.com"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.resourceLink
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.resourceLink && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.resourceLink}
                      </p>
                    )}
                  </div>

                  {/* Online Checkbox */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isOnline"
                        checked={formData.isOnline}
                        onChange={(e) =>
                          updateFormData("isOnline", e.target.checked)
                        }
                        className="rounded border-border"
                      />
                      <label
                        htmlFor="isOnline"
                        className="text-sm text-foreground"
                      >
                        This is an online resource
                      </label>
                    </div>
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
                    Add Resource
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

export default Education;
