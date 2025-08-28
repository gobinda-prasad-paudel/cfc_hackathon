import React from "react";

import { useState } from "react";
import { Upload, LinkIcon, MessageCircle, User } from "lucide-react";

const CreateBlog = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    links: "",
    allowComments: true,
    shareName: false,
  });

  const categories = [
    "Empowerment",
    "Finance",
    "Community",
    "Legal",
    "Health",
    "Education",
    "Career",
    "Safety",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate blog creation - in real app, this would call an API
    alert("Blog post created successfully!");
    setCurrentPage("blog");
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-green-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Create Blog Post</h1>
            <p className="text-lg opacity-90">
              Share your story and inspire others in our community
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Blog Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Enter your blog title"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={8}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Write your blog content here..."
              />
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Featured Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="text-sm text-gray-600 mb-2">
                  <label
                    htmlFor="image"
                    className="cursor-pointer text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Click to upload
                  </label>{" "}
                  or drag and drop
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                {formData.image && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            {/* Links */}
            <div>
              <label
                htmlFor="links"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Related Links
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <textarea
                  id="links"
                  name="links"
                  rows={3}
                  value={formData.links}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  placeholder="Add any relevant links (one per line)"
                />
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="allowComments"
                  name="allowComments"
                  type="checkbox"
                  checked={formData.allowComments}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <label
                  htmlFor="allowComments"
                  className="ml-3 flex items-center text-sm text-gray-700"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Allow comments on this post
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="shareName"
                  name="shareName"
                  type="checkbox"
                  checked={formData.shareName}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                />
                <label
                  htmlFor="shareName"
                  className="ml-3 flex items-center text-sm text-gray-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  Share my name as the author
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => setCurrentPage("blog")}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-pink-600 text-white py-3 rounded-lg font-medium hover:bg-pink-700 transition-colors"
              >
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
