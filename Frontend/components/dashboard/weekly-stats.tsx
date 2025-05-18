import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame, Heart, Timer, TrendingUp } from "lucide-react"

export function WeeklyStats() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Flame className="h-8 w-8 text-orange-500 mb-2" />
            <div className="text-2xl font-bold">12,543</div>
            <p className="text-xs text-muted-foreground">Calories Burned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Timer className="h-8 w-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">8.5 hrs</div>
            <p className="text-xs text-muted-foreground">Active Time</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm font-medium">Cardio</span>
            </div>
            <span className="text-sm text-muted-foreground">3.5 hrs</span>
          </div>
          <Progress value={70} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
              <span className="text-sm font-medium">Strength</span>
            </div>
            <span className="text-sm text-muted-foreground">5 hrs</span>
          </div>
          <Progress value={85} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Timer className="h-4 w-4 text-purple-500 mr-2" />
              <span className="text-sm font-medium">Flexibility</span>
            </div>
            <span className="text-sm text-muted-foreground">1 hr</span>
          </div>
          <Progress value={25} className="h-2" />
        </div>
      </div>
    </div>
  )
}
