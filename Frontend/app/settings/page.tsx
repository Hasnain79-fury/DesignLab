"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"

const unitsFormSchema = z.object({
  weightUnit: z.string(),
  heightUnit: z.string(),
  distanceUnit: z.string(),
  temperatureUnit: z.string(),
})

const privacyFormSchema = z.object({
  profileVisibility: z.string(),
  activitySharing: z.boolean(),
  goalSharing: z.boolean(),
  allowDataCollection: z.boolean(),
})

const exportFormSchema = z.object({
  exportFormat: z.string(),
  dateRange: z.string(),
  includeActivities: z.boolean(),
  includeGoals: z.boolean(),
  includeBodyMetrics: z.boolean(),
})

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("units")

  const unitsForm = useForm<z.infer<typeof unitsFormSchema>>({
    resolver: zodResolver(unitsFormSchema),
    defaultValues: {
      weightUnit: "kg",
      heightUnit: "cm",
      distanceUnit: "km",
      temperatureUnit: "celsius",
    },
  })

  const privacyForm = useForm<z.infer<typeof privacyFormSchema>>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      profileVisibility: "friends",
      activitySharing: true,
      goalSharing: false,
      allowDataCollection: true,
    },
  })

  const exportForm = useForm<z.infer<typeof exportFormSchema>>({
    resolver: zodResolver(exportFormSchema),
    defaultValues: {
      exportFormat: "csv",
      dateRange: "all",
      includeActivities: true,
      includeGoals: true,
      includeBodyMetrics: true,
    },
  })

  function onUnitsSubmit(values: z.infer<typeof unitsFormSchema>) {
    console.log(values)
    toast({
      title: "Units updated",
      description: "Your measurement units have been updated successfully.",
    })
  }

  function onPrivacySubmit(values: z.infer<typeof privacyFormSchema>) {
    console.log(values)
    toast({
      title: "Privacy settings updated",
      description: "Your privacy settings have been updated successfully.",
    })
  }

  function onExportSubmit(values: z.infer<typeof exportFormSchema>) {
    console.log(values)
    toast({
      title: "Data export initiated",
      description: "Your data export has been initiated. You will receive an email when it's ready.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences and settings.</p>
        </div>

        <Tabs defaultValue="units" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="units">Units</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="export">Data Export</TabsTrigger>
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
          </TabsList>

          <TabsContent value="units">
            <Card>
              <CardHeader>
                <CardTitle>Measurement Units</CardTitle>
                <CardDescription>Configure your preferred measurement units for the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...unitsForm}>
                  <form onSubmit={unitsForm.handleSubmit(onUnitsSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={unitsForm.control}
                        name="weightUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weight Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select weight unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Used for body weight and lifting weights</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={unitsForm.control}
                        name="heightUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Height Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select height unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="cm">Centimeters (cm)</SelectItem>
                                <SelectItem value="ft">Feet/Inches (ft/in)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Used for body height measurements</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={unitsForm.control}
                        name="distanceUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Distance Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select distance unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="km">Kilometers (km)</SelectItem>
                                <SelectItem value="miles">Miles (mi)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Used for running, cycling, and other distances</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={unitsForm.control}
                        name="temperatureUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Temperature Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select temperature unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="celsius">Celsius (°C)</SelectItem>
                                <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>Used for weather and body temperature</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      Save Unit Preferences
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see your data and how it's used.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...privacyForm}>
                  <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-8">
                    <FormField
                      control={privacyForm.control}
                      name="profileVisibility"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profile Visibility</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select profile visibility" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="public">Public - Anyone can view</SelectItem>
                              <SelectItem value="friends">Friends Only - Only connections can view</SelectItem>
                              <SelectItem value="private">Private - Only you can view</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>Control who can see your profile information</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-4">
                      <FormField
                        control={privacyForm.control}
                        name="activitySharing"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Activity Sharing</FormLabel>
                              <FormDescription>Allow others to see your workout activities</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={privacyForm.control}
                        name="goalSharing"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Goal Sharing</FormLabel>
                              <FormDescription>Allow others to see your fitness goals</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={privacyForm.control}
                        name="allowDataCollection"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Data Collection</FormLabel>
                              <FormDescription>
                                Allow anonymous data collection to improve the app (no personal information)
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      Save Privacy Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="export">
            <Card>
              <CardHeader>
                <CardTitle>Export Your Data</CardTitle>
                <CardDescription>Download your fitness data for backup or analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...exportForm}>
                  <form onSubmit={exportForm.handleSubmit(onExportSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={exportForm.control}
                        name="exportFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Export Format</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select export format" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="json">JSON</SelectItem>
                                <SelectItem value="pdf">PDF Report</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={exportForm.control}
                        name="dateRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date Range</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select date range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="last-month">Last Month</SelectItem>
                                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                                <SelectItem value="last-year">Last Year</SelectItem>
                                <SelectItem value="custom">Custom Range</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <FormField
                        control={exportForm.control}
                        name="includeActivities"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Include Activities</FormLabel>
                              <FormDescription>Export your workout and activity data</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={exportForm.control}
                        name="includeGoals"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Include Goals</FormLabel>
                              <FormDescription>Export your fitness goals and progress</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={exportForm.control}
                        name="includeBodyMetrics"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Include Body Metrics</FormLabel>
                              <FormDescription>Export your weight, body fat, and other measurements</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                      Export Data
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
                <CardDescription>Manage your subscription plan and billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-800">Premium Plan</h3>
                        <p className="text-sm text-emerald-600">Your subscription is active</p>
                      </div>
                      <Badge className="bg-emerald-600">Active</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Billing Cycle</span>
                        <span className="font-medium">Monthly</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Billing Date</span>
                        <span className="font-medium">June 15, 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount</span>
                        <span className="font-medium">$9.99/month</span>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                        Change Plan
                      </Button>
                      <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Payment Method</h3>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                          <span className="font-medium">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Add Payment Method
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Billing History</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-3 gap-4 p-4 border-b font-medium">
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Status</div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b">
                        <div>May 15, 2025</div>
                        <div>$9.99</div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Paid
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4 border-b">
                        <div>Apr 15, 2025</div>
                        <div>$9.99</div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Paid
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 p-4">
                        <div>Mar 15, 2025</div>
                        <div>$9.99</div>
                        <div>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Paid
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View All Invoices
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
