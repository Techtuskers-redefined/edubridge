"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, PlayCircle, Plus, TrendingUp } from "lucide-react"
import Link from "next/link"
import { RecentLearningCard } from "@/components/dashboard/recent-learning-card"
import { LearningStatsCard } from "@/components/dashboard/learning-stats-card"

export default function DashboardPage() {
  const recentLearning = [
    {
      id: "1",
      title: "The Solar System",
      subject: "Science",
      progress: 75,
      lastAccessed: "2 hours ago",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "2",
      title: "World War II",
      subject: "History",
      progress: 45,
      lastAccessed: "Yesterday",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
    {
      id: "3",
      title: "Algebra Fundamentals",
      subject: "Mathematics",
      progress: 90,
      lastAccessed: "3 days ago",
      thumbnail: "/placeholder.svg?height=120&width=200",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your learning progress.</p>
        </div>
        <Link href="/chat">
          <Button className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Learning Session
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <LearningStatsCard
          title="Total Learning Time"
          value="12h 30m"
          description="This week"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          trend="+2.5h"
          trendUp={true}
        />
        <LearningStatsCard
          title="Completed Topics"
          value="24"
          description="This month"
          icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
          trend="+8"
          trendUp={true}
        />
        <LearningStatsCard
          title="Videos Watched"
          value="42"
          description="All time"
          icon={<PlayCircle className="h-4 w-4 text-muted-foreground" />}
          trend="+15"
          trendUp={true}
        />
        <LearningStatsCard
          title="Learning Streak"
          value="7 days"
          description="Current streak"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          trend="+3"
          trendUp={true}
        />
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Learning</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentLearning.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <RecentLearningCard item={item} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Photosynthesis</CardTitle>
                <CardDescription>Biology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt="Photosynthesis"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    Start Learning
                  </Button>
                  <span className="text-sm text-muted-foreground">15 min</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ancient Egypt</CardTitle>
                <CardDescription>History</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt="Ancient Egypt"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    Start Learning
                  </Button>
                  <span className="text-sm text-muted-foreground">20 min</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quantum Physics</CardTitle>
                <CardDescription>Physics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt="Quantum Physics"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    Start Learning
                  </Button>
                  <span className="text-sm text-muted-foreground">25 min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Cell Division</CardTitle>
                <CardDescription>Biology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt="Cell Division"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                  <span className="text-sm text-muted-foreground">Saved 2 days ago</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">French Revolution</CardTitle>
                <CardDescription>History</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt="French Revolution"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                  <span className="text-sm text-muted-foreground">Saved 1 week ago</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Calculus Basics</CardTitle>
                <CardDescription>Mathematics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt="Calculus Basics"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                  <span className="text-sm text-muted-foreground">Saved 3 weeks ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

