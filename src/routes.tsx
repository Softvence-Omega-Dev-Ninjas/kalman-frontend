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

const router = createBrowserRouter([
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
        path: "jobs",
        element: <Jobs />,
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
      // ✅ User Dashboard Route
      {
        path: "user-dashboard",
        element: <UserDashboardLayout />,
        children:[
          {
            index:true,
            element:<UserOverview/>
          },
          {
            path:'messages',
            element:<UserMessage/>
          },
          {
            path:'my-jobs',
            element:<UserJobs/>
          },
          {
            path:'my-jobs/:id',
            element:<UserJobDetails/>
          },
          {
            path:'settings',
            element:<UserSetting/>
          },

          
        ]
      },
    ],
  },
]);

export default router;
