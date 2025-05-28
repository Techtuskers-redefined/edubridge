"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Clock, PlayCircle, Bookmark, Share, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface Video {
  id: string
  title: string
  subject: string
  duration: string
  thumbnail: string
  createdAt: Date
  views: number
  saved: boolean
}

export default function VideosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSubject, setFilterSubject] = useState<string | null>(null)

  // This would come from an API in a real app
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "video-1",
      title: "Understanding Photosynthesis",
      subject: "Biology",
      duration: "12:45",
      thumbnail: "/placeholder.svg?height=180&width=320",
      createdAt: new Date(2023, 3, 15),
      views: 1245,
      saved: true,
    },
    {
      id: "video-2",
      title: "Solving Quadratic Equations",
      subject: "Mathematics",
      duration: "15:20",
      thumbnail: "/placeholder.svg?height=180&width=320",
      createdAt: new Date(2023, 3, 10),
      views: 987,
      saved: false,
    },
    {
      id: "video-3",
      title: "World War II: Major Battles",
      subject: "History",
      duration: "18:30",
      thumbnail: "/placeholder.svg?height=180&width=320",
      createdAt: new Date(2023, 3, 5),
      views: 1532,
      saved: true,
    },
    {
      id: "video-4",
      title: "Chemical Reactions Explained",
      subject: "Chemistry",
      duration: "14:15",
      thumbnail: "/placeholder.svg?height=180&width=320",
      createdAt: new Date(2023, 2, 28),
      views: 876,
      saved: false,
    },
    {
      id: "video-5",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      duration: "16:40",
      thumbnail: "/placeholder.svg?height=180&width=320",
      createdAt: new Date(2023, 2, 20),
      views: 2145,
      saved: true,
    },
    {
      id: "video-6",
      title: "Introduction to DNA and RNA",
      subject: "Biology",
      duration: "13:55",
      thumbnail: "/placeholder.svg?height=180&width=320",
      createdAt: new Date(2023, 2, 15),
      views: 1087,
      saved: false,
    },
    {
      id: "video-7",
      title: "The French Revolution",
      subject: "History",
      duration: "20:10",
      thumbnail: "/placeholder.svg?height=180&width=320",
      createdAt: new Date(2023, 2, 10),
      views: 932,
      saved: false,
    },
    {
      id: "video-8",
      title: "Calculus: Derivatives",
      subject: "Mathematics",
      duration: "17:25",
      thumbnail: "/placeholder.svg?height=180&width=320",
      createdAt: new Date(2023, 2, 5),
      views: 1432,
      saved: true,
    },
  ])

  const subjects = Array.from(new Set(videos.map((video) => video.subject)))

  const handleToggleSave = (id: string) => {
    setVideos(videos.map((video) => (video.id === id ? { ...video, saved: !video.saved } : video)))
  }

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = !filterSubject || video.subject === filterSubject

    return matchesSearch && matchesSubject
  })

  const savedVideos = filteredVideos.filter((video) => video.saved)
  const recentVideos = [...filteredVideos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  const popularVideos = [...filteredVideos].sort((a, b) => b.views - a.views)

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Videos</h1>
        <p className="text-muted-foreground">Browse AI-generated educational videos on various subjects.</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search videos..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button
            variant="outline"
            size="sm"
            className={`gap-1.5 ${!filterSubject ? "bg-primary/10" : ""}`}
            onClick={() => setFilterSubject(null)}
          >
            <Filter className="h-4 w-4" />
            All
          </Button>
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant="outline"
              size="sm"
              className={`gap-1.5 ${filterSubject === subject ? "bg-primary/10" : ""}`}
              onClick={() => setFilterSubject(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">All Videos</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <VideoCard video={video} onToggleSave={handleToggleSave} />
              </motion.div>
            ))}
            {filteredVideos.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="text-4xl">🎬</div>
                <h3 className="mt-4 text-lg font-semibold">No videos found</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <VideoCard video={video} onToggleSave={handleToggleSave} />
              </motion.div>
            ))}
            {savedVideos.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="text-4xl">🔖</div>
                <h3 className="mt-4 text-lg font-semibold">No saved videos</h3>
                <p className="mt-2 text-sm text-muted-foreground">Save videos to watch them later</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recentVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <VideoCard video={video} onToggleSave={handleToggleSave} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <VideoCard video={video} onToggleSave={handleToggleSave} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface VideoCardProps {
  video: Video
  onToggleSave: (id: string) => void
}

function VideoCard({ video, onToggleSave }: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative">
        <Link href={`/chat?video=${video.id}`}>
          <div className="aspect-video overflow-hidden bg-muted">
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:bg-black/20 hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
              <PlayCircle className="h-6 w-6" />
            </div>
          </div>
        </Link>
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
          {video.duration}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Link href={`/chat?video=${video.id}`} className="group">
              <h3 className="line-clamp-2 font-semibold group-hover:text-primary">{video.title}</h3>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => onToggleSave(video.id)}>
                  <Bookmark className={`h-4 w-4 ${video.saved ? "fill-current" : ""}`} />
                  <span>{video.saved ? "Unsave" : "Save"}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Badge variant="outline">{video.subject}</Badge>
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>{formatViews(video.views)} views</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}