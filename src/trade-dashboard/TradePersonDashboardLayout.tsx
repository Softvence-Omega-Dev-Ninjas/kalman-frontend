import { Outlet } from "react-router-dom"
import NavigationBar from "./tradeComponents/NavigationBar"
import ProfileCard from "./tradeComponents/ProfileCard"
import Navbar from "@/components/shared/Navbar"

function TradePersonDashboardLayout() {
  return (
    <div className="mt-34">
      <Navbar/>
      <ProfileCard/>
      <NavigationBar/>
      <div className="mt-5">
        <Outlet></Outlet>
      </div>
      </div>
  )
}

export default TradePersonDashboardLayout