import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import type { ReactNode } from "react"

interface LearningStatsCardProps {
  title: string
  value: string
  description: string
  icon: ReactNode
  trend: string
  trendUp: boolean
}

export function LearningStatsCard({ title, value, description, icon, trend, trendUp }: LearningStatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center gap-1 text-xs">
          {trendUp ? <ArrowUp className="h-3 w-3 text-green-500" /> : <ArrowDown className="h-3 w-3 text-red-500" />}
          <span className={trendUp ? "text-green-500" : "text-red-500"}>{trend}</span>
          <span className="text-muted-foreground">from last period</span>
        </div>
      </CardContent>
    </Card>
  )
}

