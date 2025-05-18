"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, CheckCircle, Clock, Plus, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

const goalFormSchema = z.object({
  title: z.string().min(2, {
    message: "Goal title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  category: z.string({
    required_error: "Please select a category.",
  }),
  targetValue: z.string().min(1, {
    message: "Please enter a target value.",
  }),
  unit: z.string({
    required_error: "Please select a unit.",
  }),
  deadline: z.date({
    required_error: "Please select a deadline.",
  }),
})

type Goal = {
  id: string
  title: string
  description?: string
  category: string
  targetValue: string
  currentValue: string
  unit: string
  deadline: Date
  progress: number
  status: "active" | "completed" | "expired"
}

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Run 100 kilometers",
    description: "Complete 100 kilometers of running in total",
    category: "cardio",
    targetValue: "100",
    currentValue: "68",
    unit: "km",
    deadline: new Date(2025, 6, 15),
    progress: 68,
    status: "active",
  },
  {
    id: "2",
    title: "Lose 5 kg",
    description: "Reduce body weight by 5 kilograms",
    category: "weight",
    targetValue: "5",
    currentValue: "3.2",
    unit: "kg",
    deadline: new Date(2025, 7, 1),
    progress: 64,
    status: "active",
  },
  {
    id: "3",
    title: "Bench press 100 kg",
    description: "Achieve a 100 kg bench press",
    category: "strength",
    targetValue: "100",
    currentValue: "85",
    unit: "kg",
    deadline: new Date(2025, 8, 30),
    progress: 85,
    status: "active",
  },
  {
    id: "4",
    title: "Complete 30 yoga sessions",
    description: "Practice yoga regularly",
    category: "flexibility",
    targetValue: "30",
    currentValue: "30",
    unit: "sessions",
    deadline: new Date(2025, 5, 1),
    progress: 100,
    status: "completed",
  },
  {
    id: "5",
    title: "Swim 20 kilometers",
    description: "Complete 20 kilometers of swimming",
    category: "cardio",
    targetValue: "20",
    currentValue: "12",
    unit: "km",
    deadline: new Date(2025, 9, 15),
    progress: 60,
    status: "active",
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof goalFormSchema>>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      targetValue: "",
      unit: "",
      deadline: new Date(),
    },
  })

  function onSubmit(values: z.infer<typeof goalFormSchema>) {
    const newGoal: Goal = {
      id: Math.random().toString(36).substring(2, 9),
      title: values.title,
      description: values.description,
      category: values.category,
      targetValue: values.targetValue,
      currentValue: "0",
      unit: values.unit,
      deadline: values.deadline,
      progress: 0,
      status: "active",
    }

    setGoals([...goals, newGoal])
    setOpen(false)
    form.reset()

    toast({
      title: "Goal created",
      description: "Your new fitness goal has been created successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goals</h1>
          <p className="text-muted-foreground">Set and track your fitness goals</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="mr-2 h-4 w-4" />
              Create New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>Set a new fitness goal to track your progress</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Run 10 kilometers" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your goal in more detail" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cardio">Cardio</SelectItem>
                            <SelectItem value="strength">Strength</SelectItem>
                            <SelectItem value="weight">Weight</SelectItem>
                            <SelectItem value="flexibility">Flexibility</SelectItem>
                            <SelectItem value="endurance">Endurance</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-2">
                    <FormField
                      control={form.control}
                      name="targetValue"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Target Value</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem className="w-24">
                          <FormLabel>Unit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="kg">kg</SelectItem>
                              <SelectItem value="lbs">lbs</SelectItem>
                              <SelectItem value="km">km</SelectItem>
                              <SelectItem value="miles">miles</SelectItem>
                              <SelectItem value="reps">reps</SelectItem>
                              <SelectItem value="sessions">sessions</SelectItem>
                              <SelectItem value="days">days</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Deadline</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    Create Goal
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="active">Active Goals</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals
              .filter((goal) => goal.status === "active")
              .map((goal) => (
                <Card key={goal.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{goal.title}</CardTitle>
                      <Badge
                        variant={goal.progress >= 80 ? "success" : "default"}
                        className={goal.progress >= 80 ? "bg-emerald-600" : ""}
                      >
                        {goal.progress}%
                      </Badge>
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>
                            {goal.currentValue} / {goal.targetValue} {goal.unit}
                          </span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Deadline: {format(goal.deadline, "PPP")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Update Progress
                    </Button>
                    <Button variant="ghost" size="sm" className="text-emerald-600">
                      Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals
              .filter((goal) => goal.status === "completed")
              .map((goal) => (
                <Card key={goal.id} className="overflow-hidden border-emerald-200 bg-emerald-50">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{goal.title}</CardTitle>
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completed</span>
                          <span>
                            {goal.targetValue} {goal.unit}
                          </span>
                        </div>
                        <Progress value={100} className="h-2 bg-emerald-200" indicatorClassName="bg-emerald-600" />
                      </div>
                      <div className="flex items-center text-sm text-emerald-700">
                        <Trophy className="mr-1 h-4 w-4" />
                        <span>Completed on {format(new Date(2025, 4, 15), "PPP")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" className="text-emerald-600">
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className={cn("overflow-hidden", goal.status === "completed" ? "border-emerald-200 bg-emerald-50" : "")}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{goal.title}</CardTitle>
                    {goal.status === "completed" ? (
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <Badge
                        variant={goal.progress >= 80 ? "success" : "default"}
                        className={goal.progress >= 80 ? "bg-emerald-600" : ""}
                      >
                        {goal.progress}%
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{goal.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{goal.status === "completed" ? "Completed" : "Progress"}</span>
                        <span>
                          {goal.currentValue} / {goal.targetValue} {goal.unit}
                        </span>
                      </div>
                      <Progress
                        value={goal.progress}
                        className={cn("h-2", goal.status === "completed" ? "bg-emerald-200" : "")}
                        indicatorClassName={goal.status === "completed" ? "bg-emerald-600" : ""}
                      />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      {goal.status === "completed" ? (
                        <>
                          <Trophy className="mr-1 h-4 w-4 text-emerald-600" />
                          <span className="text-emerald-700">Completed on {format(new Date(2025, 4, 15), "PPP")}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="mr-1 h-4 w-4" />
                          <span>Deadline: {format(goal.deadline, "PPP")}</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    {goal.status === "completed" ? "View Details" : "Update Progress"}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-emerald-600">
                    {goal.status === "completed" ? "Share" : "Details"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
