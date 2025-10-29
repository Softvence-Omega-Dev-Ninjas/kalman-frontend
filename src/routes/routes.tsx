import { createBrowserRouter } from "react-router-dom";
import Home from "../publicpages/Home";
import Services from "../publicpages/Services";
import Jobs from "../publicpages/Jobs";
import About from "../publicpages/About";
import Contact from "../publicpages/Contact";
import Blog from "../publicpages/Blog";
import App from "../App";
import UserDashboardLayout from "../user-dashboard/UserDashboardLayout";
import UserOverview from "../user-dashboard/UserOverview";
import UserMessage from "../user-dashboard/UserMessage";
import UserJobs from "../user-dashboard/UserJobs";
import UserJobDetails from "../user-dashboard/UserJobDetails";
import UserSetting from "../user-dashboard/UserSetting";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Login2FA from "../auth/Login2FA";
import VerifyOTP from "../auth/VerifyOTP";
import TradePersonDashboardLayout from "../trade-dashboard/TradePersonDashboardLayout";
import TradeOverview from "../trade-dashboard/TradeOverview";
import TradeJobDetails from "../trade-dashboard/TradeJobDetails";
import TradeMessage from "../trade-dashboard/TradeMessage";
import TradePayment from "../trade-dashboard/TradePayment";
import TradeReviews from "../trade-dashboard/TradeReviews";
import TradeSetting from "../trade-dashboard/TradeSetting";
import NotFound from "../NotFound";
import ServiceDetails from "../publicpages/ServiceDetails";
import JobDetails from "../publicpages/JobDetails";
import GeneralLogin from "../publicpages/GeneralLogin";
import PostAJob from "../publicpages/postAJob/PostAJob";
import OverviewPage from "../admin-dashboard/overview/OverviewPage";
import ManageUsersPage from "../admin-dashboard/manage-users/ManageUsersPage";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import ManageBlogPage from "../admin-dashboard/manage-blog/ManageBlogPage";
import ManageDisputePage from "../admin-dashboard/manage-dispute/ManageDisputePage";
import ManageCategoryPage from "../admin-dashboard/category/ManageCategoryPage";
import SettingsPage from "../admin-dashboard/settings/SettingsPage";
import ManageJobsPage from "../admin-dashboard/manage-jobs/ManageJobsPage";
import PersonalInfo from "../trade-dashboard/PersonalInfo";
import ProfessionalInfo from "../trade-dashboard/ProfessionalInfo";
import BusinessInfo from "../trade-dashboard/BusinessInfo";
import ServiceAreas from "../trade-dashboard/tradeComponents/ServiceAreas";
import Credentials from "../trade-dashboard/Credentials";
import PaymentTerms from "../trade-dashboard/PaymentTerms";
import BusinessDetails from "../trade-dashboard/BusinessDetails";
import ReviewInfo from "../trade-dashboard/ReviewInfo";
import TradeLogin from "../trade-dashboard/TradeLogin";
import GeneralAuthFlow from "../components/AuthComponents/GeneralAuthFlow";
import AdminLogin from "../admin-dashboard/adminLogin/AdminLogin";
import BlogDetails from "../publicpages/BlogDetails";
// import TradeSignUp from "./trade-dashboard/TradeSignUp";
import TradeSignUpPage from "../trade-dashboard/tradeComponents/TradeSignUp/TradeSignUpPage";
import TradeSuccessPage from "../trade-dashboard/tradeComponents/TradeSuccessPage";
import ManageCommision from "../admin-dashboard/manage-commision/ManageCommision";


import ForgotPassword from "../components/AuthComponents/forgot-pass/ForgotPassword";
import ForgotpassOtp from "../components/AuthComponents/forgot-pass/ForgotpassOtp";
import UpdatePass from "../components/AuthComponents/forgot-pass/UpdatePass";
import AdminProtectedRoute from "./AdminProtectedRoute";
import TradeManProtectedRoute from "./TradeManProtectedRoute";
import UserProtectedRoute from "./UserProtectedRoute";

// import TradeSignUpPage from "./trade-dashboard/tradeComponents/TradeSignUp/TradeSignUpPage";


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
        path: "blog/:id",
        element: <BlogDetails />,
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
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
   path:  "forgot-password/verify-otp",
   element: <ForgotpassOtp />
      },
      {
   path:  "forgot-password/update-pass",
   element: <UpdatePass />
      },
      {
        path: "post-a-job",
        element: <PostAJob />,
      },
    ],
  },
  //  User Dashboard Route
  {
    path: "user-dashboard",
    element:
    <UserProtectedRoute >
      <UserDashboardLayout />
    </UserProtectedRoute>,
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
    element:

    <TradeManProtectedRoute >
     <TradePersonDashboardLayout />
    </TradeManProtectedRoute>,
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

  //without dashboard
  {
    path: "/trade-person/personal-info",
    element:
     <TradeManProtectedRoute >
     <PersonalInfo />
    </TradeManProtectedRoute>, 
  },
  {
    path: "/trade-person/professional-info",
    element:
      <TradeManProtectedRoute >
    <ProfessionalInfo />
    </TradeManProtectedRoute>,  
  },
  {
    path: "/trade-person/business-info",
    element:<TradeManProtectedRoute >
     <BusinessInfo />
    </TradeManProtectedRoute>,
  },
  {
    path: "/trade-person/service-areas",
    element: <TradeManProtectedRoute >
    <ServiceAreas />
    </TradeManProtectedRoute>,

  },
  {
    path: "/trade-person/credentials",
    element:<TradeManProtectedRoute >
     <Credentials />
    </TradeManProtectedRoute>,
  },
  {
    path: "/trade-person/payment-terms",
    element:<TradeManProtectedRoute >
     <PaymentTerms />
    </TradeManProtectedRoute>,
  },
  {
    path: "/trade-person/business-details",
    element: <TradeManProtectedRoute >
     <BusinessDetails />
    </TradeManProtectedRoute>, 
  },
  {
    path: "/trade-person/review-info",
    element: <TradeManProtectedRoute >
       <ReviewInfo />
    </TradeManProtectedRoute>, 
  },
  {
    path: "/trade-login",
    element:  
        <TradeLogin />
 
  },
  {
    path: "/trade-signup",
    element: 
       <TradeSignUpPage />
  },
  {
    path: "/onboarding-success",
    element:  <TradeManProtectedRoute >
       <TradeSuccessPage />
    </TradeManProtectedRoute>, 
  },




  // super admin dashboard
  {
    path: "dashboard",
    element: ( <AdminProtectedRoute >
       <AdminDashboardLayout />
    </AdminProtectedRoute>),
    children: [
      {
        index: true,

        element:
        <AdminProtectedRoute >
            <OverviewPage />
       </AdminProtectedRoute> ,
      },
      {
        path: "admin/overview",
        element:<AdminProtectedRoute >
         <OverviewPage /></AdminProtectedRoute>,
      },

      {
        path: "admin/manage-users",
        element:<AdminProtectedRoute > <ManageUsersPage /></AdminProtectedRoute>,
      },
      {
        path: "admin/manage-jobs",
        element: <AdminProtectedRoute > <ManageJobsPage /></AdminProtectedRoute>,
      },
      {
        path: "admin/manage-dispute",
        element:  <AdminProtectedRoute > <ManageDisputePage /></AdminProtectedRoute>,
      },
      {
        path: "admin/category",
        element: <AdminProtectedRoute >  <ManageCategoryPage /></AdminProtectedRoute>,
      },
      {
        path: "admin/settings",
        element:  <AdminProtectedRoute >  <SettingsPage /></AdminProtectedRoute>,
      },
      {
        path: "admin/manage-blog",
        element:  <AdminProtectedRoute > <ManageBlogPage /></AdminProtectedRoute>,
      },
      {
        path : "admin/Commision",
        element: <AdminProtectedRoute > <ManageCommision /></AdminProtectedRoute>,
      }
    ],
  },

  {
    path: "admin/login",
    element: <AdminLogin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
