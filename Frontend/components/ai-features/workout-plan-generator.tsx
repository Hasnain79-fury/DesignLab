"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Clock, Calendar, ArrowRight, Loader2 } from "lucide-react"

const formSchema = z.object({
  goal: z.string({
    required_error: "Please select a fitness goal.",
  }),
  fitnessLevel: z.string({
    required_error: "Please select your fitness level.",
  }),
  workoutsPerWeek: z.coerce.number().min(1).max(7),
  timePerWorkout: z.coerce.number().min(15).max(120),
  equipment: z.array(z.string()).optional(),
  focusAreas: z.array(z.string()).min(1, {
    message: "Please select at least one focus area.",
  }),
})

const equipmentOptions = [
  { id: "none", label: "No Equipment" },
  { id: "dumbbells", label: "Dumbbells" },
  { id: "barbell", label: "Barbell" },
  { id: "kettlebell", label: "Kettlebell" },
  { id: "resistance-bands", label: "Resistance Bands" },
  { id: "pull-up-bar", label: "Pull-up Bar" },
  { id: "bench", label: "Bench" },
  { id: "treadmill", label: "Treadmill" },
]

const focusAreaOptions = [
  { id: "upper-body", label: "Upper Body" },
  { id: "lower-body", label: "Lower Body" },
  { id: "core", label: "Core" },
  { id: "cardio", label: "Cardio" },
  { id: "flexibility", label: "Flexibility" },
  { id: "full-body", label: "Full Body" },
]

export function WorkoutPlanGenerator() {
  const [showResults, setShowResults] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workoutsPerWeek: 3,
      timePerWorkout: 45,
      equipment: [],
      focusAreas: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsGenerating(true)

    // Simulate API call to generate workout plan
    setTimeout(() => {
      setIsGenerating(false)
      setShowResults(true)
    }, 2000)
  }

  function handleReset() {
    form.reset()
    setShowResults(false)
  }

  return (
    <div>
      {!showResults ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="endurance">Endurance</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="general-fitness">General Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fitnessLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your fitness level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workoutsPerWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workouts Per Week</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} max={7} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timePerWorkout"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Per Workout (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min={15} max={120} step={5} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="equipment"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Available Equipment</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {equipmentOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="equipment"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(field.value?.filter((value) => value !== item.id) || [])
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="focusAreas"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Focus Areas</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {focusAreaOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="focusAreas"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(field.value?.filter((value) => value !== item.id) || [])
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                "Generate Workout Plan"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Your Personalized Workout Plan</h3>
            <Button variant="outline" onClick={handleReset}>
              Create New Plan
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Muscle Gain</Badge>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Intermediate</Badge>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">3x Weekly</Badge>
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">45 min</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Day 1: Upper Body</CardTitle>
                <CardDescription className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Monday
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Bench Press</span>
                    </div>
                    <span className="text-sm">3 x 8-10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Bent Over Rows</span>
                    </div>
                    <span className="text-sm">3 x 10-12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Shoulder Press</span>
                    </div>
                    <span className="text-sm">3 x 8-10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Bicep Curls</span>
                    </div>
                    <span className="text-sm">3 x 12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Tricep Extensions</span>
                    </div>
                    <span className="text-sm">3 x 12</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    45 minutes
                  </div>
                  <Button size="sm" variant="outline" className="text-emerald-600">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Day 2: Lower Body</CardTitle>
                <CardDescription className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Wednesday
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Squats</span>
                    </div>
                    <span className="text-sm">4 x 8-10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Romanian Deadlifts</span>
                    </div>
                    <span className="text-sm">3 x 10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Leg Press</span>
                    </div>
                    <span className="text-sm">3 x 12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Calf Raises</span>
                    </div>
                    <span className="text-sm">3 x 15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Leg Curls</span>
                    </div>
                    <span className="text-sm">3 x 12</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    45 minutes
                  </div>
                  <Button size="sm" variant="outline" className="text-emerald-600">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Day 3: Full Body</CardTitle>
                <CardDescription className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Friday
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Deadlifts</span>
                    </div>
                    <span className="text-sm">3 x 6-8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Pull-ups</span>
                    </div>
                    <span className="text-sm">3 x 8-10</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Push-ups</span>
                    </div>
                    <span className="text-sm">3 x 12-15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Lunges</span>
                    </div>
                    <span className="text-sm">3 x 10 each</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Dumbbell className="h-4 w-4 mr-2 text-emerald-600" />
                      <span className="font-medium">Plank</span>
                    </div>
                    <span className="text-sm">3 x 45 sec</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    45 minutes
                  </div>
                  <Button size="sm" variant="outline" className="text-emerald-600">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <h4 className="font-semibold text-emerald-800 mb-2">AI Recommendations</h4>
            <ul className="space-y-2 text-sm text-emerald-700">
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-emerald-600" />
                Start with a 5-10 minute warm-up before each workout session.
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-emerald-600" />
                Rest 60-90 seconds between sets for compound exercises, 30-60 seconds for isolation exercises.
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-emerald-600" />
                Increase weights by 5-10% when you can complete all sets with good form.
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-emerald-600" />
                Include at least 2 rest days between training the same muscle groups.
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Save Workout Plan</Button>
          </div>
        </div>
      )}
    </div>
  )
}
