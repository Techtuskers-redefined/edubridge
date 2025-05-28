import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"
import Link from "next/link"

interface RecentLearningCardProps {
  item: {
    id: string
    title: string
    subject: string
    progress: number
    lastAccessed: string
    thumbnail: string
  }
}

export function RecentLearningCard({ item }: RecentLearningCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{item.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{item.subject}</p>
      </CardHeader>
      <CardContent>
        <div className="aspect-video overflow-hidden rounded-md bg-muted">
          <div className="flex h-full items-center justify-center">
            <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">{item.progress}%</span>
          </div>
          <Progress value={item.progress} className="h-2" />
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-muted-foreground">Last accessed: {item.lastAccessed}</span>
            <Link href={`/chat?topic=${item.id}`}>
              <Button variant="outline" size="sm" className="gap-1.5">
                <PlayCircle className="h-4 w-4" />
                Continue
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

