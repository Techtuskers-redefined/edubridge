"use client"

import { motion } from "framer-motion"
import { Brain, Eye, Ear, Video, Sparkles, BarChart } from "lucide-react"

export function FeatureSection() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Learning",
      description: "Our platform uses advanced AI to transform textbook content into engaging learning materials.",
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Animated Videos",
      description: "Automatically generate animated videos that explain complex concepts in a visual way.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Visual Impairment Support",
      description: "Enhanced audio descriptions and text-to-speech for visually impaired students.",
    },
    {
      icon: <Ear className="h-6 w-6" />,
      title: "Hearing Impairment Support",
      description: "Detailed subtitles and visual cues for students with hearing impairments.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Interactive Quizzes",
      description: "AI-generated quizzes to test understanding and reinforce learning.",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Track learning progress and identify areas that need more attention.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Learn Better</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines AI technology with educational expertise to create a personalized learning
              experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg border bg-background p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-bold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

