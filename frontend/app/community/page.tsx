"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, MessageSquare, ThumbsUp, Share, Filter, Plus, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Post {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  subject: string
  createdAt: Date
  likes: number
  comments: number
  liked: boolean
  tags: string[]
}

export default function CommunityPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSubject, setFilterSubject] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    subject: "",
  })

  // This would come from an API in a real app
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "post-1",
      title: "Need help understanding photosynthesis",
      content:
        "I'm struggling to understand the light-dependent reactions in photosynthesis. Can someone explain how ATP is generated during this process?",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      subject: "Biology",
      createdAt: new Date(2023, 3, 15),
      likes: 12,
      comments: 8,
      liked: false,
      tags: ["photosynthesis", "help", "biology"],
    },
    {
      id: "post-2",
      title: "Study group for calculus",
      content:
        "I'm forming a study group for calculus. We'll meet twice a week to work on problems and prepare for exams. Anyone interested?",
      author: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      subject: "Mathematics",
      createdAt: new Date(2023, 3, 10),
      likes: 24,
      comments: 15,
      liked: true,
      tags: ["calculus", "study group", "mathematics"],
    },
    {
      id: "post-3",
      title: "Resources for learning quantum physics",
      content:
        "I'm looking for good resources to learn quantum physics. Any recommendations for books, videos, or online courses that explain the concepts clearly?",
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      subject: "Physics",
      createdAt: new Date(2023, 3, 5),
      likes: 18,
      comments: 12,
      liked: false,
      tags: ["quantum physics", "resources", "physics"],
    },
    {
      id: "post-4",
      title: "Tips for memorizing historical dates",
      content:
        "I'm struggling to remember all the important dates for my history exam. Does anyone have any effective memorization techniques they can share?",
      author: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      subject: "History",
      createdAt: new Date(2023, 2, 28),
      likes: 32,
      comments: 20,
      liked: true,
      tags: ["history", "memorization", "study tips"],
    },
    {
      id: "post-5",
      title: "Chemical equation balancing tricks",
      content:
        "I've found some useful tricks for balancing chemical equations quickly. Would anyone be interested in a tutorial post where I share these methods?",
      author: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      subject: "Chemistry",
      createdAt: new Date(2023, 2, 20),
      likes: 45,
      comments: 18,
      liked: false,
      tags: ["chemistry", "equations", "tutorial"],
    },
  ])

  const subjects = Array.from(new Set(posts.map((post) => post.subject)))

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content || !newPost.subject) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create a post.",
        variant: "destructive",
      })
      return
    }

    const newPostObj: Post = {
      id: `post-${posts.length + 1}`,
      title: newPost.title,
      content: newPost.content,
      author: {
        name: "You",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      subject: newPost.subject,
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      liked: false,
      tags: [],
    }

    setPosts([newPostObj, ...posts])
    setNewPost({ title: "", content: "", subject: "" })
    setIsCreateDialogOpen(false)

    toast({
      title: "Post created",
      description: "Your post has been successfully published.",
    })
  }

  const handleToggleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    )
  }

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = !filterSubject || post.subject === filterSubject

    return matchesSearch && matchesSubject
  })

  const popularPosts = [...filteredPosts].sort((a, b) => b.likes - a.likes)
  const recentPosts = [...filteredPosts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">Connect with other learners, ask questions, and share knowledge.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription>Share your question or knowledge with the community.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Post title"
                  className="text-lg font-medium"
                />
              </div>
              <div className="grid gap-2">
                <select
                  value={newPost.subject}
                  onChange={(e) => setNewPost({ ...newPost, subject: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="What would you like to share or ask?"
                  className="min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>Publish Post</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
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

      <Tabs defaultValue="recent" className="space-y-8">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="all">All Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-4">
            {recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PostCard post={post} onToggleLike={handleToggleLike} />
              </motion.div>
            ))}
            {recentPosts.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="text-4xl">💬</div>
                <h3 className="mt-4 text-lg font-semibold">No posts found</h3>
                <p className="mt-2 text-sm text-muted-foreground">Be the first to start a discussion</p>
                <Button className="mt-4 gap-1.5" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Create Post
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid gap-4">
            {popularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PostCard post={post} onToggleLike={handleToggleLike} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PostCard post={post} onToggleLike={handleToggleLike} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PostCardProps {
  post: Post
  onToggleLike: (id: string) => void
}

function PostCard({ post, onToggleLike }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date)
    }
  }

  const handleSubmitComment = () => {
    if (!commentText.trim()) return

    // In a real app, this would send the comment to an API
    setCommentText("")
    setShowComments(true)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{post.author.name}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(post.createdAt)}</span>
                <span>•</span>
                <Badge variant="outline">{post.subject}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
        <p className="text-sm text-muted-foreground">{post.content}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1.5 ${post.liked ? "text-primary" : ""}`}
              onClick={() => onToggleLike(post.id)}
            >
              <ThumbsUp className={`h-4 w-4 ${post.liked ? "fill-primary" : ""}`} />
              <span>{post.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setShowComments(!showComments)}>
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1.5">
              <Share className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </CardFooter>
      {showComments && (
        <div className="border-t p-4">
          <h4 className="mb-4 font-medium">Comments</h4>
          <div className="mb-4 space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your Avatar" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">You</div>
                </div>
                <div className="relative mt-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[80px] pr-10"
                  />
                  <Button
                    size="icon"
                    className="absolute bottom-2 right-2 h-6 w-6"
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                  >
                    <Send className="h-3 w-3" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Jane Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">Jane Doe</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
                <p className="mt-1 text-sm">This is really helpful! I've been struggling with this concept too.</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Smith" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">John Smith</div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>
                <p className="mt-1 text-sm">
                  I recommend checking out this resource: [link]. It explains the concept really well with visual
                  examples.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}