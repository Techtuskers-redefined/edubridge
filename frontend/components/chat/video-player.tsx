"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Subtitles, Maximize2, SkipBack, SkipForward } from "lucide-react"
import { motion } from "framer-motion"

export function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles)
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-black">
          {/* Placeholder for video content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=360&width=640"
              alt="Video placeholder"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Subtitles */}
          {showSubtitles && (
            <div className="absolute bottom-16 left-0 right-0 text-center">
              <div className="mx-auto inline-block rounded-md bg-black/70 px-4 py-1 text-white">
                This is an example of AI-generated subtitles for the video content.
              </div>
            </div>
          )}

          {/* Video controls overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
            <Button
              variant="ghost"
              size="icon"
              className="h-16 w-16 rounded-full bg-black/50 text-white hover:bg-black/70"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </Button>
          </div>

          {/* Video controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="space-y-2">
              <Slider
                value={[progress]}
                max={100}
                step={1}
                onValueChange={(value) => setProgress(value[0])}
                className="cursor-pointer"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-white hover:bg-white/20"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <div className="text-xs text-white">0:45 / 3:21</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:bg-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                    <Slider
                      value={[volume]}
                      max={100}
                      step={1}
                      onValueChange={(value) => setVolume(value[0])}
                      className="w-20 cursor-pointer"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-8 w-8 text-white hover:bg-white/20 ${showSubtitles ? "bg-white/20" : ""}`}
                    onClick={toggleSubtitles}
                  >
                    <Subtitles className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold">AI-Generated Educational Video</h3>
            <p className="text-sm text-muted-foreground">
              This video was generated based on your query to help visualize and explain the concept.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

