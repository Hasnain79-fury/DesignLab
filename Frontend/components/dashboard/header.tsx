"use client"

import { useState } from "react"
import { Bell, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function Header() {
  const [showSearch, setShowSearch] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center gap-4">
        {showSearch ? (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
              autoFocus
              onBlur={() => setShowSearch(false)}
            />
          </div>
        ) : (
          <Button variant="outline" size="icon" className="md:hidden" onClick={() => setShowSearch(true)}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        )}
        <div className="hidden md:flex md:relative md:w-full md:max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full pl-8" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-emerald-600">
                <span className="text-[10px]">3</span>
              </Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                  <div className="font-medium">Workout Reminder</div>
                  <div className="text-sm text-muted-foreground">
                    Don't forget your scheduled HIIT workout today at 6:00 PM.
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                  <div className="font-medium">Goal Achievement</div>
                  <div className="text-sm text-muted-foreground">
                    Congratulations! You've reached 75% of your running goal.
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
                  <div className="font-medium">New AI Feature</div>
                  <div className="text-sm text-muted-foreground">
                    We've added new AI-powered nutrition recommendations.
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">3 days ago</div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Premium</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/profile" className="flex w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="flex w-full">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/subscription" className="flex w-full">
                  Subscription
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Link href="/logout" className="flex w-full">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
