import { createBrowserRouter } from "react-router-dom";
import Home from "./publicpages/Home";
import Services from "./publicpages/Services";
import Jobs from "./publicpages/Jobs";
import About from "./publicpages/About";
import Contact from "./publicpages/Contact";
import Blog from "./publicpages/Blog";
import App from "./App";
import UserDashboardLayout from "./user-dashboard/UserDashboardLayout";
import UserOverview from "./user-dashboard/UserOverview";
import UserMessage from "./user-dashboard/UserMessage";
import UserJobs from "./user-dashboard/UserJobs";
import UserJobDetails from "./user-dashboard/UserJobDetails";
import UserSetting from "./user-dashboard/UserSetting";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Login2FA from "./auth/Login2FA";
import VerifyOTP from "./auth/VerifyOTP";
import TradePersonDashboardLayout from "./trade-dashboard/TradePersonDashboardLayout";
import TradeOverview from "./trade-dashboard/TradeOverview";
import TradeJobDetails from "./trade-dashboard/TradeJobDetails";
import TradeMessage from "./trade-dashboard/TradeMessage";
import TradePayment from "./trade-dashboard/TradePayment";
import TradeReviews from "./trade-dashboard/TradeReviews";
import TradeSetting from "./trade-dashboard/TradeSetting";
import NotFound from "./NotFound";
import AdminDashboardLayout from "./admin-dashboard/AdminDashboardLayout";
import AdminOverview from "./admin-dashboard/AdminOverview";
import UserManagement from "./admin-dashboard/UserManagement";
import JobManagement from "./admin-dashboard/JobManagement";
import DisputesManagement from "./admin-dashboard/DisputesManagement";
import CategoryManagement from "./admin-dashboard/CategoryManagement";
import AdminSettings from "./admin-dashboard/AdminSettings";
import ServiceDetails from "./publicpages/ServiceDetails";
import JobDetails from "./publicpages/JobDetails";
import GeneralLogin from "./publicpages/GeneralLogin";
import GeneralSignUp from "./publicpages/GeneralSignUp";
import PostAJob from "./publicpages/PostAJob";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/login-2fa", element: <Login2FA /> },
  { path: "/verify-otp", element: <VerifyOTP /> },

  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "services/:id",
        element: <ServiceDetails></ServiceDetails>,
      },
      {
        path: "jobs",
        element: <Jobs />,
      },
      {
        path: "jobs/:id",
        element: <JobDetails />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "/general-login",
        element: <GeneralLogin />,
      },
      {
        path: "/general-signup",
        element: <GeneralSignUp />,
      },
      {
        path: "post-a-job",
        element: <PostAJob />,
      },
      // ✅ User Dashboard Route
      {
        path: "user-dashboard",
        element: <UserDashboardLayout />,
        children: [
          {
            index: true,
            element: <UserOverview />,
          },
          {
            path: "messages",
            element: <UserMessage />,
          },
          {
            path: "my-jobs",
            element: <UserJobs />,
          },
          {
            path: "my-jobs/:id",
            element: <UserJobDetails />,
          },
          {
            path: "settings",
            element: <UserSetting />,
          },
        ],
      },
      // trade person dashboard
      {
        path: "trade-person",
        element: <TradePersonDashboardLayout />,
        children: [
          {
            index: true,
            element: <TradeOverview />,
          },
          {
            path: "jobs/:id",
            element: <TradeJobDetails></TradeJobDetails>,
          },
          {
            path: "messages",
            element: <TradeMessage></TradeMessage>,
          },
          {
            path: "payments",
            element: <TradePayment></TradePayment>,
          },
          {
            path: "reviews",
            element: <TradeReviews></TradeReviews>,
          },
          {
            path: "settings",
            element: <TradeSetting></TradeSetting>,
          },
        ],
      },

      // super admin dashboard
      {
        path: "admin-dashboard",
        element: <AdminDashboardLayout />,
        children: [
          {
            index: true,
            element: <AdminOverview></AdminOverview>,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
          {
            path: "jobs",
            element: <JobManagement></JobManagement>,
          },
          {
            path: "disputes",
            element: <DisputesManagement></DisputesManagement>,
          },
          {
            path: "categories",
            element: <CategoryManagement></CategoryManagement>,
          },
          {
            path: "settings",
            element: <AdminSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
