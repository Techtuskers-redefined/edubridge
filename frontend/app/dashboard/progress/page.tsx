"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, TrendingUp, Award, Target, BarChart, PieChart, LineChart, ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { SubjectDistributionChart } from "@/components/dashboard/subject-distribution-chart";
import { WeeklyActivityChart } from "@/components/dashboard/weekly-activity-chart";
import Link from "next/link";

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState("month");
  
  const subjects = [
    {
      name: "Mathematics",
      progress: 68,
      trend: 12,
      trendUp: true,
      topics: 18,
      completedTopics: 12,
    },
    {
      name: "Science",
      progress: 75,
      trend: 8,
      trendUp: true,
      topics: 24,
      completedTopics: 18,
    },
    {
      name: "History",
      progress: 42,
      trend: -5,
      trendUp: false,
      topics: 15,
      completedTopics: 6,
    },
    {
      name: "Language Arts",
      progress: 60,
      trend: 3,
      trendUp: true,
      topics: 20,
      completedTopics: 12,
    },
  ];

  const achievements = [
    {
      title: "Fast Learner",
      description: "Complete 5 topics in a single day",
      progress: 100,
      completed: true,
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: "Knowledge Seeker",
      description: "Complete 50 topics across all subjects",
      progress: 76,
      completed: false,
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Science Whiz",
      description: "Complete all topics in the Science subject",
      progress: 75,
      completed: false,
      icon: <Award className="h-5 w-5" />,
    },
    {
      title: "Consistent Learner",
      description: "Maintain a 7-day learning streak",
      progress: 100,
      completed: true,
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Math Master",
      description: "Score 100% on 10 math quizzes",
      progress: 40,
      completed: false,
      icon: <Award className="h-5 w-5" />,
    },
  ];

  const stats = [
    {
      title: "Learning Time",
      value: "32h 45m",
      description: "This month",
      trend: "+5.2h",
      trendUp: true,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Topics Completed",
      value: "48",
      description: "Out of 77 topics",
      trend: "+12",
      trendUp: true,
      icon: <Target className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Quiz Score",
      value: "82%",
      description: "Average score",
      trend: "+4%",
      trendUp: true,
      icon: <Award className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Learning Streak",
      value: "7 days",
      description: "Current streak",
      trend: "+3",
      trendUp: true,
      icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Learning Progress</h2>
          <p className="text-muted-foreground">
            Track your learning journey and achievements.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs">
                  {stat.trendUp ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                  )}
                  <span className={stat.trendUp ? "text-green-500" : "text-red-500"}>
                    {stat.trend}
                  </span>
                  <span className="text-muted-foreground">from last period</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>
                    Your learning progress over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ProgressChart />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Subject Distribution</CardTitle>
                  <CardDescription>
                    Time spent on each subject
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <SubjectDistributionChart />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>
                    Your learning activity for each day of the week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <WeeklyActivityChart />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col justify-between gap-1 md:flex-row md:items-center">
                          <h3 className="font-semibold">{subject.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {subject.completedTopics} of {subject.topics} topics
                            </Badge>
                            <div className="flex items-center gap-1 text-xs">
                              {subject.trendUp ? (
                                <ArrowUpRight className="h-3 w-3 text-green-500" />
                              ) : (
                                <ArrowDownRight className="h-3 w-3 text-red-500" />
                              )}
                              <span className={subject.trendUp ? "text-green-500" : "text-red-500"}>
                                {subject.trendUp ? "+" : ""}{subject.trend}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Link href={`/subjects/${subject.name.toLowerCase()}`}>
                          <Button variant="outline" className="gap-1.5">
                            View Details
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={achievement.completed ? "border-primary bg-primary/5" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${achievement.completed ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {achievement.completed ? "Completed" : `${achievement.progress}% Complete`}
                        </span>
                        {achievement.completed && (
                          <Badge variant="outline" className="bg-primary/20 text-primary">
                            Achieved
                          </Badge>
                        )}
                      </div>
                      <Progress value={achievement.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}