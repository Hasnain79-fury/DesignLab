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
  {
    id: "5",
    type: "Swimming",
    date: "May 14, 7:30 AM",
    duration: "50 min",
    distance: "1.5 km",
    calories: "450",
    location: "Community Pool",
    icon: "🏊‍♂️",
  },
  {
    id: "6",
    type: "HIIT",
    date: "May 13, 6:00 PM",
    duration: "30 min",
    distance: null,
    calories: "380",
    location: "Fitness Studio",
    icon: "⚡",
  },
  {
    id: "7",
    type: "Running",
    date: "May 12, 7:00 AM",
    duration: "40 min",
    distance: "4.8 km",
    calories: "390",
    location: "Neighborhood",
    icon: "🏃‍♂️",
  },
]

export function ActivityList() {
  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Avatar className="h-12 w-12 bg-emerald-100 text-emerald-700">
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
      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}
