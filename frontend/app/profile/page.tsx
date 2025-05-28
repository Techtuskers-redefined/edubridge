"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Check, Edit, Eye, Ear, Users, Moon, Sun, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [editMode, setEditMode] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "High school student passionate about science and technology.",
    learningPreference: "standard",
    notifications: {
      email: true,
      push: true,
      weeklyReport: true,
      newContent: false,
    },
    appearance: "system",
    accessibility: {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (field: string, subfield: string, value: boolean) => {
    setFormData((prev) => ({
        ...prev,
        [field]: {
            // @ts-ignore
          ...(prev[field] ?? {}), // Ensure it's an object before spreading
          [subfield]: value,
        },
      }));
      
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    // In a real app, this would save to a database
    setEditMode(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
      variant: "default",
    })
  }

  const getLearningIcon = () => {
    switch (formData.learningPreference) {
      case "visual":
        return <Eye className="h-4 w-4" />
      case "hearing":
        return <Ear className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader className="relative">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and public profile.</CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-6 top-6"
                  onClick={() => setEditMode(!editMode)}
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit Profile</span>
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarPreview || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      {editMode && (
                        <div className="absolute -bottom-2 -right-2">
                          <label htmlFor="avatar-upload" className="cursor-pointer">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                              <Camera className="h-4 w-4" />
                            </div>
                            <input
                              id="avatar-upload"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleAvatarChange}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getLearningIcon()}
                        {formData.learningPreference === "visual"
                          ? "Visual Learner"
                          : formData.learningPreference === "hearing"
                            ? "Hearing Impaired"
                            : "Standard Learner"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editMode}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        disabled={!editMode}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              {editMode && (
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Learning Achievements</CardTitle>
                <CardDescription>Your learning progress and achievements.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                    <div className="text-3xl font-bold">24</div>
                    <div className="text-sm text-muted-foreground">Topics Completed</div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                    <div className="text-3xl font-bold">7</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border p-4 text-center">
                    <div className="text-3xl font-bold">42</div>
                    <div className="text-sm text-muted-foreground">Quizzes Passed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>Customize how you learn and interact with content.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="learning-preference">Learning Style</Label>
                    <Select
                      value={formData.learningPreference}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, learningPreference: value }))}
                    >
                      <SelectTrigger id="learning-preference">
                        <SelectValue placeholder="Select learning style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visual">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>Visual Impaired</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="hearing">
                          <div className="flex items-center gap-2">
                            <Ear className="h-4 w-4" />
                            <span>Hearing Impaired</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="standard">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            <span>Standard Learning</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the appearance of the application.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Theme</Label>
                    <div className="flex gap-4">
                      <div
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 ${formData.appearance === "light" ? "border-primary bg-primary/10" : ""}`}
                        onClick={() => setFormData((prev) => ({ ...prev, appearance: "light" }))}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <Sun className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Light</span>
                        {formData.appearance === "light" && (
                          <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 ${formData.appearance === "dark" ? "border-primary bg-primary/10" : ""}`}
                        onClick={() => setFormData((prev) => ({ ...prev, appearance: "dark" }))}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <Moon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Dark</span>
                        {formData.appearance === "dark" && (
                          <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
                        )}
                      </div>
                      <div
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 ${formData.appearance === "system" ? "border-primary bg-primary/10" : ""}`}
                        onClick={() => setFormData((prev) => ({ ...prev, appearance: "system" }))}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <div className="flex">
                            <Sun className="h-5 w-5 text-primary" />
                            <Moon className="h-5 w-5 text-primary" />
                          </div>
                        </div>
                        <span className="text-sm font-medium">System</span>
                        {formData.appearance === "system" && (
                          <Check className="absolute right-2 top-2 h-4 w-4 text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how and when you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) => handleSwitchChange("notifications", "email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch
                      checked={formData.notifications.push}
                      onCheckedChange={(checked) => handleSwitchChange("notifications", "push", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Progress Report</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive a weekly summary of your learning progress
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.weeklyReport}
                      onCheckedChange={(checked) => handleSwitchChange("notifications", "weeklyReport", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Content Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when new content is available in your subjects
                      </p>
                    </div>
                    <Switch
                      checked={formData.notifications.newContent}
                      onCheckedChange={(checked) => handleSwitchChange("notifications", "newContent", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>Customize the application to meet your accessibility needs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>High Contrast Mode</Label>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                    <Switch
                      checked={formData.accessibility.highContrast}
                      onCheckedChange={(checked) => handleSwitchChange("accessibility", "highContrast", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Large Text</Label>
                      <p className="text-sm text-muted-foreground">Increase text size throughout the application</p>
                    </div>
                    <Switch
                      checked={formData.accessibility.largeText}
                      onCheckedChange={(checked) => handleSwitchChange("accessibility", "largeText", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">Minimize animations and motion effects</p>
                    </div>
                    <Switch
                      checked={formData.accessibility.reducedMotion}
                      onCheckedChange={(checked) => handleSwitchChange("accessibility", "reducedMotion", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Screen Reader Optimization</Label>
                      <p className="text-sm text-muted-foreground">Optimize content for screen readers</p>
                    </div>
                    <Switch
                      checked={formData.accessibility.screenReader}
                      onCheckedChange={(checked) => handleSwitchChange("accessibility", "screenReader", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}