import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

const goals = [
  {
    id: "1",
    title: "Run 100 kilometers",
    progress: 68,
    target: "100 km",
    current: "68 km",
    deadline: "June 15, 2025",
    status: "on-track",
  },
  {
    id: "2",
    title: "Lose 5 kg",
    progress: 64,
    target: "5 kg",
    current: "3.2 kg",
    deadline: "July 1, 2025",
    status: "on-track",
  },
  {
    id: "3",
    title: "Bench press 100 kg",
    progress: 85,
    target: "100 kg",
    current: "85 kg",
    deadline: "August 30, 2025",
    status: "ahead",
  },
]

export function GoalProgress() {
  return (
    <div className="space-y-6">
      {goals.map((goal) => (
        <div key={goal.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">{goal.title}</h4>
            <Badge
              variant={goal.status === "ahead" ? "success" : "default"}
              className={goal.status === "ahead" ? "bg-emerald-600" : ""}
            >
              {goal.progress}%
            </Badge>
          </div>
          <Progress value={goal.progress} className="h-2" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {goal.current} of {goal.target}
            </span>
            <div className="flex items-center">
              <Clock className="mr-1 h-3 w-3" />
              <span>Due {goal.deadline}</span>
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full">
        View All Goals
      </Button>
    </div>
  )
}
