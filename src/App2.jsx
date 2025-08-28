import React from "react";

import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PublicNavbar from "./components/PublicNavbar";
import Layout from "./components/Layout";
import Footer from "./components/Footer";
import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import CreateBlog from "./pages/CreateBlog";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import UserRegistration from "./pages/UserRegistration";
import HarassmentReports from "./pages/HarassmentReports";
import Education from "./pages/Education";
import Crowdfunding from "./pages/Crowdfunding";
import Scholarships from "./pages/Scholarships";
import Coupons from "./pages/Coupons";
import Awareness from "./pages/Awareness";
import Mentorship from "./pages/Mentorship";
import "./globals.css";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const { isAuthenticated, user } = useAuth();

  const renderPublicPage = () => {
    switch (currentPage) {
      case "home":
        return <PublicHome setCurrentPage={setCurrentPage} />;
      case "login":
        return <Login setCurrentPage={setCurrentPage} />;
      case "signup":
        return <Signup setCurrentPage={setCurrentPage} />;
      case "blog":
        return <Blog setCurrentPage={setCurrentPage} />;
      case "create-blog":
        return <CreateBlog setCurrentPage={setCurrentPage} />;
      case "contact":
        return <Contact setCurrentPage={setCurrentPage} />;
      case "donate":
        return <Donate setCurrentPage={setCurrentPage} />;
      default:
        return <PublicHome setCurrentPage={setCurrentPage} />;
    }
  };

  const renderDashboardPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Home setCurrentPage={setCurrentPage} />;
      case "registration":
        return <UserRegistration />;
      case "reports":
        return <HarassmentReports />;
      case "education":
        return <Education />;
      case "crowdfunding":
        return <Crowdfunding />;
      case "scholarships":
        return <Scholarships />;
      case "coupons":
        return <Coupons />;
      case "awareness":
        return <Awareness />;
      case "mentorship":
        return <Mentorship />;
      case "create-blog":
        return <CreateBlog setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  if (isAuthenticated) {
    return (
      <Layout
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
      >
        {renderDashboardPage()}
      </Layout>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPublicPage()}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
