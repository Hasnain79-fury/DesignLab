"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Mon",
    calories: 420,
    duration: 45,
  },
  {
    name: "Tue",
    calories: 380,
    duration: 40,
  },
  {
    name: "Wed",
    calories: 650,
    duration: 65,
  },
  {
    name: "Thu",
    calories: 410,
    duration: 45,
  },
  {
    name: "Fri",
    calories: 520,
    duration: 55,
  },
  {
    name: "Sat",
    calories: 780,
    duration: 80,
  },
  {
    name: "Sun",
    calories: 350,
    duration: 35,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip
          formatter={(value, name) => {
            if (name === "calories") return [`${value} kcal`, "Calories Burned"]
            if (name === "duration") return [`${value} min`, "Duration"]
            return [value, name]
          }}
        />
        <Bar dataKey="calories" fill="#10b981" radius={[4, 4, 0, 0]} name="Calories" />
        <Bar dataKey="duration" fill="#0ea5e9" radius={[4, 4, 0, 0]} name="Duration" />
      </BarChart>
    </ResponsiveContainer>
  )
}
