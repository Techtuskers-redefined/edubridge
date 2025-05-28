"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Mathematics", value: 35 },
  { name: "Science", value: 40 },
  { name: "History", value: 15 },
  { name: "Language Arts", value: 10 },
]

const COLORS = ["hsl(var(--primary))", "hsl(var(--chart-yellow))", "hsl(var(--chart-blue))", "hsl(var(--chart-green))"]

export function SubjectDistributionChart() {
  return (
    //@ts-ignore
    <ChartContainer config={undefined}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent
                    className="border bg-background p-2 shadow-sm"
                    // @ts-ignore
                    title={payload[0].name}
                    items={[
                      {
                        label: "Hours",
                        value: payload[0].value,
                        color: COLORS[payload[0].payload.index % COLORS.length],
                      },
                    ]}
                  />
                )
              }
              return null
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}