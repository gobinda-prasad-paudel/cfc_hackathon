import React from "react";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  FileText,
  Settings,
  CheckCircle,
  Upload,
  X,
} from "lucide-react";

const UserRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    email: "",
    phone: "",
    // Document Info
    documentType: "",
    documentId: "",
    documentIssuedFrom: "",
    documentIssuedDate: "",
    // Account Setup
    accountType: "",
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { number: 1, title: "Basic Information", icon: User },
    { number: 2, title: "Document Information", icon: FileText },
    { number: 3, title: "Account Setup", icon: Settings },
    { number: 4, title: "Review & Submit", icon: CheckCircle },
  ];

  const documentTypes = [
    { value: "id", label: "National ID" },
    { value: "passport", label: "Passport" },
    { value: "citizenship", label: "Citizenship Certificate" },
  ];

  const accountTypes = [
    { value: "user", label: "User" },
    { value: "lawyer", label: "Lawyer" },
    { value: "consultant", label: "Consultant" },
    { value: "admin", label: "Admin" },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email is invalid";
        if (!formData.phone.trim())
          newErrors.phone = "Phone number is required";
        break;
      case 2:
        if (!formData.documentType)
          newErrors.documentType = "Document type is required";
        if (!formData.documentId.trim())
          newErrors.documentId = "Document ID is required";
        if (!formData.documentIssuedFrom.trim())
          newErrors.documentIssuedFrom = "Issuing authority is required";
        if (!formData.documentIssuedDate)
          newErrors.documentIssuedDate = "Issue date is required";
        break;
      case 3:
        if (!formData.accountType)
          newErrors.accountType = "Account type is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      updateFormData("profilePicture", file);
    }
  };

  const removeProfilePicture = () => {
    updateFormData("profilePicture", null);
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    alert("Registration submitted successfully!");
    console.log("Form Data:", formData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? "border-destructive" : "border-border"
                } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-destructive" : "border-border"
                } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? "border-destructive" : "border-border"
                } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Document Type *
              </label>
              <select
                value={formData.documentType}
                onChange={(e) => updateFormData("documentType", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.documentType ? "border-destructive" : "border-border"
                } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
              >
                <option value="">Select document type</option>
                {documentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.documentType && (
                <p className="text-destructive text-sm mt-1">
                  {errors.documentType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Document ID *
              </label>
              <input
                type="text"
                value={formData.documentId}
                onChange={(e) => updateFormData("documentId", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.documentId ? "border-destructive" : "border-border"
                } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                placeholder="Enter document ID number"
              />
              {errors.documentId && (
                <p className="text-destructive text-sm mt-1">
                  {errors.documentId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Document Issued From *
              </label>
              <input
                type="text"
                value={formData.documentIssuedFrom}
                onChange={(e) =>
                  updateFormData("documentIssuedFrom", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.documentIssuedFrom
                    ? "border-destructive"
                    : "border-border"
                } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
                placeholder="Enter issuing authority"
              />
              {errors.documentIssuedFrom && (
                <p className="text-destructive text-sm mt-1">
                  {errors.documentIssuedFrom}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Document Issue Date *
              </label>
              <input
                type="date"
                value={formData.documentIssuedDate}
                onChange={(e) =>
                  updateFormData("documentIssuedDate", e.target.value)
                }
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.documentIssuedDate
                    ? "border-destructive"
                    : "border-border"
                } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
              />
              {errors.documentIssuedDate && (
                <p className="text-destructive text-sm mt-1">
                  {errors.documentIssuedDate}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Account Type *
              </label>
              <select
                value={formData.accountType}
                onChange={(e) => updateFormData("accountType", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.accountType ? "border-destructive" : "border-border"
                } bg-input focus:ring-2 focus:ring-ring focus:border-transparent transition-colors`}
              >
                <option value="">Select account type</option>
                {accountTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.accountType && (
                <p className="text-destructive text-sm mt-1">
                  {errors.accountType}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Profile Picture
              </label>
              <div className="space-y-4">
                {formData.profilePicture ? (
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <User size={24} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-card-foreground">
                        {formData.profilePicture.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(formData.profilePicture.size / 1024 / 1024).toFixed(
                          2
                        )}{" "}
                        MB
                      </p>
                    </div>
                    <button
                      onClick={removeProfilePicture}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload
                      size={48}
                      className="mx-auto text-muted-foreground mb-4"
                    />
                    <p className="text-muted-foreground mb-4">
                      Upload your profile picture
                    </p>
                    <label className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary/90 transition-colors">
                      <Upload size={16} />
                      Choose File
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Review Your Information
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium text-card-foreground">
                      {formData.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-card-foreground">
                      {formData.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-card-foreground">
                      {formData.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Document Type
                    </p>
                    <p className="font-medium text-card-foreground">
                      {documentTypes.find(
                        (t) => t.value === formData.documentType
                      )?.label || formData.documentType}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Document ID</p>
                    <p className="font-medium text-card-foreground">
                      {formData.documentId}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Issued From</p>
                    <p className="font-medium text-card-foreground">
                      {formData.documentIssuedFrom}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <p className="font-medium text-card-foreground">
                      {formData.documentIssuedDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Account Type
                    </p>
                    <p className="font-medium text-card-foreground">
                      {accountTypes.find(
                        (t) => t.value === formData.accountType
                      )?.label || formData.accountType}
                    </p>
                  </div>
                </div>

                {formData.profilePicture && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Profile Picture
                    </p>
                    <p className="font-medium text-card-foreground">
                      {formData.profilePicture.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2 text-balance">
          User Registration
        </h1>
        <p className="text-muted-foreground text-pretty">
          Complete your registration to access all platform features and
          resources.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted
                        ? "bg-primary border-primary text-primary-foreground"
                        : isActive
                        ? "bg-accent border-accent text-accent-foreground"
                        : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <p
                    className={`text-sm mt-2 text-center max-w-20 text-balance ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.number ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-card rounded-lg p-8 border border-border">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Next
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <CheckCircle size={20} />
              Submit Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
