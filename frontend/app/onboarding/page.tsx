"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Ear, Users, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export default function OnboardingPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleContinue = () => {
    if (selectedOption) {
      // In a real app, we would save this preference to the user's profile
      // For now, we'll just navigate to the dashboard
      router.push("/dashboard")
    }
  }

  const options = [
    {
      id: "visual",
      title: "Visually Impaired",
      description: "Prioritizes text-to-speech with AI voiceovers and enhanced audio descriptions.",
      icon: <Eye className="h-6 w-6" />,
    },
    {
      id: "hearing",
      title: "Hearing Impaired",
      description: "Includes detailed subtitles, sign language animations, and visual cues.",
      icon: <Ear className="h-6 w-6" />,
    },
    {
      id: "standard",
      title: "Standard Learning",
      description: "Provides AI-enhanced explanations with videos, subtitles, and audio.",
      icon: <Users className="h-6 w-6" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl">Customize Your Learning Experience</CardTitle>
            <CardDescription className="text-base sm:text-lg">
              Select your learning preference to personalize your experience
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {options.map((option) => (
                <motion.div key={option.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Card
                    className={cn(
                      "cursor-pointer transition-all hover:border-primary",
                      selectedOption === option.id && "border-2 border-primary",
                    )}
                    onClick={() => setSelectedOption(option.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        {option.icon}
                      </div>
                      <h3 className="font-semibold">{option.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{option.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleContinue} disabled={!selectedOption} className="gap-1.5">
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

