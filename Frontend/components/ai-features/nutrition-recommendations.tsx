"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Loader2, Utensils } from "lucide-react"

const formSchema = z.object({
  goal: z.string({
    required_error: "Please select a nutrition goal.",
  }),
  weight: z.coerce.number().min(30).max(250),
  height: z.coerce.number().min(100).max(250),
  age: z.coerce.number().min(18).max(100),
  gender: z.string({
    required_error: "Please select your gender.",
  }),
  activityLevel: z.string({
    required_error: "Please select your activity level.",
  }),
  dietaryRestrictions: z.array(z.string()).optional(),
})

const dietaryRestrictionOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "nut-free", label: "Nut-Free" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" },
]

export function NutritionRecommendations() {
  const [showResults, setShowResults] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 70,
      height: 175,
      age: 30,
      dietaryRestrictions: [],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsGenerating(true)

    // Simulate API call to generate nutrition recommendations
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
                    <FormLabel>Nutrition Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your nutrition goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="performance">Athletic Performance</SelectItem>
                        <SelectItem value="health">General Health</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" min={18} max={100} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" min={30} max={250} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" min={100} max={250} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your activity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                        <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="active">Very active (hard exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="very-active">Extra active (very hard exercise & physical job)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dietaryRestrictions"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Dietary Restrictions (Optional)</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {dietaryRestrictionOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="dietaryRestrictions"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Recommendations...
                </>
              ) : (
                "Get Nutrition Recommendations"
              )}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Your Personalized Nutrition Plan</h3>
            <Button variant="outline" onClick={handleReset}>
              Create New Plan
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Muscle Gain</Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Male, 30 years</Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">70 kg, 175 cm</Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Moderately Active</Badge>
          </div>

          <Card className="bg-blue-50 border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle>Daily Nutrition Summary</CardTitle>
              <CardDescription>Recommended daily intake based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
                  <div className="text-2xl font-bold text-blue-700">2,650</div>
                  <div className="text-sm text-blue-600">Calories</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
                  <div className="text-2xl font-bold text-blue-700">175g</div>
                  <div className="text-sm text-blue-600">Protein</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
                  <div className="text-2xl font-bold text-blue-700">265g</div>
                  <div className="text-sm text-blue-600">Carbs</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-100 text-center">
                  <div className="text-2xl font-bold text-blue-700">88g</div>
                  <div className="text-sm text-blue-600">Fat</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="meal-plan">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="meal-plan">Meal Plan</TabsTrigger>
              <TabsTrigger value="food-recommendations">Food Recommendations</TabsTrigger>
              <TabsTrigger value="supplements">Supplements</TabsTrigger>
            </TabsList>

            <TabsContent value="meal-plan" className="space-y-4 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-blue-600" />
                    Breakfast (7:00 - 8:00 AM)
                  </CardTitle>
                  <CardDescription>~650 calories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Oatmeal with berries and nuts</span>
                      <span className="text-sm text-muted-foreground">350 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Greek yogurt</span>
                      <span className="text-sm text-muted-foreground">150 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Protein shake</span>
                      <span className="text-sm text-muted-foreground">150 cal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-blue-600" />
                    Lunch (12:00 - 1:00 PM)
                  </CardTitle>
                  <CardDescription>~750 calories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Grilled chicken breast</span>
                      <span className="text-sm text-muted-foreground">250 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Brown rice</span>
                      <span className="text-sm text-muted-foreground">200 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Mixed vegetables</span>
                      <span className="text-sm text-muted-foreground">100 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Olive oil (1 tbsp)</span>
                      <span className="text-sm text-muted-foreground">120 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Apple</span>
                      <span className="text-sm text-muted-foreground">80 cal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-blue-600" />
                    Snack (3:30 - 4:00 PM)
                  </CardTitle>
                  <CardDescription>~300 calories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Protein bar</span>
                      <span className="text-sm text-muted-foreground">200 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Banana</span>
                      <span className="text-sm text-muted-foreground">100 cal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-blue-600" />
                    Dinner (7:00 - 8:00 PM)
                  </CardTitle>
                  <CardDescription>~700 calories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Salmon fillet</span>
                      <span className="text-sm text-muted-foreground">300 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sweet potato</span>
                      <span className="text-sm text-muted-foreground">150 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Steamed broccoli</span>
                      <span className="text-sm text-muted-foreground">50 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Quinoa</span>
                      <span className="text-sm text-muted-foreground">120 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Olive oil (1 tbsp)</span>
                      <span className="text-sm text-muted-foreground">120 cal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-blue-600" />
                    Evening Snack (9:30 PM)
                  </CardTitle>
                  <CardDescription>~250 calories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Cottage cheese</span>
                      <span className="text-sm text-muted-foreground">150 cal</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Almonds (small handful)</span>
                      <span className="text-sm text-muted-foreground">100 cal</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="food-recommendations" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Protein Sources</CardTitle>
                    <CardDescription>High-quality protein foods to support muscle growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Chicken Breast</span>
                          <p className="text-sm text-muted-foreground">Lean protein source, low in fat</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Salmon</span>
                          <p className="text-sm text-muted-foreground">Rich in protein and omega-3 fatty acids</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Greek Yogurt</span>
                          <p className="text-sm text-muted-foreground">High protein, contains probiotics</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Eggs</span>
                          <p className="text-sm text-muted-foreground">Complete protein with essential nutrients</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Lean Beef</span>
                          <p className="text-sm text-muted-foreground">Rich in protein, iron, and B vitamins</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Carbohydrate Sources</CardTitle>
                    <CardDescription>Quality carbs for energy and recovery</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Brown Rice</span>
                          <p className="text-sm text-muted-foreground">Complex carbs with fiber</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Sweet Potatoes</span>
                          <p className="text-sm text-muted-foreground">Rich in vitamins and slow-digesting carbs</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Oatmeal</span>
                          <p className="text-sm text-muted-foreground">Provides sustained energy and fiber</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Quinoa</span>
                          <p className="text-sm text-muted-foreground">Complete protein and complex carbs</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Fruits</span>
                          <p className="text-sm text-muted-foreground">Natural sugars, vitamins, and antioxidants</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Healthy Fats</CardTitle>
                    <CardDescription>Essential fats for hormone production and health</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Avocados</span>
                          <p className="text-sm text-muted-foreground">Monounsaturated fats and fiber</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Nuts and Seeds</span>
                          <p className="text-sm text-muted-foreground">Healthy fats, protein, and micronutrients</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Olive Oil</span>
                          <p className="text-sm text-muted-foreground">Rich in monounsaturated fats</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Fatty Fish</span>
                          <p className="text-sm text-muted-foreground">Omega-3 fatty acids for heart health</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vegetables and Micronutrients</CardTitle>
                    <CardDescription>Essential vitamins and minerals for optimal health</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Leafy Greens</span>
                          <p className="text-sm text-muted-foreground">Rich in vitamins, minerals, and antioxidants</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Cruciferous Vegetables</span>
                          <p className="text-sm text-muted-foreground">Broccoli, cauliflower, brussels sprouts</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Bell Peppers</span>
                          <p className="text-sm text-muted-foreground">High in vitamin C and antioxidants</p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                        <div>
                          <span className="font-medium">Berries</span>
                          <p className="text-sm text-muted-foreground">Antioxidants and lower in sugar</p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="supplements" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Supplements</CardTitle>
                  <CardDescription>Based on your goals and nutritional needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-1">Protein Powder</h4>
                      <p className="text-sm mb-2">
                        Helps meet daily protein requirements for muscle growth and recovery.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <strong>Recommendation:</strong> 1-2 scoops (25-50g) daily, preferably post-workout or between
                        meals.
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-1">Creatine Monohydrate</h4>
                      <p className="text-sm mb-2">
                        Enhances strength, power, and muscle growth during high-intensity exercise.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <strong>Recommendation:</strong> 5g daily, timing doesn't matter significantly.
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-1">Vitamin D</h4>
                      <p className="text-sm mb-2">
                        Important for bone health, immune function, and hormone regulation.
                      </p>
                      <div className="text-sm text-muted-foreground">
                        <strong>Recommendation:</strong> 1000-2000 IU daily, especially if limited sun exposure.
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-1">Omega-3 Fish Oil</h4>
                      <p className="text-sm mb-2">Supports heart health, reduces inflammation, and may aid recovery.</p>
                      <div className="text-sm text-muted-foreground">
                        <strong>Recommendation:</strong> 1-2g combined EPA/DHA daily with meals.
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Important Note</h4>
                    <p className="text-sm text-blue-600">
                      Supplements should complement a balanced diet, not replace whole foods. Always consult with a
                      healthcare professional before starting any supplement regimen.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">Save Nutrition Plan</Button>
          </div>
        </div>
      )}
    </div>
  )
}
