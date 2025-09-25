import { Outlet } from "react-router-dom"
import NavigationBar from "./tradeComponents/NavigationBar"

function TradePersonDashboardLayout() {
  return (
    <div>
      <NavigationBar/>
      <div className="mt-5">
        <Outlet></Outlet>
      </div>
      </div>
  )
}

export default TradePersonDashboardLayout