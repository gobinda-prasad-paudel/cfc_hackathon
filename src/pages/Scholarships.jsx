import React from "react";

import { useState } from "react";
import {
  Plus,
  Search,
  GraduationCap,
  Calendar,
  Users,
  ExternalLink,
  X,
} from "lucide-react";

const Scholarships = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDeadline, setFilterDeadline] = useState("all");
  const [filterAmount, setFilterAmount] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    websiteLink: "",
    eligibilityCriteria: "",
    deadline: "",
    amount: "",
    provider: "",
    category: "",
  });
  const [errors, setErrors] = useState({});

  // Dummy data for scholarships
  const [scholarships] = useState([
    {
      id: 1,
      name: "Women in STEM Excellence Scholarship",
      description:
        "Supporting women pursuing degrees in Science, Technology, Engineering, and Mathematics fields.",
      imageUrl: "/women-stem-scholarship.png",
      websiteLink: "https://example.com/stem-scholarship",
      eligibilityCriteria:
        "Female students enrolled in STEM programs, GPA 3.5+, undergraduate or graduate level",
      deadline: "2024-03-15",
      amount: 5000,
      provider: "STEM Education Foundation",
      category: "STEM",
      applicants: 234,
      awarded: 15,
    },
    {
      id: 2,
      name: "Entrepreneurial Women Leadership Grant",
      description:
        "Empowering women entrepreneurs with funding for business education and startup costs.",
      imageUrl: "/women-entrepreneur-scholarship.png",
      websiteLink: "https://example.com/entrepreneur-grant",
      eligibilityCriteria:
        "Women-owned businesses, business plan required, 2+ years experience",
      deadline: "2024-04-30",
      amount: 10000,
      provider: "Women's Business Network",
      category: "Business",
      applicants: 156,
      awarded: 8,
    },
    {
      id: 3,
      name: "Legal Aid Education Scholarship",
      description:
        "Supporting women pursuing law degrees with focus on social justice and women's rights.",
      imageUrl: "/women-law-scholarship.png",
      websiteLink: "https://example.com/legal-scholarship",
      eligibilityCriteria:
        "Law school students, demonstrated interest in women's rights, financial need",
      deadline: "2024-02-28",
      amount: 7500,
      provider: "Legal Justice Institute",
      category: "Law",
      applicants: 89,
      awarded: 12,
    },
    {
      id: 4,
      name: "Healthcare Heroes Scholarship",
      description:
        "Recognizing women in healthcare fields who demonstrate exceptional dedication to patient care.",
      imageUrl: "/women-healthcare-scholarship.png",
      websiteLink: "https://example.com/healthcare-scholarship",
      eligibilityCriteria:
        "Healthcare program students, clinical experience required, community service",
      deadline: "2024-05-15",
      amount: 3000,
      provider: "Healthcare Excellence Foundation",
      category: "Healthcare",
      applicants: 178,
      awarded: 20,
    },
    {
      id: 5,
      name: "Creative Arts & Media Scholarship",
      description:
        "Supporting women artists, writers, and media professionals in their creative endeavors.",
      imageUrl: "/women-arts-scholarship.png",
      websiteLink: "https://example.com/arts-scholarship",
      eligibilityCriteria:
        "Creative arts students, portfolio submission required, any level",
      deadline: "2024-06-01",
      amount: 2500,
      provider: "Arts & Culture Society",
      category: "Arts",
      applicants: 267,
      awarded: 25,
    },
    {
      id: 6,
      name: "Single Mother Education Support",
      description:
        "Dedicated funding for single mothers returning to education to build better futures.",
      imageUrl: "/single-mother-scholarship.png",
      websiteLink: "https://example.com/single-mother-scholarship",
      eligibilityCriteria:
        "Single mothers, enrolled in degree program, financial need demonstrated",
      deadline: "2024-07-20",
      amount: 4000,
      provider: "Family Support Network",
      category: "General",
      applicants: 312,
      awarded: 30,
    },
  ]);

  const deadlineFilters = [
    { value: "all", label: "All Deadlines" },
    { value: "soon", label: "Due Soon (30 days)" },
    { value: "later", label: "Due Later" },
  ];

  const amountFilters = [
    { value: "all", label: "All Amounts" },
    { value: "under5k", label: "Under $5,000" },
    { value: "5k-10k", label: "$5,000 - $10,000" },
    { value: "over10k", label: "Over $10,000" },
  ];

  const categories = [
    "STEM",
    "Business",
    "Law",
    "Healthcare",
    "Arts",
    "General",
    "Education",
    "Technology",
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Scholarship name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.eligibilityCriteria.trim())
      newErrors.eligibilityCriteria = "Eligibility criteria is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (!formData.amount || formData.amount <= 0)
      newErrors.amount = "Please enter a valid amount";
    if (!formData.provider.trim()) newErrors.provider = "Provider is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.websiteLink && !/^https?:\/\/.+/.test(formData.websiteLink)) {
      newErrors.websiteLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Scholarship added successfully!");
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        websiteLink: "",
        eligibilityCriteria: "",
        deadline: "",
        amount: "",
        provider: "",
        category: "",
      });
      setShowAddForm(false);
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch =
      searchTerm === "" ||
      scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.category.toLowerCase().includes(searchTerm.toLowerCase());

    const daysUntilDeadline = getDaysUntilDeadline(scholarship.deadline);
    const matchesDeadline =
      filterDeadline === "all" ||
      (filterDeadline === "soon" && daysUntilDeadline <= 30) ||
      (filterDeadline === "later" && daysUntilDeadline > 30);

    const matchesAmount =
      filterAmount === "all" ||
      (filterAmount === "under5k" && scholarship.amount < 5000) ||
      (filterAmount === "5k-10k" &&
        scholarship.amount >= 5000 &&
        scholarship.amount <= 10000) ||
      (filterAmount === "over10k" && scholarship.amount > 10000);

    return matchesSearch && matchesDeadline && matchesAmount;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getDeadlineColor = (deadline) => {
    const daysUntil = getDaysUntilDeadline(deadline);
    if (daysUntil < 0) return "text-destructive";
    if (daysUntil <= 7) return "text-destructive";
    if (daysUntil <= 30) return "text-accent";
    return "text-muted-foreground";
  };

  const getCategoryColor = (category) => {
    const colors = {
      STEM: "bg-primary text-primary-foreground",
      Business: "bg-accent text-accent-foreground",
      Law: "bg-secondary text-secondary-foreground",
      Healthcare: "bg-primary text-primary-foreground",
      Arts: "bg-accent text-accent-foreground",
      General: "bg-muted text-muted-foreground",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <GraduationCap className="text-secondary" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary text-balance">
              Scholarship Listings
            </h1>
            <p className="text-muted-foreground text-pretty">
              Discover funding opportunities for education, training, and
              professional development.
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
          Add Scholarship
        </button>

        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterDeadline}
              onChange={(e) => setFilterDeadline(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              {deadlineFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>

            <select
              value={filterAmount}
              onChange={(e) => setFilterAmount(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              {amountFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scholarships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScholarships.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-card rounded-lg border border-border">
            <GraduationCap
              className="mx-auto text-muted-foreground mb-4"
              size={48}
            />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No Scholarships Found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || filterDeadline !== "all" || filterAmount !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No scholarships available at the moment."}
            </p>
          </div>
        ) : (
          filteredScholarships.map((scholarship) => {
            const daysUntilDeadline = getDaysUntilDeadline(
              scholarship.deadline
            );

            return (
              <div
                key={scholarship.id}
                className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={scholarship.imageUrl || "/placeholder.svg"}
                  alt={scholarship.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                        scholarship.category
                      )}`}
                    >
                      {scholarship.category}
                    </span>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        {formatCurrency(scholarship.amount)}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">
                    {scholarship.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty">
                    {scholarship.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar
                        className={`${getDeadlineColor(scholarship.deadline)}`}
                        size={14}
                      />
                      <span
                        className={`font-medium ${getDeadlineColor(
                          scholarship.deadline
                        )}`}
                      >
                        Due:{" "}
                        {new Date(scholarship.deadline).toLocaleDateString()}
                        {daysUntilDeadline >= 0 && (
                          <span className="ml-1">
                            (
                            {daysUntilDeadline === 0
                              ? "Today"
                              : `${daysUntilDeadline} days left`}
                            )
                          </span>
                        )}
                        {daysUntilDeadline < 0 && (
                          <span className="ml-1">(Expired)</span>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="text-muted-foreground" size={14} />
                      <span className="text-card-foreground">
                        {scholarship.applicants} applicants •{" "}
                        {scholarship.awarded} awarded
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">
                      Eligibility:
                    </p>
                    <p className="text-sm text-card-foreground text-pretty">
                      {scholarship.eligibilityCriteria}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      by {scholarship.provider}
                    </p>
                    {scholarship.websiteLink && (
                      <a
                        href={scholarship.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          daysUntilDeadline < 0
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        <ExternalLink size={14} />
                        {daysUntilDeadline < 0 ? "Expired" : "Apply Now"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Scholarship Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Add New Scholarship
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
                  {/* Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Scholarship Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      placeholder="Enter scholarship name"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.name ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.name}
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
                      placeholder="Describe the scholarship..."
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

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Amount ($) *
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.amount}
                      onChange={(e) => updateFormData("amount", e.target.value)}
                      placeholder="5000"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.amount ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.amount && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.amount}
                      </p>
                    )}
                  </div>

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
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.category}
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
                      placeholder="Organization name"
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

                  {/* Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) =>
                        updateFormData("deadline", e.target.value)
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.deadline ? "border-destructive" : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.deadline && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.deadline}
                      </p>
                    )}
                  </div>

                  {/* Website Link */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Website/Application Link
                    </label>
                    <input
                      type="url"
                      value={formData.websiteLink}
                      onChange={(e) =>
                        updateFormData("websiteLink", e.target.value)
                      }
                      placeholder="https://example.com/apply"
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

                  {/* Image URL */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        updateFormData("imageUrl", e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* Eligibility Criteria */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Eligibility Criteria *
                    </label>
                    <textarea
                      value={formData.eligibilityCriteria}
                      onChange={(e) =>
                        updateFormData("eligibilityCriteria", e.target.value)
                      }
                      placeholder="List the requirements and criteria for this scholarship..."
                      rows={3}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.eligibilityCriteria
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none`}
                    />
                    {errors.eligibilityCriteria && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.eligibilityCriteria}
                      </p>
                    )}
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
                    Add Scholarship
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

export default Scholarships;
