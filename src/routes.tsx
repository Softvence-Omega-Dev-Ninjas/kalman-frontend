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
import ServiceDetails from "./publicpages/ServiceDetails";
import JobDetails from "./publicpages/JobDetails";
import GeneralLogin from "./publicpages/GeneralLogin";
import PostAJob from "./publicpages/PostAJob";
import OverviewPage from "./admin-dashboard/overview/OverviewPage";
import ManageUsersPage from "./admin-dashboard/manage-users/ManageUsersPage";
import AdminDashboardLayout from "./layout/AdminDashboardLayout";
import ManageBlogPage from "./admin-dashboard/manage-blog/ManageBlogPage";
import ManageDisputePage from "./admin-dashboard/manage-dispute/ManageDisputePage";
import ManageCategoryPage from "./admin-dashboard/category/ManageCategoryPage";
import SettingsPage from "./admin-dashboard/settings/SettingsPage";
import ManageJobsPage from "./admin-dashboard/manage-jobs/ManageJobsPage";
import PersonalInfo from "./trade-dashboard/PersonalInfo";
import ProfessionalInfo from "./trade-dashboard/ProfessionalInfo";
import BusinessInfo from "./trade-dashboard/BusinessInfo";
import ServiceAreas from "./trade-dashboard/tradeComponents/ServiceAreas";
import Credentials from "./trade-dashboard/Credentials";
import PaymentTerms from "./trade-dashboard/PaymentTerms";
import BusinessDetails from "./trade-dashboard/BusinessDetails";
import ReviewInfo from "./trade-dashboard/ReviewInfo";
import TradeLogin from "./trade-dashboard/TradeLogin";
import TradeSignUp from "./trade-dashboard/TradeSignUp";
import GeneralAuthFlow from "./components/AuthComponents/GeneralAuthFlow";

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
        element: <GeneralAuthFlow />,
      },
      {
        path: "post-a-job",
        element: <PostAJob />,
      },
    ],
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
    path: 'trade-person',
    element: <TradePersonDashboardLayout />,
    children: [
      {
        index: true,
        element: <TradeOverview />
      },
      {
        path: 'jobs/:id',
        element: <TradeJobDetails></TradeJobDetails>
      },
      {
        path: 'messages',
        element: <TradeMessage></TradeMessage>
      }, {
        path: 'payments',
        element: <TradePayment></TradePayment>
      }, {
        path: 'reviews',
        element: <TradeReviews></TradeReviews>
      },
      {
        path: 'settings',
        element: <TradeSetting></TradeSetting>
      },
    ]
  },

  //without dashboard
  {
    path: '/trade-person/personal-info',
    element: <PersonalInfo />
  },
  {
    path: '/trade-person/professional-info',
    element: <ProfessionalInfo />
  },
  {
    path: '/trade-person/business-info',
    element: <BusinessInfo />
  },
  {
    path: '/trade-person/service-areas',
    element: <ServiceAreas />
  },
  {
    path: '/trade-person/credentials',
    element: <Credentials />
  },
  {
    path: '/trade-person/payment-terms',
    element: <PaymentTerms />
  },
  {
    path: '/trade-person/business-details',
    element: <BusinessDetails />
  },
  {
    path: '/trade-person/review-info',
    element: <ReviewInfo />
  },
  {
    path: '/trade-login',
    element: <TradeLogin />
  },
  {
    path: '/trade-signup',
    element: <TradeSignUp />
  },

  // super admin dashboard
  {
    path: "dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        index: true,

        element: <OverviewPage />,
      },
      {
        path: "admin/overview",

        element: <OverviewPage />,
      },
      {
        path: "admin/manage-users",
        element: <ManageUsersPage />,
      },
      {
        path: "admin/manage-jobs",
        element: <ManageJobsPage />,
      },
      {
        path: "admin/manage-dispute",
        element: <ManageDisputePage />,
      },
      {
        path: "admin/category",
        element: <ManageCategoryPage />,
      },
      {
        path: "admin/settings",
        element: <SettingsPage />,
      },
      {
        path: "admin/manage-blog",
        element: <ManageBlogPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

