import { Outlet } from "react-router-dom";
import NavigationBar from "./tradeComponents/NavigationBar";
import ProfileCard from "./tradeComponents/ProfileCard";
import Navbar from "@/components/shared/Navbar";
import { useEffect } from "react";
import ScrollToTop from "@/components/scroll/ScrollToTop";

function TradePersonDashboardLayout() {
  useEffect(() => {
    document.title = `Trade Dashboard | Stavbar`;
  }, []);

  return (
    <div className="mt-34">
       <ScrollToTop />
      <Navbar />
      <ProfileCard />
      <NavigationBar />
      <div className="mt-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default TradePersonDashboardLayout;
