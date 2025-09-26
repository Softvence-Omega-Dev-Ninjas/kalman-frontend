import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";
import {
  BriefcaseBusiness,
  CopyPlus,
  LayoutGrid,
  NotepadText,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain = [
    {
      title: "Dashboard",
      url: "/dashboard/admin/overview",
      Icon: LayoutGrid,
      show: true,
    },
    {
      title: "Users Management",
      Icon: Users,
      url: "/dashboard/admin/manage-users",
      show: true,
    },
    {
      title: "Job Management",
      Icon: BriefcaseBusiness,
      url: "/dashboard/admin/manage-jobs",
      show: true,
    },
    {
      title: "Dispute Management",
      url: "/dashboard/admin/manage-dispute",
      Icon: User,
      show: true,
    },
    {
      title: "Category",
      url: "/dashboard/admin/category",
      Icon: CopyPlus,
      show: true,
    },
    {
      title: "Blog Management",
      url: "/dashboard/admin/manage-blog",
      Icon: NotepadText,
      show: true,
    },
    {
      title: "Settings",
      url: "/dashboard/admin/settings",
      Icon: Settings,
      show: true,
    },
  ];

  return (
    <Sidebar collapsible="offcanvas" {...props} className="bg-white">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="mt-2">
                <div className="text-2xl font-bold text-white">
                  <Link to="/">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#0D1B2A]">
                      Stavbar
                    </h1>
                  </Link>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="mt-2 bg-white">
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser /> */}</SidebarFooter>
    </Sidebar>
  );
}
