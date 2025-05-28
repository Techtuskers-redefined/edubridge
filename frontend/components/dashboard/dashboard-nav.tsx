"use client"

import { Brain, Home, BookOpen, Video, BarChart, Settings, LogOut, FileText, Users, Bookmark, Bell, User,} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator,
  SidebarMenuBadge,} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardNav() {
  const pathname = usePathname()

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      badge: null,
    },
    {
      title: "Subjects",
      href: "/subjects",
      icon: BookOpen,
      badge: null,
    },
    {
      title: "Videos",
      href: "/dashboard/videos",
      icon: Video,
      badge: null,
    },
    {
      title: "Notes",
      href: "/notes",
      icon: FileText,
      badge: null,
    },
    {
      title: "Community",
      href: "/community",
      icon: Users,
      badge: "12",
    },
    {
      title: "Progress",
      href: "/dashboard/progress",
      icon: BarChart,
      badge: null,
    },
  ]

  const recentTopics = [
    {
      title: "The Solar System",
      href: "/chat?topic=solar-system",
    },
    {
      title: "World War II",
      href: "/chat?topic=world-war-2",
    },
    {
      title: "Algebra Fundamentals",
      href: "/chat?topic=algebra",
    },
  ]

  const savedItems = [
    {
      title: "Cell Division",
      href: "/chat?topic=cell-division",
    },
    {
      title: "French Revolution",
      href: "/chat?topic=french-revolution",
    },
    {
      title: "Calculus Basics",
      href: "/chat?topic=calculus",
    },
  ]

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">EduBridge</span>
        </div>
        <div className="px-4 py-2">
          <Link href="/profile">
            <div className="flex items-center gap-3 rounded-md p-2 hover:bg-sidebar-accent">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Alex Johnson</span>
                <span className="text-xs text-muted-foreground">Student</span>
              </div>
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Recent Topics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentTopics.map((topic) => (
                <SidebarMenuItem key={topic.href}>
                  <SidebarMenuButton asChild>
                    <Link href={topic.href}>
                      <span>{topic.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Saved Items</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {savedItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      <Bookmark className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/profile">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/dashboard/notifications">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuBadge>3</SidebarMenuBadge>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex w-full items-center justify-between px-2 py-1.5">
              <span className="text-sm">Dark Mode</span>
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
          <SidebarSeparator />
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="bg-red-600 text-white hover:bg-red-800">
              <Link href="/">
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}