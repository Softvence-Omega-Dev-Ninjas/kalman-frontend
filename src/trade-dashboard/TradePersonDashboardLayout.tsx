import { Outlet } from "react-router-dom"
import Navbar from "./tradeComponents/Navbar"
import NavigationBar from "./tradeComponents/NavigationBar"

function TradePersonDashboardLayout() {
  return (
    <div>
      <Navbar/>
      <NavigationBar/>
      <div className="mt-5">
        <Outlet></Outlet>
      </div>
      </div>
  )
}

export default TradePersonDashboardLayout