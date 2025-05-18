"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

export function ActivityCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Mock data for activity dates
  const activityDates = [
    new Date(2025, 4, 1),
    new Date(2025, 4, 3),
    new Date(2025, 4, 5),
    new Date(2025, 4, 7),
    new Date(2025, 4, 10),
    new Date(2025, 4, 12),
    new Date(2025, 4, 14),
    new Date(2025, 4, 15),
    new Date(2025, 4, 16),
    new Date(2025, 4, 17),
    new Date(2025, 4, 18),
  ]

  // Function to check if a date has activities
  const hasActivity = (date: Date) => {
    return activityDates.some(
      (activityDate) =>
        activityDate.getDate() === date.getDate() &&
        activityDate.getMonth() === date.getMonth() &&
        activityDate.getFullYear() === date.getFullYear(),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            hasActivity: activityDates,
          }}
          modifiersStyles={{
            hasActivity: {
              backgroundColor: "#10b981",
              color: "white",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      {date && hasActivity(date) && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Activities on {date.toLocaleDateString()}</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🏃‍♂️</span>
                  <div>
                    <div className="font-medium">Morning Run</div>
                    <div className="text-xs text-muted-foreground">7:30 AM - 8:15 AM</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">5.2 km</div>
              </div>

              <div className="flex items-center justify-between p-2 border rounded-md">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🏋️‍♂️</span>
                  <div>
                    <div className="font-medium">Strength Training</div>
                    <div className="text-xs text-muted-foreground">6:00 PM - 7:00 PM</div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">Upper Body</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {date && !hasActivity(date) && (
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold mb-2">No activities on {date.toLocaleDateString()}</h3>
            <p className="text-sm text-muted-foreground">You don't have any recorded activities for this date.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
