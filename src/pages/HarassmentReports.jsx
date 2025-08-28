import React from "react";

import { useState } from "react";
import {
  Plus,
  X,
  AlertTriangle,
  FileText,
  Upload,
  Search,
  Eye,
  Shield,
} from "lucide-react";

const HarassmentReports = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    category: "",
    date: "",
    time: "",
    isDateTimeExact: false,
    location: "",
    isLocationExact: false,
    harasserName: "",
    description: "",
    evidence: null,
  });
  const [errors, setErrors] = useState({});

  // Dummy data for existing reports
  const [reports] = useState([
    {
      id: "RPT-001",
      category: "Workplace",
      status: "Pending",
      date: "2024-01-15",
      location: "Office Building A",
      description: "Inappropriate comments during team meeting...",
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "RPT-002",
      category: "Online",
      status: "Resolved",
      date: "2024-01-10",
      location: "Social Media Platform",
      description: "Received threatening messages on social media...",
      createdAt: "2024-01-10T14:20:00Z",
    },
    {
      id: "RPT-003",
      category: "Physical",
      status: "Under Review",
      date: "2024-01-08",
      location: "Public Transport",
      description: "Unwanted physical contact on bus...",
      createdAt: "2024-01-08T08:45:00Z",
    },
  ]);

  const categories = [
    { value: "workplace", label: "Workplace Harassment" },
    { value: "online", label: "Online Harassment" },
    { value: "physical", label: "Physical Harassment" },
    { value: "verbal", label: "Verbal Harassment" },
    { value: "sexual", label: "Sexual Harassment" },
    { value: "stalking", label: "Stalking" },
    { value: "other", label: "Other" },
  ];

  const statusOptions = [
    { value: "all", label: "All Reports" },
    { value: "Pending", label: "Pending" },
    { value: "Under Review", label: "Under Review" },
    { value: "Resolved", label: "Resolved" },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    else if (formData.description.trim().length < 10)
      newErrors.description = "Description must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would submit to an API
      alert(
        "Report submitted successfully. You will receive a confirmation email shortly."
      );
      setFormData({
        category: "",
        date: "",
        time: "",
        isDateTimeExact: false,
        location: "",
        isLocationExact: false,
        harasserName: "",
        description: "",
        evidence: null,
      });
      setShowReportForm(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateFormData("evidence", file);
    }
  };

  const filteredReports = reports.filter((report) => {
    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-secondary text-secondary-foreground";
      case "Under Review":
        return "bg-accent text-accent-foreground";
      case "Resolved":
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
          <div className="p-2 bg-primary/10 rounded-lg">
            <Shield className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary text-balance">
              Harassment Reporting
            </h1>
            <p className="text-muted-foreground text-pretty">
              Report incidents safely and confidentially. Your privacy and
              safety are our top priority.
            </p>
          </div>
        </div>

        {/* Safety Notice */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-accent mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-card-foreground mb-1">
                Safety & Privacy Notice
              </h3>
              <p className="text-sm text-muted-foreground text-pretty">
                All reports are handled confidentially. If you're in immediate
                danger, please contact emergency services. Our support team will
                review your report within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => setShowReportForm(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus size={20} />
              New Report
            </button>

            <div className="flex gap-4 flex-1">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <AlertTriangle
                  className="mx-auto text-muted-foreground mb-4"
                  size={48}
                />
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                  No Reports Found
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "You haven't submitted any reports yet."}
                </p>
              </div>
            ) : (
              filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-card rounded-lg border border-border p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <AlertTriangle className="text-primary" size={16} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">
                          Report {report.id}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        report.status
                      )}`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium text-card-foreground">
                        {report.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium text-card-foreground">
                        {report.date}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-card-foreground">
                        {report.location}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">
                      Description
                    </p>
                    <p className="text-card-foreground text-pretty">
                      {report.description}
                    </p>
                  </div>

                  <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Report Form Side Panel */}
        {showReportForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
            <div className="bg-background w-full max-w-md h-full overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">
                    New Report
                  </h2>
                  <button
                    onClick={() => setShowReportForm(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        updateFormData("category", e.target.value)
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.category ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateFormData("date", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          errors.date ? "border-destructive" : "border-border"
                        } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                      />
                      {errors.date && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Time *
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => updateFormData("time", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          errors.time ? "border-destructive" : "border-border"
                        } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                      />
                      {errors.time && (
                        <p className="text-destructive text-sm mt-1">
                          {errors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isDateTimeExact"
                      checked={formData.isDateTimeExact}
                      onChange={(e) =>
                        updateFormData("isDateTimeExact", e.target.checked)
                      }
                      className="rounded border-border"
                    />
                    <label
                      htmlFor="isDateTimeExact"
                      className="text-sm text-foreground"
                    >
                      Is this date/time exact?
                    </label>
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
                      placeholder="Where did this incident occur?"
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

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="isLocationExact"
                      checked={formData.isLocationExact}
                      onChange={(e) =>
                        updateFormData("isLocationExact", e.target.checked)
                      }
                      className="rounded border-border"
                    />
                    <label
                      htmlFor="isLocationExact"
                      className="text-sm text-foreground"
                    >
                      Is this location exact?
                    </label>
                  </div>

                  {/* Harasser Name */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Harasser Name
                    </label>
                    <input
                      type="text"
                      value={formData.harasserName}
                      onChange={(e) =>
                        updateFormData("harasserName", e.target.value)
                      }
                      placeholder="Name (if known)"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        updateFormData("description", e.target.value)
                      }
                      placeholder="Please describe what happened in detail..."
                      rows={4}
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

                  {/* Evidence Upload */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Evidence
                    </label>
                    {formData.evidence ? (
                      <div className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border">
                        <FileText size={20} className="text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-card-foreground">
                            {formData.evidence.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {(formData.evidence.size / 1024 / 1024).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateFormData("evidence", null)}
                          className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="block w-full p-4 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:bg-muted/50 transition-colors">
                        <Upload
                          size={24}
                          className="mx-auto text-muted-foreground mb-2"
                        />
                        <p className="text-sm text-muted-foreground">
                          Upload images or videos (optional)
                        </p>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Submit Report
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HarassmentReports;
