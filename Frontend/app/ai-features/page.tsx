"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Brain, ChevronRight, Dumbbell, LineChart, Sparkles, Utensils } from "lucide-react"
import { WorkoutPlanGenerator } from "@/components/ai-features/workout-plan-generator"
import { NutritionRecommendations } from "@/components/ai-features/nutrition-recommendations"
import { ProgressAnalysis } from "@/components/ai-features/progress-analysis"

export default function AIFeaturesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Features</h1>
        <p className="text-muted-foreground">Personalized AI-powered insights and recommendations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Dumbbell className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <CardTitle>Workout Plans</CardTitle>
                <CardDescription>AI-generated workout routines</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Get personalized workout plans based on your goals, fitness level, and available equipment.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-100">
              Generate Plan
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Utensils className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Nutrition Advice</CardTitle>
                <CardDescription>Personalized meal recommendations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Receive tailored nutrition recommendations to support your fitness goals and optimize performance.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-100">
              Get Recommendations
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-100">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <LineChart className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle>Progress Analysis</CardTitle>
                <CardDescription>AI-powered performance insights</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Get detailed analysis of your workout data with insights on trends, improvements, and recommendations.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-100">
              Analyze Progress
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="workout-plans" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="workout-plans">Workout Plans</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="progress">Progress Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="workout-plans">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Dumbbell className="mr-2 h-5 w-5 text-emerald-600" />
                AI Workout Plan Generator
              </CardTitle>
              <CardDescription>Generate personalized workout plans based on your goals and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <WorkoutPlanGenerator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Utensils className="mr-2 h-5 w-5 text-blue-600" />
                Nutrition Recommendations
              </CardTitle>
              <CardDescription>
                Get personalized nutrition advice based on your activity level and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NutritionRecommendations />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="mr-2 h-5 w-5 text-purple-600" />
                Progress Analysis
              </CardTitle>
              <CardDescription>AI-powered insights on your fitness progress and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressAnalysis />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Brain className="h-6 w-6 mr-2" />
              <h2 className="text-2xl font-bold">AI Premium Features</h2>
            </div>
            <p className="max-w-md">
              Unlock advanced AI features with our premium plan, including personalized coaching, advanced analytics,
              and more.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-white/20 hover:bg-white/30">Form Analysis</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">Recovery Optimization</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">Advanced Metrics</Badge>
              <Badge className="bg-white/20 hover:bg-white/30">Personalized Coaching</Badge>
            </div>
          </div>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
            <Sparkles className="mr-2 h-4 w-4" />
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </div>
  )
}
