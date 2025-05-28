"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, BookOpen, MessageSquare, Award, Calendar, Clock, Check, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type: "achievement" | "reminder" | "message" | "system"
  title: string
  description: string
  time: Date
  read: boolean
  actionUrl?: string
  icon: React.ReactNode
}

export default function NotificationsPage() {
  const { toast } = useToast()

  // This would come from an API in a real app
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      type: "achievement",
      title: "Achievement Unlocked!",
      description: "You've earned the 'Fast Learner' badge for completing 5 topics in a single day.",
      time: new Date(2023, 3, 15, 14, 30),
      read: false,
      actionUrl: "/dashboard/progress?tab=achievements",
      icon: <Award className="h-5 w-5 text-yellow-500" />,
    },
    {
      id: "notif-2",
      type: "reminder",
      title: "Learning Reminder",
      description: "Don't forget to continue your Algebra lesson today to maintain your 7-day streak!",
      time: new Date(2023, 3, 15, 10, 15),
      read: false,
      actionUrl: "/chat?topic=algebra",
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "notif-3",
      type: "message",
      title: "New Comment on Your Question",
      description: "Sarah Williams replied to your question about photosynthesis.",
      time: new Date(2023, 3, 14, 16, 45),
      read: true,
      actionUrl: "/community",
      icon: <MessageSquare className="h-5 w-5 text-green-500" />,
    },
    {
      id: "notif-4",
      type: "system",
      title: "New Content Available",
      description: "We've added new topics in Biology. Check them out!",
      time: new Date(2023, 3, 13, 9, 20),
      read: true,
      actionUrl: "/subjects/biology",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
    },
    {
      id: "notif-5",
      type: "achievement",
      title: "Weekly Progress Report",
      description: "You've spent 12 hours learning this week. Great job!",
      time: new Date(2023, 3, 12, 18, 0),
      read: true,
      actionUrl: "/dashboard/progress",
      icon: <Clock className="h-5 w-5 text-indigo-500" />,
    },
  ])

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
    toast({
      title: "All notifications marked as read",
      description: "Your notifications have been updated.",
    })
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
    toast({
      title: "Notification deleted",
      description: "The notification has been removed.",
    })
  }

  const unreadNotifications = notifications.filter((notif) => !notif.read)
  const achievementNotifications = notifications.filter((notif) => notif.type === "achievement")
  const reminderNotifications = notifications.filter((notif) => notif.type === "reminder")
  const messageNotifications = notifications.filter((notif) => notif.type === "message")
  const systemNotifications = notifications.filter((notif) => notif.type === "system")

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(date)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <p className="text-muted-foreground">Stay updated with your learning progress and community interactions.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead} disabled={unreadNotifications.length === 0}>
            Mark All as Read
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">
            All
            {unreadNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {unreadNotifications.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NotificationCard
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState message="No notifications to display" />
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NotificationCard
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState message="No unread notifications" />
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          {achievementNotifications.length > 0 ? (
            achievementNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NotificationCard
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState message="No achievement notifications" />
          )}
        </TabsContent>

        <TabsContent value="reminders" className="space-y-4">
          {reminderNotifications.length > 0 ? (
            reminderNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NotificationCard
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState message="No reminder notifications" />
          )}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {messageNotifications.length > 0 ? (
            messageNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NotificationCard
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState message="No message notifications" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}

function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  return (
    <Card className={`transition-all hover:shadow-md ${!notification.read ? "border-l-4 border-l-primary" : ""}`}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
            {notification.icon}
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex flex-col justify-between gap-1 md:flex-row md:items-center">
              <h3 className="font-semibold">{notification.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{formatTime(notification.time)}</span>
                {!notification.read && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    New
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{notification.description}</p>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                {notification.actionUrl && (
                  <Button variant="link" className="h-auto p-0" asChild>
                    <a href={notification.actionUrl}>View Details</a>
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1.5"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only md:not-sr-only">Mark as Read</span>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-destructive hover:text-destructive"
                  onClick={() => onDelete(notification.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only md:not-sr-only">Delete</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface EmptyStateProps {
  message: string
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Bell className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{message}</h3>
      <p className="mt-2 text-sm text-muted-foreground">You're all caught up!</p>
    </div>
  )
}

function formatTime(date: Date) {
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 1) {
    return "Just now"
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`
  } else {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }
}