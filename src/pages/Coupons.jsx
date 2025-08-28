import React from "react";

import { useState } from "react";
import {
  Plus,
  Search,
  Tag,
  Calendar,
  Store,
  Percent,
  DollarSign,
  X,
  Copy,
  ExternalLink,
} from "lucide-react";

const Coupons = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discountType: "percentage",
    discountValue: "",
    expiryDate: "",
    category: "",
    storeBrand: "",
    couponCode: "",
    websiteLink: "",
    termsConditions: "",
  });
  const [errors, setErrors] = useState({});
  const [copiedCode, setCopiedCode] = useState("");

  // Dummy data for coupons
  const [coupons] = useState([
    {
      id: 1,
      title: "Women's Fashion Sale",
      description:
        "Get amazing discounts on women's clothing, shoes, and accessories",
      discountType: "percentage",
      discountValue: 25,
      expiryDate: "2024-03-30",
      category: "Fashion",
      storeBrand: "StyleHub",
      couponCode: "WOMEN25",
      websiteLink: "https://stylehub.com",
      termsConditions:
        "Valid on orders above $50. Cannot be combined with other offers.",
      usedCount: 1247,
      totalCount: 5000,
    },
    {
      id: 2,
      title: "Health & Wellness Essentials",
      description:
        "Save on vitamins, supplements, and wellness products for women",
      discountType: "fixed",
      discountValue: 15,
      expiryDate: "2024-04-15",
      category: "Health",
      storeBrand: "WellnessPlus",
      couponCode: "HEALTH15",
      websiteLink: "https://wellnessplus.com",
      termsConditions: "Valid on health products only. Minimum order $30.",
      usedCount: 892,
      totalCount: 2000,
    },
    {
      id: 3,
      title: "Professional Development Books",
      description: "Educational books and courses for career advancement",
      discountType: "percentage",
      discountValue: 30,
      expiryDate: "2024-05-01",
      category: "Education",
      storeBrand: "LearnMore",
      couponCode: "LEARN30",
      websiteLink: "https://learnmore.com",
      termsConditions:
        "Valid on books and online courses. One use per customer.",
      usedCount: 456,
      totalCount: 1500,
    },
    {
      id: 4,
      title: "Tech Gadgets for Women",
      description: "Latest technology products designed for modern women",
      discountType: "fixed",
      discountValue: 50,
      expiryDate: "2024-02-28",
      category: "Technology",
      storeBrand: "TechSavvy",
      couponCode: "TECH50",
      websiteLink: "https://techsavvy.com",
      termsConditions: "Valid on selected tech products. Limited time offer.",
      usedCount: 2000,
      totalCount: 2000,
    },
    {
      id: 5,
      title: "Home & Living Decor",
      description: "Beautiful home decor items to create your perfect space",
      discountType: "percentage",
      discountValue: 20,
      expiryDate: "2024-06-30",
      category: "Home",
      storeBrand: "HomeStyle",
      couponCode: "HOME20",
      websiteLink: "https://homestyle.com",
      termsConditions:
        "Valid on home decor items. Free shipping on orders over $75.",
      usedCount: 678,
      totalCount: 3000,
    },
    {
      id: 6,
      title: "Fitness & Activewear",
      description: "Premium activewear and fitness equipment for active women",
      discountType: "percentage",
      discountValue: 35,
      expiryDate: "2024-04-20",
      category: "Fitness",
      storeBrand: "ActiveLife",
      couponCode: "FIT35",
      websiteLink: "https://activelife.com",
      termsConditions:
        "Valid on activewear and fitness equipment. Excludes sale items.",
      usedCount: 1123,
      totalCount: 4000,
    },
  ]);

  const categories = [
    "Fashion",
    "Health",
    "Education",
    "Technology",
    "Home",
    "Fitness",
    "Beauty",
    "Food",
    "Travel",
  ];

  const statusFilters = [
    { value: "all", label: "All Coupons" },
    { value: "active", label: "Active" },
    { value: "expiring", label: "Expiring Soon" },
    { value: "expired", label: "Expired" },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Coupon title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.discountValue || formData.discountValue <= 0) {
      newErrors.discountValue = "Please enter a valid discount value";
    }
    if (
      formData.discountType === "percentage" &&
      formData.discountValue > 100
    ) {
      newErrors.discountValue = "Percentage cannot exceed 100%";
    }
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.storeBrand.trim())
      newErrors.storeBrand = "Store/Brand is required";
    if (!formData.couponCode.trim())
      newErrors.couponCode = "Coupon code is required";
    if (formData.websiteLink && !/^https?:\/\/.+/.test(formData.websiteLink)) {
      newErrors.websiteLink = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Coupon added successfully!");
      setFormData({
        title: "",
        description: "",
        discountType: "percentage",
        discountValue: "",
        expiryDate: "",
        category: "",
        storeBrand: "",
        couponCode: "",
        websiteLink: "",
        termsConditions: "",
      });
      setShowAddForm(false);
    }
  };

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCouponStatus = (expiryDate) => {
    const daysUntil = getDaysUntilExpiry(expiryDate);
    if (daysUntil < 0) return "expired";
    if (daysUntil <= 7) return "expiring";
    return "active";
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      searchTerm === "" ||
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.storeBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || coupon.category === filterCategory;

    const couponStatus = getCouponStatus(coupon.expiryDate);
    const matchesStatus =
      filterStatus === "all" || couponStatus === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatDiscount = (type, value) => {
    return type === "percentage" ? `${value}% OFF` : `$${value} OFF`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "expired":
        return "text-destructive";
      case "expiring":
        return "text-accent";
      case "active":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "expired":
        return "bg-destructive/10 text-destructive";
      case "expiring":
        return "bg-accent/10 text-accent";
      case "active":
        return "bg-primary/10 text-primary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Fashion: "bg-primary text-primary-foreground",
      Health: "bg-accent text-accent-foreground",
      Education: "bg-secondary text-secondary-foreground",
      Technology: "bg-primary text-primary-foreground",
      Home: "bg-accent text-accent-foreground",
      Fitness: "bg-secondary text-secondary-foreground",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Tag className="text-secondary" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary text-balance">
              Discount Coupons
            </h1>
            <p className="text-muted-foreground text-pretty">
              Discover exclusive deals and discounts from women-friendly brands
              and services.
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
          Add Coupon
        </button>

        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              type="text"
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
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

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-card rounded-lg border border-border">
            <Tag className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No Coupons Found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || filterCategory !== "all" || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No coupons available at the moment."}
            </p>
          </div>
        ) : (
          filteredCoupons.map((coupon) => {
            const status = getCouponStatus(coupon.expiryDate);
            const daysUntilExpiry = getDaysUntilExpiry(coupon.expiryDate);
            const usagePercentage = Math.round(
              (coupon.usedCount / coupon.totalCount) * 100
            );

            return (
              <div
                key={coupon.id}
                className={`bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 ${
                  status === "expired"
                    ? "border-destructive/20 opacity-75"
                    : "border-border"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                        coupon.category
                      )}`}
                    >
                      {coupon.category}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        status
                      )}`}
                    >
                      {status === "expired"
                        ? "Expired"
                        : status === "expiring"
                        ? "Expiring Soon"
                        : "Active"}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">
                    {coupon.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 text-pretty">
                    {coupon.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {coupon.discountType === "percentage" ? (
                        <Percent className="text-primary" size={20} />
                      ) : (
                        <DollarSign className="text-primary" size={20} />
                      )}
                      <span className="text-2xl font-bold text-primary">
                        {formatDiscount(
                          coupon.discountType,
                          coupon.discountValue
                        )}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Store size={14} />
                        <span>{coupon.storeBrand}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className={getStatusColor(status)} size={14} />
                      <span className={`font-medium ${getStatusColor(status)}`}>
                        Expires:{" "}
                        {new Date(coupon.expiryDate).toLocaleDateString()}
                        {status !== "expired" && (
                          <span className="ml-1">
                            (
                            {daysUntilExpiry === 0
                              ? "Today"
                              : `${daysUntilExpiry} days left`}
                            )
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Used: {coupon.usedCount.toLocaleString()} /{" "}
                      {coupon.totalCount.toLocaleString()} ({usagePercentage}%)
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${usagePercentage}%` }}
                      />
                    </div>
                  </div>

                  {coupon.termsConditions && (
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-1">
                        Terms & Conditions:
                      </p>
                      <p className="text-sm text-card-foreground text-pretty">
                        {coupon.termsConditions}
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <code className="flex-1 font-mono text-sm font-semibold text-card-foreground">
                        {coupon.couponCode}
                      </code>
                      <button
                        onClick={() => copyToClipboard(coupon.couponCode)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        disabled={status === "expired"}
                      >
                        <Copy
                          size={16}
                          className={
                            copiedCode === coupon.couponCode
                              ? "text-primary"
                              : "text-muted-foreground"
                          }
                        />
                      </button>
                    </div>

                    {coupon.websiteLink && (
                      <a
                        href={coupon.websiteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          status === "expired"
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        <ExternalLink size={16} />
                        {status === "expired" ? "Expired" : "Use Coupon"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Coupon Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Add New Coupon
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
                      Coupon Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateFormData("title", e.target.value)}
                      placeholder="Enter coupon title"
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
                      placeholder="Describe the coupon offer..."
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

                  {/* Discount Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Discount Type *
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={(e) =>
                        updateFormData("discountType", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                    </select>
                  </div>

                  {/* Discount Value */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Discount Value *{" "}
                      {formData.discountType === "percentage" ? "(%)" : "($)"}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={
                        formData.discountType === "percentage"
                          ? "100"
                          : undefined
                      }
                      value={formData.discountValue}
                      onChange={(e) =>
                        updateFormData("discountValue", e.target.value)
                      }
                      placeholder={
                        formData.discountType === "percentage" ? "25" : "15"
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.discountValue
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.discountValue && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.discountValue}
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

                  {/* Store/Brand */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Store/Brand *
                    </label>
                    <input
                      type="text"
                      value={formData.storeBrand}
                      onChange={(e) =>
                        updateFormData("storeBrand", e.target.value)
                      }
                      placeholder="Store or brand name"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.storeBrand
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.storeBrand && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.storeBrand}
                      </p>
                    )}
                  </div>

                  {/* Coupon Code */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Coupon Code *
                    </label>
                    <input
                      type="text"
                      value={formData.couponCode}
                      onChange={(e) =>
                        updateFormData(
                          "couponCode",
                          e.target.value.toUpperCase()
                        )
                      }
                      placeholder="SAVE25"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.couponCode
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors font-mono`}
                    />
                    {errors.couponCode && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.couponCode}
                      </p>
                    )}
                  </div>

                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        updateFormData("expiryDate", e.target.value)
                      }
                      className={`w-full px-3 py-2 rounded-lg border ${
                        errors.expiryDate
                          ? "border-destructive"
                          : "border-border"
                      } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                    />
                    {errors.expiryDate && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.expiryDate}
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

                  {/* Terms & Conditions */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Terms & Conditions
                    </label>
                    <textarea
                      value={formData.termsConditions}
                      onChange={(e) =>
                        updateFormData("termsConditions", e.target.value)
                      }
                      placeholder="Enter terms and conditions for this coupon..."
                      rows={3}
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
                    Add Coupon
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

export default Coupons;
