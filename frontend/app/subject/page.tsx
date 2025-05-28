"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Atom,
  Calculator,
  Globe,
  Dna,
  FlaskRoundIcon as Flask,
  History,
  LanguagesIcon as Language,
  Palette,
  ChevronRight,
  Star,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function SubjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const subjects = [
    {
      id: "science",
      name: "Science",
      icon: <Atom className="h-5 w-5" />,
      topics: 24,
      color: "bg-blue-100 dark:bg-blue-950",
      iconColor: "text-blue-500",
      description: "Physics, Chemistry, Biology and more",
      popular: true,
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: <Calculator className="h-5 w-5" />,
      topics: 18,
      color: "bg-purple-100 dark:bg-purple-950",
      iconColor: "text-purple-500",
      description: "Algebra, Geometry, Calculus and more",
      popular: true,
    },
    {
      id: "history",
      name: "History",
      icon: <History className="h-5 w-5" />,
      topics: 15,
      color: "bg-amber-100 dark:bg-amber-950",
      iconColor: "text-amber-500",
      description: "World History, Ancient Civilizations and more",
      popular: false,
    },
    {
      id: "geography",
      name: "Geography",
      icon: <Globe className="h-5 w-5" />,
      topics: 12,
      color: "bg-green-100 dark:bg-green-950",
      iconColor: "text-green-500",
      description: "Physical Geography, Human Geography and more",
      popular: false,
    },
    {
      id: "biology",
      name: "Biology",
      icon: <Dna className="h-5 w-5" />,
      topics: 20,
      color: "bg-emerald-100 dark:bg-emerald-950",
      iconColor: "text-emerald-500",
      description: "Cells, Genetics, Ecology and more",
      popular: true,
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: <Flask className="h-5 w-5" />,
      topics: 16,
      color: "bg-red-100 dark:bg-red-950",
      iconColor: "text-red-500",
      description: "Elements, Compounds, Reactions and more",
      popular: false,
    },
    {
      id: "languages",
      name: "Languages",
      icon: <Language className="h-5 w-5" />,
      topics: 14,
      color: "bg-sky-100 dark:bg-sky-950",
      iconColor: "text-sky-500",
      description: "English, Spanish, French and more",
      popular: false,
    },
    {
      id: "arts",
      name: "Arts",
      icon: <Palette className="h-5 w-5" />,
      topics: 10,
      color: "bg-pink-100 dark:bg-pink-950",
      iconColor: "text-pink-500",
      description: "Visual Arts, Music, Drama and more",
      popular: false,
    },
  ]

  const recentSubjects = [
    {
      id: "biology",
      name: "Biology",
      lastAccessed: "2 hours ago",
      progress: 65,
    },
    {
      id: "mathematics",
      name: "Mathematics",
      lastAccessed: "Yesterday",
      progress: 42,
    },
    {
      id: "science",
      name: "Science",
      lastAccessed: "3 days ago",
      progress: 78,
    },
  ]

  const filteredSubjects = subjects.filter((subject) => subject.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const popularSubjects = subjects.filter((subject) => subject.popular)

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Subjects</h1>
        <p className="text-muted-foreground">Browse all subjects or search for specific topics.</p>
      </div>

      <div className="mb-8 flex w-full max-w-sm items-center space-x-2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search subjects..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">All Subjects</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/subjects/${subject.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className={`${subject.color}`}>
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 ${subject.iconColor}`}
                        >
                          {subject.icon}
                        </div>
                        <Badge variant="outline" className="bg-white/90">
                          {subject.topics} Topics
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="mb-2">{subject.name}</CardTitle>
                      <CardDescription>{subject.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm text-muted-foreground">Explore topics</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/subjects/${subject.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className={`${subject.color}`}>
                      <div className="flex items-center justify-between">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/90 ${subject.iconColor}`}
                        >
                          {subject.icon}
                        </div>
                        <Badge variant="outline" className="bg-white/90 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" /> Popular
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="mb-2">{subject.name}</CardTitle>
                      <CardDescription>{subject.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm text-muted-foreground">Explore topics</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link href={`/subjects/${subject.id}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <CardTitle>{subject.name}</CardTitle>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {subject.lastAccessed}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${subject.progress}%` }} />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/50 px-6 py-3">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm text-muted-foreground">Continue learning</span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}