"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Upload, Mic } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { VideoPlayer } from "@/components/chat/video-player"
import { ChatMessage } from "@/components/chat/chat-message"
import { QuizCard } from "@/components/chat/quiz-card"
import { useSearchParams } from "next/navigation"

export default function ChatPage() {
  const searchParams = useSearchParams()
  const topic = searchParams.get("topic")

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<
    Array<{
      id: string
      role: "user" | "assistant"
      content: string
      timestamp: Date
      hasVideo?: boolean
      hasQuiz?: boolean
    }>
  >([])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with a welcome message or topic-specific message
  useEffect(() => {
    let initialMessage = {
      id: "welcome",
      role: "assistant" as const,
      content: "Hello! I'm your AI learning assistant. What would you like to learn about today?",
      timestamp: new Date(),
    }

    if (topic) {
      const topicMap: Record<string, string> = {
        "solar-system": "the Solar System",
        "world-war-2": "World War II",
        algebra: "Algebra Fundamentals",
      }

      const topicName = topicMap[topic] || topic

      initialMessage = {
        id: "topic-intro",
        role: "assistant" as const,
        content: `Let's continue learning about ${topicName}. What specific aspect would you like to explore?`,
        timestamp: new Date(),
        // hasVideo: true,
      }
    }

    setMessages([initialMessage])
  }, [topic])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user" as const,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      const lowerInput = input.toLowerCase().trim();
      const hasVideo =
        input.toLowerCase().includes("explain") ||
        input.toLowerCase().includes("how") ||
        input.toLowerCase().includes("what")

      // Only show quiz for chemistry question
      const hasQuiz = lowerInput === "give me a chemistry question"

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant" as const,
        content: generateAIResponse(input),
        timestamp: new Date(),
        hasVideo,
        hasQuiz,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 2000)
  }

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase().trim();
    console.log('User input:', lowerInput); // Debug log
    
    if (lowerInput === "give me a chemistry question") {
      return "Here's a chemistry question about global warming:\n\nWhat is the primary greenhouse gas responsible for global warming?\n\nA) Carbon Dioxide (CO2)\nB) Methane (CH4)\nC) Water Vapor (H2O)\nD) Nitrous Oxide (N2O)\n\nThe correct answer is A) Carbon Dioxide (CO2). While all of these are greenhouse gases, CO2 is the primary contributor to global warming due to its high concentration in the atmosphere and long atmospheric lifetime.";
    }
    
    if (lowerInput === "tell me about the first battle of panipat in brief") {
      return "The First Battle of Panipat, fought on April 21, 1526, was a decisive clash between Babur's Mughal forces and Ibrahim Lodi's Lodi Empire. Babur's victory resulted in the end of the Lodi dynasty and the establishment of the Mughal Empire in India. This battle is notable for being one of the earliest engagements involving gunpowder warfare in India, with Babur employing field artillery and firearms.\n\nKey aspects of the First Battle of Panipat:\nDate and Location: April 21, 1526, near the village of Panipat in present-day Haryana.\nBelligerents: Babur (Mughal Empire) vs. Ibrahim Lodi (Lodi Empire).\nOutcome: Babur's victory led to the end of the Lodi dynasty and the establishment of the Mughal Empire in India.\nSignificance: Marked the beginning of the Mughal period in India and introduced gunpowder warfare to the region.\nTactics: Babur's use of field artillery and gunpowder weaponry was a significant factor in his victory.";
    }

    // Default responses for other inputs
    const responses = [
      "That's a great question about this topic. Let me explain with a video I've generated for you.",
      "I've created a short video explanation that should help you understand this concept better.",
      "Here's what you need to know about this topic. I've included a video to visualize the key concepts.",
      "Let me break this down for you with a detailed explanation and a helpful video.",
      "I've analyzed your question and prepared both a text explanation and a visual aid to help you understand.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="flex w-full flex-col">
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 overflow-auto p-4">
              <div className="mx-auto max-w-4xl">
                <div className="space-y-4 pb-20">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <ChatMessage message={message} />

                      {message.hasVideo && message.role === "assistant" && (
                        <div className="ml-12 mt-4">
                          <VideoPlayer />
                        </div>
                      )}

                      {message.hasQuiz && message.role === "assistant" && (
                        <div className="ml-12 mt-4">
                          <QuizCard />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarFallback>AI</AvatarFallback>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      </Avatar>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-2">
                          <div className="font-semibold">AI Assistant</div>
                          <Badge variant="outline" className="ml-2">
                            Thinking...
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            <div className="border-t bg-background p-4">
              <div className="mx-auto max-w-4xl">
                <div className="flex flex-col space-y-2">
                  <Textarea
                    placeholder="Ask anything about your topic..."
                    className="min-h-24 resize-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload file</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mic className="h-4 w-4" />
                        <span className="sr-only">Voice input</span>
                      </Button>
                    </div>
                    <Button onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

