import { Card, CardContent } from "@/components/ui/card"
import { Dumbbell, Flame, Heart, Timer } from "lucide-react"

export function ActivityStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Activities</p>
              <h3 className="text-2xl font-bold">127</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Calories Burned</p>
              <h3 className="text-2xl font-bold">48,293</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Timer className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Time</p>
              <h3 className="text-2xl font-bold">96.5 hrs</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Dumbbell className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Workouts</p>
              <h3 className="text-2xl font-bold">85</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
