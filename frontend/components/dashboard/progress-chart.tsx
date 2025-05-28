"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Week 1", topics: 5, time: 8, quizzes: 3 },
  { name: "Week 2", topics: 8, time: 12, quizzes: 5 },
  { name: "Week 3", topics: 7, time: 10, quizzes: 4 },
  { name: "Week 4", topics: 10, time: 15, quizzes: 7 },
  { name: "Week 5", topics: 12, time: 18, quizzes: 8 },
  { name: "Week 6", topics: 15, time: 20, quizzes: 10 },
  { name: "Week 7", topics: 18, time: 25, quizzes: 12 },
  { name: "Week 8", topics: 20, time: 28, quizzes: 15 },
]

export function ProgressChart() {
  return (
    // @ts-ignore
    <ChartContainer config={undefined}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
                        label: "Topics Completed",
                        value: payload[0].value,
                        color: "hsl(var(--primary))",
                      },
                      {
                        label: "Hours Spent",
                        value: payload[1].value,
                        color: "hsl(var(--chart-yellow))",
                      },
                      {
                        label: "Quizzes Taken",
                        value: payload[2].value,
                        color: "hsl(var(--chart-blue))",
                      },
                    ]}
                  />
                )
              }
              return null
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="topics"
            name="Topics Completed"
            stroke="hsl(var(--primary))"
            activeDot={{ r: 8 }}
            strokeWidth={2}
          />
          <Line type="monotone" dataKey="time" name="Hours Spent" stroke="hsl(var(--chart-yellow))" strokeWidth={2} />
          <Line
            type="monotone"
            dataKey="quizzes"
            name="Quizzes Taken"
            stroke="hsl(var(--chart-blue))"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}