import { Outlet } from "react-router-dom"
import UserNavigation from "./UserDashComponents/UserNavigation"
import UserProfileCard from "./UserDashComponents/UserProfileCard"
import Navbar from "@/components/shared/Navbar"
import { useEffect } from "react"
import ScrollToTop from "@/components/scroll/ScrollToTop"


function UserDashboardLayout() {

        useEffect(()=>{
          document.title = `User Dashboard | Stavbar`
        }, [])
      

  return (
    <div>
       <ScrollToTop />
      <Navbar/>
      <UserProfileCard/>
      <UserNavigation/>
      <div className="mt-5">
        <Outlet/>
      </div>
      </div>
  )
}

export default UserDashboardLayout