"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Calendar,
  LineChartIcon,
  Loader2,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

const performanceData = [
  { month: "Jan", strength: 65, endurance: 70, recovery: 75 },
  { month: "Feb", strength: 68, endurance: 72, recovery: 73 },
  { month: "Mar", strength: 72, endurance: 75, recovery: 74 },
  { month: "Apr", strength: 75, endurance: 78, recovery: 76 },
  { month: "May", strength: 80, endurance: 82, recovery: 78 },
]

const workoutData = [
  { name: "Week 1", running: 12, weightlifting: 8, yoga: 3 },
  { name: "Week 2", running: 15, weightlifting: 10, yoga: 4 },
  { name: "Week 3", running: 18, weightlifting: 12, yoga: 5 },
  { name: "Week 4", running: 16, weightlifting: 15, yoga: 6 },
  { name: "Week 5", running: 20, weightlifting: 16, yoga: 7 },
]

const bodyCompositionData = [
  { month: "Jan", weight: 75, muscleMass: 32, bodyFat: 18 },
  { month: "Feb", weight: 74, muscleMass: 33, bodyFat: 17 },
  { month: "Mar", weight: 73.5, muscleMass: 34, bodyFat: 16 },
  { month: "Apr", weight: 73, muscleMass: 35, bodyFat: 15 },
  { month: "May", weight: 72.5, muscleMass: 36, bodyFat: 14 },
]

export function ProgressAnalysis() {
  const [timeframe, setTimeframe] = useState("3-months")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(true)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setShowAnalysis(false)

    // Simulate API call for analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowAnalysis(true)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Select defaultValue={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-month">Last Month</SelectItem>
            <SelectItem value="3-months">Last 3 Months</SelectItem>
            <SelectItem value="6-months">Last 6 Months</SelectItem>
            <SelectItem value="1-year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleAnalyze}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Progress"
          )}
        </Button>
      </div>

      {isAnalyzing && (
        <Card className="border-purple-100">
          <CardContent className="p-8 flex flex-col items-center justify-center">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analyzing Your Progress</h3>
            <p className="text-center text-muted-foreground">
              Our AI is analyzing your workout data, performance metrics, and body composition to provide personalized
              insights.
            </p>
          </CardContent>
        </Card>
      )}

      {showAnalysis && (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Progress</CardTitle>
                <CardDescription>Based on all metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-purple-700">8.5/10</div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-purple-600 mt-2">
                  You're making excellent progress! Your consistency is paying off.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Strength Gains</CardTitle>
                <CardDescription>Based on weight progression</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-emerald-700">+15%</div>
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <ArrowUp className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <p className="text-sm text-emerald-600 mt-2">
                  Your strength has increased significantly in the last 3 months.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Body Composition</CardTitle>
                <CardDescription>Muscle gain vs fat loss</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-blue-700">+4kg/-4kg</div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-blue-600 mt-2">
                  You've gained 4kg of muscle while losing 4kg of fat. Great recomposition!
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
              <TabsTrigger value="body-composition">Body Composition</TabsTrigger>
            </TabsList>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChartIcon className="mr-2 h-5 w-5 text-purple-600" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>Your strength, endurance, and recovery scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="strength" stroke="#8b5cf6" strokeWidth={2} />
                        <Line type="monotone" dataKey="endurance" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="recovery" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-800 mb-2">AI Analysis</h4>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Your strength metrics have improved by 23% over the past 3 months.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Endurance has shown steady improvement, with a 17% increase.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Recovery scores indicate good adaptation to your training load.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-800 mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Consider increasing training volume for continued strength gains.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Add one more HIIT session per week to further improve endurance.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Maintain your current recovery protocols as they're working well.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workouts">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-purple-600" />
                    Workout Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of your workout types over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={workoutData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="running" name="Running" fill="#3b82f6" />
                        <Bar dataKey="weightlifting" name="Weightlifting" fill="#8b5cf6" />
                        <Bar dataKey="yoga" name="Yoga" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-800 mb-2">Workout Analysis</h4>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Your workout consistency has improved by 35% over the past 5 weeks.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Weightlifting sessions have doubled, contributing to your strength gains.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>The addition of yoga has improved your flexibility and recovery.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-800 mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Maintain your current workout distribution as it's well-balanced.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Consider adding one more yoga session for enhanced recovery.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Gradually increase the intensity of your running sessions.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="body-composition">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChartIcon className="mr-2 h-5 w-5 text-purple-600" />
                    Body Composition Changes
                  </CardTitle>
                  <CardDescription>Track changes in weight, muscle mass, and body fat</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={bodyCompositionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="weight" name="Weight (kg)" stroke="#6b7280" strokeWidth={2} />
                        <Line
                          type="monotone"
                          dataKey="muscleMass"
                          name="Muscle Mass (kg)"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                        />
                        <Line type="monotone" dataKey="bodyFat" name="Body Fat (%)" stroke="#ef4444" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-800 mb-2">Body Composition Analysis</h4>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-start">
                          <ArrowDown className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                          <span>Your body weight has decreased by 2.5kg over the past 5 months.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowUp className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Muscle mass has increased by 4kg, indicating successful body recomposition.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowDown className="h-4 w-4 mr-2 mt-0.5 text-green-600" />
                          <span>Body fat percentage has decreased from 18% to 14%.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-semibold text-purple-800 mb-2">Recommendations</h4>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Continue your current nutrition plan as it's supporting muscle growth.</span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>
                            Consider increasing protein intake slightly to support further muscle development.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-purple-600" />
                          <span>Maintain your current caloric intake as your body composition is improving.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700">Download Full Analysis</Button>
          </div>
        </>
      )}
    </div>
  )
}
