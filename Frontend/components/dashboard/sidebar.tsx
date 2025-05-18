"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, Brain, Calendar, Heart, Home, LogOut, Menu, Settings, Target, User, X } from "lucide-react"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Activities",
      href: "/activities",
      icon: <Heart className="h-5 w-5" />,
    },
    {
      title: "Goals",
      href: "/goals",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "AI Features",
      href: "/ai-features",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Statistics",
      href: "/statistics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const sidebar = (
    <div className={cn("pb-12 h-full flex flex-col", className)}>
      <div className="py-4 px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-600 flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-bold">FitTrack AI</h1>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => isMobile && setIsOpen(false)}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 font-normal",
                  pathname === item.href
                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900"
                    : "hover:bg-gray-100",
                )}
              >
                {item.icon}
                {item.title}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="mt-auto border-t py-4 px-6">
        <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700">
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50" onClick={toggleSidebar}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {isOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={() => setIsOpen(false)} />}

        <div
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-200 ease-in-out",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {sidebar}
        </div>
      </>
    )
  }

  return <div className="hidden md:block w-64 border-r h-screen">{sidebar}</div>
}
