import React from "react";
import { useState } from "react";
import { Calendar, User, MessageCircle, Heart, Search } from "lucide-react";

const Blog = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = [
    {
      id: 1,
      title: "Breaking the Silence: Your Voice Matters",
      excerpt:
        "Learn how to speak up against harassment and find your strength in difficult situations.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      category: "Empowerment",
      image: "from-pink-100 to-pink-200",
      likes: 124,
      comments: 18,
    },
    {
      id: 2,
      title: "Financial Independence: A Guide for Women",
      excerpt:
        "Discover resources and strategies to achieve financial freedom and security.",
      author: "Maria Rodriguez",
      date: "2024-01-12",
      category: "Finance",
      image: "from-green-100 to-green-200",
      likes: 89,
      comments: 12,
    },
    {
      id: 3,
      title: "Building Supportive Communities",
      excerpt:
        "How women can come together to create safe spaces and support networks.",
      author: "Lisa Chen",
      date: "2024-01-10",
      category: "Community",
      image: "from-pink-100 to-green-100",
      likes: 156,
      comments: 24,
    },
    {
      id: 4,
      title: "Workplace Rights: Know Your Power",
      excerpt:
        "Understanding your rights in the workplace and how to protect yourself from discrimination.",
      author: "Jennifer Williams",
      date: "2024-01-08",
      category: "Legal",
      image: "from-purple-100 to-pink-200",
      likes: 203,
      comments: 31,
    },
    {
      id: 5,
      title: "Mental Health and Self-Care",
      excerpt:
        "Prioritizing your mental health while navigating challenging situations.",
      author: "Dr. Amanda Foster",
      date: "2024-01-05",
      category: "Health",
      image: "from-blue-100 to-green-200",
      likes: 178,
      comments: 27,
    },
    {
      id: 6,
      title: "Educational Opportunities for Women",
      excerpt:
        "Exploring scholarships, grants, and educational programs designed for women.",
      author: "Rachel Thompson",
      date: "2024-01-03",
      category: "Education",
      image: "from-yellow-100 to-pink-200",
      likes: 95,
      comments: 15,
    },
  ];

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-green-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Stories, insights, and resources to empower and inspire women
              everywhere
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          <button
            onClick={() => setCurrentPage("create-blog")}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-700 transition-colors"
          >
            Create Post
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`h-48 bg-gradient-to-br ${post.image}`}></div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                  Read More
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
