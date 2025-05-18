import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Flame, MapPin, MoreHorizontal } from "lucide-react"

const activities = [
  {
    id: "1",
    type: "Running",
    date: "Today, 8:30 AM",
    duration: "45 min",
    distance: "5.2 km",
    calories: "420",
    location: "Central Park",
    icon: "🏃‍♂️",
  },
  {
    id: "2",
    type: "Weightlifting",
    date: "Yesterday, 6:15 PM",
    duration: "55 min",
    distance: null,
    calories: "380",
    location: "Home Gym",
    icon: "🏋️‍♂️",
  },
  {
    id: "3",
    type: "Cycling",
    date: "May 16, 7:00 AM",
    duration: "60 min",
    distance: "18 km",
    calories: "520",
    location: "Riverside Trail",
    icon: "🚴‍♂️",
  },
  {
    id: "4",
    type: "Yoga",
    date: "May 15, 6:30 PM",
    duration: "40 min",
    distance: null,
    calories: "180",
    location: "Yoga Studio",
    icon: "🧘‍♀️",
  },
]

export function RecentActivities() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4">
          <Avatar className="h-10 w-10 bg-emerald-100 text-emerald-700">
            <AvatarFallback>{activity.icon}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{activity.type}</h4>
                <Badge variant="outline" className="text-xs">
                  {activity.duration}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              <Calendar className="mr-1 h-3 w-3" />
              {activity.date}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mt-2">
              {activity.distance && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-1 h-3 w-3" />
                  {activity.distance}
                </div>
              )}
              <div className="flex items-center text-muted-foreground">
                <Flame className="mr-1 h-3 w-3" />
                {activity.calories} kcal
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {activity.duration}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-1 h-3 w-3" />
                {activity.location}
              </div>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Activities
      </Button>
    </div>
  )
}
