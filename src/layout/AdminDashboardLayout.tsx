// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,

} from "@/components/ui/card"
// import avatar from "@/assets/dashboard/header/avatar.png";
import { MdOutlineNotificationsNone } from "react-icons/md";
import useScrollTrigger from "@/hooks/useScrollTrigger";
import { AppSidebar } from "@/admin-dashboard/shared/Sidebar/AppSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/typeHook";
import AdminProfileDropdown from "./AdminProfileDropdown";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const AdminDashboardLayout = () => {

      useEffect(()=>{
                document.title = `Admin Dashboard | Stavbar`
              }, [])

  const navigate = useNavigate()
  const { scrolled } = useScrollTrigger();

  const {admin } = useAppSelector((state)=> state.admin)
  console.log(admin , "admin here")
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="">
          <header
            className={`flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 bg-primary-200 z-10 shadow-sm bg-white ${
              scrolled && "shadow-md"
            }`}
          >
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1 text-black cursor-pointer" />
                <h1 className="text-lg xs:text-xl md:text-2xl font-semibold text-[#0D1B2A]">
                  Super Admin Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-4 mr-2">
                {/* <MdOutlineNotificationsNone className="text-xl" /> */}
                {
                  admin ? 
                        <AdminProfileDropdown />: 
                        <Button onClick={()=>navigate("/admin/login")} className=" cursor-pointer">
                               Login
                        </Button>
                }
              </div>
            </div>
          </header>
          <div className="bg-[#F9FAFB] min-h-[calc(100vh)] z-0">
            <div className="p-5">
            <Card className="p-5 min-h-[88vh]">
                <Outlet/>
            </Card>
            </div>
          </div>
          {/* <footer className="w-full px-4 py-6 bg-primary-200 text-sm text-white text-center">
            Carbon Engines Admin — Precision in Every Rep, Control in Every
            Detail.
          </footer> */}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminDashboardLayout;
