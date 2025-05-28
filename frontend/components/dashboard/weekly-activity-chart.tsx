"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 3.2 },
  { name: "Wed", hours: 1.8 },
  { name: "Thu", hours: 4.0 },
  { name: "Fri", hours: 3.5 },
  { name: "Sat", hours: 5.2 },
  { name: "Sun", hours: 4.8 },
]

export function WeeklyActivityChart() {
  return (
    // @ts-ignore
    <ChartContainer config={undefined}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs text-muted-foreground" />
          <YAxis className="text-xs text-muted-foreground" />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border bg-background p-2 shadow-sm"
                    title={label}
                    // @ts-ignore
                    items={[
                      {
                        label: "Hours Spent",
                        value: `${payload[0].value} hours`,
                        color: "hsl(var(--primary))",
                      },
                    ]}
                  />
                )
              }
              return null
            }}
          />
          <Legend />
          <Bar dataKey="hours" name="Hours Spent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}