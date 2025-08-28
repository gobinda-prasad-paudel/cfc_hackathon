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
import { Route, Routes } from "react-router";
import SideNavBar from "./components/SideNavBar";
import { navigationItemsLink } from "./utils/nav";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes with sidebar layout */}

        {navigationItemsLink.map((item) => {
          const Component = item.component; // get component reference
          return (
            <Route
              key={item.path}
              path={item.path}
              element={
                <SideNavBar>
                  <Component />
                </SideNavBar>
              }
            />
          );
        })}
      </Routes>
    </AuthProvider>
  );
}

export default App;
