"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  DollarSign,
  Briefcase,
  Moon,
  User,
  UsersRound,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Member Management",
    icon: Users,
    children: [
      { title: "Members", href: "/members" },
      { title: "Families", href: "/families" },
      { title: "Visitors", href: "/visitors" },
    ],
  },
  {
    title: "Small Groups",
    icon: UsersRound,
    href: "/small-groups",
  },
  {
    title: "Messaging",
    icon: MessageSquare,
    href: "/messaging",
  },
  {
    title: "Finance",
    icon: DollarSign,
    children: [
      { title: "Offerings", href: "/finance/offerings" },
      { title: "Expenses", href: "/finance/expenses" },
      { title: "Reports", href: "/finance/reports" },
    ],
  },
  {
    title: "HR",
    icon: Briefcase,
    children: [
      { title: "Staff", href: "/hr/staff" },
      { title: "Volunteers", href: "/hr/volunteers" },
    ],
  },
  {
    title: "Events",
    icon: Calendar,
    children: [
      { title: "Event Management", href: "/events" },
      { title: "Event Configuration", href: "/events/configuration" },
      { title: "Event Communications", href: "/events/communications" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/settings/general" },
      { title: "Users", href: "/settings/users" },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const isParentActive = (children?: { href: string }[]) => {
    if (!children) return false
    return children.some((child) => pathname.startsWith(child.href))
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="JourneyFamily Logo"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="text-lg font-semibold text-sidebar-foreground">
            JourneyFamily
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) =>
                item.children ? (
                  <Collapsible
                    key={item.title}
                    defaultOpen={isParentActive(item.children)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isParentActive(item.children)}
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                          <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.href}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(child.href)}
                              >
                                <Link href={child.href}>{child.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.href!)}>
                      <Link href={item.href!}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <div className="flex items-center justify-between px-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Moon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
