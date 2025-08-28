import React from "react";

import { useState } from "react";
import {
  Heart,
  Search,
  DollarSign,
  Users,
  Target,
  X,
  CreditCard,
} from "lucide-react";

const Crowdfunding = () => {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    currency: "USD",
    isAnonymous: false,
    purpose: "",
    paymentMethod: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Dummy data for campaigns
  const [campaigns] = useState([
    {
      id: 1,
      title: "Emergency Support for Domestic Violence Survivors",
      description:
        "Providing immediate financial assistance for women escaping domestic violence situations.",
      category: "Emergency Support",
      goal: 50000,
      raised: 32500,
      donors: 127,
      daysLeft: 15,
      image: "/women-support-emergency.png",
      organizer: "Women's Safety Network",
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      title: "Legal Aid Fund for Women",
      description:
        "Supporting women who need legal representation but cannot afford it.",
      category: "Legal Support",
      goal: 75000,
      raised: 45200,
      donors: 89,
      daysLeft: 22,
      image: "/legal-aid-justice.png",
      organizer: "Legal Aid Society",
      createdAt: "2024-01-05",
    },
    {
      id: 3,
      title: "Women's Tech Education Scholarship",
      description:
        "Funding coding bootcamps and tech education for underrepresented women.",
      category: "Education",
      goal: 100000,
      raised: 78900,
      donors: 203,
      daysLeft: 8,
      image: "/women-technology-education.png",
      organizer: "Tech Diversity Initiative",
      createdAt: "2024-01-10",
    },
    {
      id: 4,
      title: "Small Business Grants for Women Entrepreneurs",
      description:
        "Supporting women-owned startups and small businesses with seed funding.",
      category: "Business Support",
      goal: 200000,
      raised: 156700,
      donors: 312,
      daysLeft: 30,
      image: "/women-entrepreneurs-business.png",
      organizer: "Women's Business Alliance",
      createdAt: "2024-01-15",
    },
  ]);

  // Dummy data for recent donations
  const [donations] = useState([
    {
      id: 1,
      campaignId: 1,
      donorName: "Sarah Johnson",
      amount: 250,
      currency: "USD",
      isAnonymous: false,
      purpose: "Emergency Support",
      message: "Stay strong! You're not alone.",
      createdAt: "2024-01-20T10:30:00Z",
    },
    {
      id: 2,
      campaignId: 2,
      donorName: "Anonymous",
      amount: 500,
      currency: "USD",
      isAnonymous: true,
      purpose: "Legal Aid",
      message: "",
      createdAt: "2024-01-20T09:15:00Z",
    },
    {
      id: 3,
      campaignId: 3,
      donorName: "Maria Rodriguez",
      amount: 100,
      currency: "USD",
      isAnonymous: false,
      purpose: "Tech Education",
      message: "Education is the key to empowerment!",
      createdAt: "2024-01-19T16:45:00Z",
    },
    {
      id: 4,
      campaignId: 1,
      donorName: "Anonymous",
      amount: 75,
      currency: "USD",
      isAnonymous: true,
      purpose: "Emergency Support",
      message: "",
      createdAt: "2024-01-19T14:20:00Z",
    },
  ]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Emergency Support", label: "Emergency Support" },
    { value: "Legal Support", label: "Legal Support" },
    { value: "Education", label: "Education" },
    { value: "Business Support", label: "Business Support" },
    { value: "Healthcare", label: "Healthcare" },
  ];

  const currencies = [
    { value: "USD", label: "USD ($)" },
    { value: "EUR", label: "EUR (€)" },
    { value: "GBP", label: "GBP (£)" },
  ];

  const paymentMethods = [
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "paypal", label: "PayPal" },
    { value: "bank_transfer", label: "Bank Transfer" },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.isAnonymous && !formData.name.trim())
      newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.amount || formData.amount <= 0)
      newErrors.amount = "Please enter a valid amount";
    if (!formData.purpose.trim()) newErrors.purpose = "Purpose is required";
    if (!formData.paymentMethod)
      newErrors.paymentMethod = "Payment method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(
        "Thank you for your donation! You will receive a confirmation email shortly."
      );
      setFormData({
        name: "",
        email: "",
        amount: "",
        currency: "USD",
        isAnonymous: false,
        purpose: "",
        paymentMethod: "",
        message: "",
      });
      setShowDonationForm(false);
      setSelectedCampaign(null);
    }
  };

  const openDonationForm = (campaign = null) => {
    setSelectedCampaign(campaign);
    if (campaign) {
      updateFormData("purpose", campaign.title);
    }
    setShowDonationForm(true);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      searchTerm === "" ||
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || campaign.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Heart className="text-primary" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary text-balance">
              Crowdfunding & Donations
            </h1>
            <p className="text-muted-foreground text-pretty">
              Support women in need and contribute to meaningful causes that
              make a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <button
          onClick={() => openDonationForm()}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Heart size={20} />
          Make a Donation
        </button>

        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={16}
            />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {filteredCampaigns.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-card rounded-lg border border-border">
            <Heart className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">
              No Campaigns Found
            </h3>
            <p className="text-muted-foreground">
              {searchTerm || filterCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "No active campaigns at the moment."}
            </p>
          </div>
        ) : (
          filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <img
                src={campaign.image || "/placeholder.svg"}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                    {campaign.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {campaign.daysLeft} days left
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-card-foreground mb-2 text-balance">
                  {campaign.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 text-pretty">
                  {campaign.description}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-card-foreground">
                      {getProgressPercentage(
                        campaign.raised,
                        campaign.goal
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getProgressPercentage(
                          campaign.raised,
                          campaign.goal
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <DollarSign className="text-primary" size={16} />
                      <span className="font-semibold text-card-foreground">
                        {formatCurrency(campaign.raised)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Raised</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="text-accent" size={16} />
                      <span className="font-semibold text-card-foreground">
                        {formatCurrency(campaign.goal)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Goal</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="text-secondary" size={16} />
                      <span className="font-semibold text-card-foreground">
                        {campaign.donors}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Donors</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    by {campaign.organizer}
                  </p>
                  <button
                    onClick={() => openDonationForm(campaign)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent Donations */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
          <Heart className="text-primary" size={20} />
          Recent Donations
        </h2>

        <div className="space-y-4">
          {donations.slice(0, 5).map((donation) => (
            <div
              key={donation.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="text-primary" size={16} />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">
                    {donation.isAnonymous ? "Anonymous" : donation.donorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Donated to {donation.purpose}
                  </p>
                  {donation.message && (
                    <p className="text-sm text-muted-foreground italic mt-1">
                      "{donation.message}"
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">
                  {formatCurrency(donation.amount, donation.currency)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(donation.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Form Modal */}
      {showDonationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  {selectedCampaign
                    ? `Donate to: ${selectedCampaign.title}`
                    : "Make a Donation"}
                </h2>
                <button
                  onClick={() => setShowDonationForm(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Anonymous Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    checked={formData.isAnonymous}
                    onChange={(e) =>
                      updateFormData("isAnonymous", e.target.checked)
                    }
                    className="rounded border-border"
                  />
                  <label
                    htmlFor="isAnonymous"
                    className="text-sm text-foreground"
                  >
                    Make this donation anonymous
                  </label>
                </div>

                {/* Name */}
                {!formData.isAnonymous && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData("name", e.target.value)}
                      placeholder="Enter your full name"
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
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.email ? "border-destructive" : "border-border"
                    } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Amount and Currency */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => updateFormData("amount", e.target.value)}
                      placeholder="0.00"
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
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Currency
                    </label>
                    <select
                      value={formData.currency}
                      onChange={(e) =>
                        updateFormData("currency", e.target.value)
                      }
                      className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Purpose *
                  </label>
                  <input
                    type="text"
                    value={formData.purpose}
                    onChange={(e) => updateFormData("purpose", e.target.value)}
                    placeholder="What is this donation for?"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.purpose ? "border-destructive" : "border-border"
                    } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                  />
                  {errors.purpose && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.purpose}
                    </p>
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Payment Method *
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      updateFormData("paymentMethod", e.target.value)
                    }
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.paymentMethod
                        ? "border-destructive"
                        : "border-border"
                    } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                  >
                    <option value="">Select payment method</option>
                    {paymentMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                  {errors.paymentMethod && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateFormData("message", e.target.value)}
                    placeholder="Leave a message of support..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setShowDonationForm(false)}
                    className="px-6 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <CreditCard size={16} />
                    Donate{" "}
                    {formData.amount &&
                      formatCurrency(
                        Number.parseFloat(formData.amount),
                        formData.currency
                      )}
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

export default Crowdfunding;
