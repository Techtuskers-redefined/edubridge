"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Bookmark, Share } from "lucide-react"
import { motion } from "framer-motion"

interface ChatMessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.role === "assistant"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start space-x-4"
    >
      <Avatar>
        {isAI ? (
          <>
            <AvatarFallback>AI</AvatarFallback>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
          </>
        ) : (
          <>
            <AvatarFallback>U</AvatarFallback>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
          </>
        )}
      </Avatar>
      <div className="space-y-2 flex-1">
        <div className="flex items-center space-x-2">
          <div className="font-semibold">{isAI ? "AI Assistant" : "You"}</div>
          <div className="text-xs text-muted-foreground">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          {isAI && (
            <Badge variant="outline" className="ml-2">
              AI
            </Badge>
          )}
        </div>
        <Card className={`border ${isAI ? "bg-muted/50" : "bg-background"}`}>
          <CardContent className="p-3 text-sm">{message.content}</CardContent>
        </Card>

        {isAI && (
          <div className="flex items-center space-x-2 pt-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ThumbsUp className="h-4 w-4" />
              <span className="sr-only">Helpful</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ThumbsDown className="h-4 w-4" />
              <span className="sr-only">Not helpful</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Share className="h-4 w-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

