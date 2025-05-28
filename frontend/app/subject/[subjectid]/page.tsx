"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  BookOpen,
  Atom,
  Calculator,
  Globe,
  Dna,
  FlaskRoundIcon as Flask,
  History,
  LanguagesIcon as Language,
  Palette,
  Clock,
  PlayCircle,
  Lock,
  CheckCircle,
  Filter,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Topic {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  completed: boolean
  locked: boolean
  progress: number
}

export default function SubjectPage() {
  const params = useParams()
  const subjectId = params.subjectId as string
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDifficulty, setFilterDifficulty] = useState<string | null>(null)

  // This would come from an API in a real app
  const subjectData = {
    science: {
      name: "Science",
      icon: <Atom className="h-6 w-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-950",
      description:
        "Explore the natural world through physics, chemistry, and biology. Learn about the fundamental laws that govern our universe.",
      progress: 45,
      topics: 24,
      completedTopics: 10,
    },
    mathematics: {
      name: "Mathematics",
      icon: <Calculator className="h-6 w-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-950",
      description:
        "Develop problem-solving skills through algebra, geometry, calculus, and more. Master the language of numbers and patterns.",
      progress: 30,
      topics: 18,
      completedTopics: 5,
    },
    history: {
      name: "History",
      icon: <History className="h-6 w-6" />,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-950",
      description:
        "Journey through time to understand human civilization, major events, and cultural developments that shaped our world.",
      progress: 60,
      topics: 15,
      completedTopics: 9,
    },
    geography: {
      name: "Geography",
      icon: <Globe className="h-6 w-6" />,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-950",
      description:
        "Discover the physical features of Earth and how human activity shapes and is influenced by our environment.",
      progress: 20,
      topics: 12,
      completedTopics: 2,
    },
    biology: {
      name: "Biology",
      icon: <Dna className="h-6 w-6" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
      description:
        "Study living organisms, their structure, function, growth, and evolution. Explore cells, genetics, and ecosystems.",
      progress: 75,
      topics: 20,
      completedTopics: 15,
    },
    chemistry: {
      name: "Chemistry",
      icon: <Flask className="h-6 w-6" />,
      color: "text-red-500",
      bgColor: "bg-red-100 dark:bg-red-950",
      description:
        "Investigate matter, its properties, and how substances combine or separate to form other substances.",
      progress: 40,
      topics: 16,
      completedTopics: 6,
    },
    languages: {
      name: "Languages",
      icon: <Language className="h-6 w-6" />,
      color: "text-sky-500",
      bgColor: "bg-sky-100 dark:bg-sky-950",
      description:
        "Master communication through various languages. Develop reading, writing, speaking, and listening skills.",
      progress: 50,
      topics: 14,
      completedTopics: 7,
    },
    arts: {
      name: "Arts",
      icon: <Palette className="h-6 w-6" />,
      color: "text-pink-500",
      bgColor: "bg-pink-100 dark:bg-pink-950",
      description:
        "Express creativity through visual arts, music, drama, and more. Develop appreciation for artistic expression.",
      progress: 35,
      topics: 10,
      completedTopics: 3,
    },
  }

  const subject = subjectData[subjectId as keyof typeof subjectData] || {
    name: "Unknown Subject",
    icon: <BookOpen className="h-6 w-6" />,
    color: "text-gray-500",
    bgColor: "bg-gray-100 dark:bg-gray-800",
    description: "Subject information not available.",
    progress: 0,
    topics: 0,
    completedTopics: 0,
  }

  // Generate topics based on the subject
  const generateTopics = (): Topic[] => {
    const topics: Topic[] = []
    const topicCount = subject.topics || 10

    for (let i = 1; i <= topicCount; i++) {
      const completed = i <= (subject.completedTopics || 0)
      const locked = i > (subject.completedTopics || 0) + 3

      topics.push({
        id: `topic-${i}`,
        title: `${subject.name} Topic ${i}`,
        description: `Learn about the fundamental concepts of ${subject.name.toLowerCase()} in this comprehensive lesson.`,
        duration: `${Math.floor(Math.random() * 20) + 10} min`,
        difficulty: i <= topicCount / 3 ? "Beginner" : i <= (topicCount * 2) / 3 ? "Intermediate" : "Advanced",
        completed,
        locked,
        progress: completed ? 100 : locked ? 0 : Math.floor(Math.random() * 80),
      })
    }

    return topics
  }

  const allTopics = generateTopics()

  const filteredTopics = allTopics.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = !filterDifficulty || topic.difficulty.toLowerCase() === filterDifficulty.toLowerCase()

    return matchesSearch && matchesDifficulty
  })

  const completedTopics = filteredTopics.filter((topic) => topic.completed)
  const inProgressTopics = filteredTopics.filter((topic) => !topic.completed && !topic.locked && topic.progress > 0)
  const lockedTopics = filteredTopics.filter((topic) => topic.locked)

  return (
    <div className="container py-8">
      <div className="mb-8">
        <Link href="/subjects" className="text-sm text-muted-foreground hover:underline">
          ← Back to All Subjects
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Card className={`overflow-hidden ${subject.bgColor}`}>
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
              <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-white/90 ${subject.color}`}>
                {subject.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">{subject.name}</h1>
                  <Badge variant="outline" className="bg-white/90">
                    {subject.topics} Topics
                  </Badge>
                </div>
                <p className="text-muted-foreground">{subject.description}</p>
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2 mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search topics..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`gap-1.5 ${!filterDifficulty ? "bg-primary/10" : ""}`}
            onClick={() => setFilterDifficulty(null)}
          >
            <Filter className="h-4 w-4" />
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`gap-1.5 ${filterDifficulty === "beginner" ? "bg-primary/10" : ""}`}
            onClick={() => setFilterDifficulty("beginner")}
          >
            Beginner
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`gap-1.5 ${filterDifficulty === "intermediate" ? "bg-primary/10" : ""}`}
            onClick={() => setFilterDifficulty("intermediate")}
          >
            Intermediate
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`gap-1.5 ${filterDifficulty === "advanced" ? "bg-primary/10" : ""}`}
            onClick={() => setFilterDifficulty("advanced")}
          >
            Advanced
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">All Topics</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-4">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TopicCard topic={topic} />
              </motion.div>
            ))}
            {filteredTopics.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="text-4xl">🔍</div>
                <h3 className="mt-4 text-lg font-semibold">No topics found</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-6">
          <div className="grid gap-4">
            {inProgressTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TopicCard topic={topic} />
              </motion.div>
            ))}
            {inProgressTopics.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="text-4xl">🚀</div>
                <h3 className="mt-4 text-lg font-semibold">No topics in progress</h3>
                <p className="mt-2 text-sm text-muted-foreground">Start learning a new topic to see it here</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-4">
            {completedTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TopicCard topic={topic} />
              </motion.div>
            ))}
            {completedTopics.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="text-4xl">🎯</div>
                <h3 className="mt-4 text-lg font-semibold">No completed topics yet</h3>
                <p className="mt-2 text-sm text-muted-foreground">Complete topics to track your progress</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface TopicCardProps {
  topic: Topic
}

function TopicCard({ topic }: TopicCardProps) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-md ${topic.locked ? "opacity-70" : ""}`}>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            {topic.completed ? (
              <CheckCircle className="h-6 w-6 text-primary" />
            ) : topic.locked ? (
              <Lock className="h-6 w-6 text-muted-foreground" />
            ) : (
              <PlayCircle className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col justify-between gap-1 md:flex-row md:items-center">
              <h3 className="font-semibold">{topic.title}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{topic.difficulty}</Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {topic.duration}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
            {!topic.completed && !topic.locked && (
              <div className="pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs text-muted-foreground">{topic.progress}%</span>
                </div>
                <Progress value={topic.progress} className="h-1.5 mt-1" />
              </div>
            )}
          </div>
          <div className="flex-shrink-0">
            <Link href={topic.locked ? "#" : `/chat?topic=${topic.id}`}>
              <Button variant={topic.completed ? "outline" : "default"} disabled={topic.locked}>
                {topic.completed ? "Review" : topic.locked ? "Locked" : "Continue"}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}