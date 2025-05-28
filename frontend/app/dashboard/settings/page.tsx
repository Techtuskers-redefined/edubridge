"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Ear, Users, Bell, Moon, Sun, Save, Lock, Shield, Globe, Laptop } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    account: {
      email: "alex@example.com",
      password: "••••••••••••",
    },
    preferences: {
      learningPreference: "standard",
      language: "english",
      theme: "system",
    },
    notifications: {
      email: true,
      push: true,
      weeklyReport: true,
      newContent: false,
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
    },
    privacy: {
      shareProgress: true,
      showProfilePublicly: true,
      allowDataCollection: true,
    }
  });

  const handleSwitchChange = (section: string, field: string, value: boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSelectChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    });
  };

  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account information and password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.account.email} 
                      onChange={(e) => setFormData({
                        ...formData,
                        account: { ...formData.account, email: e.target.value }
                      })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={formData.account.password} 
                      onChange={(e) => setFormData({
                        ...formData,
                        account: { ...formData.account, password: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your account security settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <Label>Two-Factor Authentication</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <Label>Login History</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        View your recent login activity
                      </p>
                    </div>
                    <Button variant="outline">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>
                  Customize how you learn and interact with content.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="learning-preference">Learning Style</Label>
                    <Select 
                      value={formData.preferences.learningPreference} 
                      onValueChange={(value) => handleSelectChange('preferences', 'learningPreference', value)}
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
                  <div className="grid gap-2">
                    <Label htmlFor="language">Language</Label>
                    <Select 
                      value={formData.preferences.language} 
                      onValueChange={(value) => handleSelectChange('preferences', 'language', value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>English</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="spanish">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>Spanish</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="french">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>French</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="german">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>German</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
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
                <CardDescription>
                  Customize the appearance of the application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label>Theme</Label>
                    <div className="flex gap-4">
                      <div 
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 ${formData.preferences.theme === 'light' ? 'border-primary bg-primary/10' : ''}`}
                        onClick={() => handleSelectChange('preferences', 'theme', 'light')}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <Sun className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                      <div 
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 ${formData.preferences.theme === 'dark' ? 'border-primary bg-primary/10' : ''}`}
                        onClick={() => handleSelectChange('preferences', 'theme', 'dark')}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <Moon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">Dark</span>
                      </div>
                      <div 
                        className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border p-4 ${formData.preferences.theme === 'system' ? 'border-primary bg-primary/10' : ''}`}
                        onClick={() => handleSelectChange('preferences', 'theme', 'system')}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <Laptop className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium">System</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch 
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) => handleSwitchChange('notifications', 'email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device
                      </p>
                    </div>
                    <Switch 
                      checked={formData.notifications.push}
                      onCheckedChange={(checked) => handleSwitchChange('notifications', 'push', checked)}
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
                      onCheckedChange={(checked) => handleSwitchChange('notifications', 'weeklyReport', checked)}
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
                      onCheckedChange={(checked) => handleSwitchChange('notifications', 'newContent', checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Settings</CardTitle>
                <CardDescription>
                  Customize the application to meet your accessibility needs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>High Contrast Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch 
                      checked={formData.accessibility.highContrast}
                      onCheckedChange={(checked) => handleSwitchChange('accessibility', 'highContrast', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Large Text</Label>
                      <p className="text-sm text-muted-foreground">
                        Increase text size throughout the application
                      </p>
                    </div>
                    <Switch 
                      checked={formData.accessibility.largeText}
                      onCheckedChange={(checked) => handleSwitchChange('accessibility', 'largeText', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y
-0.5">
                      <Label>Reduced Motion</Label>
                      <p className="text-sm text-muted-foreground">
                        Minimize animations and motion effects
                      </p>
                    </div>
                    <Switch 
                      checked={formData.accessibility.reducedMotion}
                      onCheckedChange={(checked) => handleSwitchChange('accessibility', 'reducedMotion', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Screen Reader Optimization</Label>
                      <p className="text-sm text-muted-foreground">
                        Optimize content for screen readers
                      </p>
                    </div>
                    <Switch 
                      checked={formData.accessibility.screenReader}
                      onCheckedChange={(checked) => handleSwitchChange('accessibility', 'screenReader', checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage your privacy and data sharing preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Share Learning Progress</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow other users to see your learning progress
                      </p>
                    </div>
                    <Switch 
                      checked={formData.privacy.shareProgress}
                      onCheckedChange={(checked) => handleSwitchChange('privacy', 'shareProgress', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Public Profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch 
                      checked={formData.privacy.showProfilePublicly}
                      onCheckedChange={(checked) => handleSwitchChange('privacy', 'showProfilePublicly', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow us to collect anonymous usage data to improve the platform
                      </p>
                    </div>
                    <Switch 
                      checked={formData.privacy.allowDataCollection}
                      onCheckedChange={(checked) => handleSwitchChange('privacy', 'allowDataCollection', checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Manage your personal data and account information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Download Your Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Download a copy of all your personal data
                      </p>
                    </div>
                    <Button variant="outline">Download</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Delete Account</Label>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
