import {
  Home,
  UserPlus,
  AlertTriangle,
  BookOpen,
  Heart,
  GraduationCap,
  Tag,
  Megaphone,
  Users,
  PenTool,
} from "lucide-react";

import Dashboard from "../pages/Dashboard";
import UserRegistration from "../pages/UserRegistration";
import HarassmentReports from "../pages/HarassmentReports";
import Education from "../pages/Education";
import Crowdfunding from "../pages/Crowdfunding";
import Scholarships from "../pages/Scholarships";
import Coupons from "../pages/Coupons";
import Awareness from "../pages/Awareness";
import Mentorship from "../pages/Mentorship";
import CreateBlog from "../pages/CreateBlog";

export const navigationItemsLink = [
  /* { path: "/dashboard", label: "Dashboard", component: Dashboard, icon: Home }, */
  {
    path: "/registration",
    label: "Registration",
    component: UserRegistration,
    icon: UserPlus,
  },
  {
    path: "/report",
    label: "Report Harassment",
    component: HarassmentReports,
    icon: AlertTriangle,
  },
  {
    path: "/education",
    label: "Education",
    component: Education,
    icon: BookOpen,
  },
  {
    path: "/crowdfunding",
    label: "Crowdfunding",
    component: Crowdfunding,
    icon: Heart,
  },
  {
    path: "/scholarships",
    label: "Scholarships",
    component: Scholarships,
    icon: GraduationCap,
  },
  { path: "/coupons", label: "Coupons", component: Coupons, icon: Tag },
  {
    path: "/awareness",
    label: "Awareness",
    component: Awareness,
    icon: Megaphone,
  },
  {
    path: "/mentorship",
    label: "Mentorship",
    component: Mentorship,
    icon: Users,
  },
  {
    path: "/create-blog",
    label: "Create Blog",
    component: CreateBlog,
    icon: PenTool,
  },
];
