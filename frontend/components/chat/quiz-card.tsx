"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle } from "lucide-react"
import { motion } from "framer-motion"

export function QuizCard() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const correctAnswer = "b" // Hardcoded for this example

  const handleSubmit = () => {
    if (selectedOption) {
      setIsSubmitted(true)
    }
  }

  const isCorrect = selectedOption === correctAnswer

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="font-medium">What is the main cause of the greenhouse effect on Earth?</div>
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption} disabled={isSubmitted}>
              <div className="flex items-start space-x-2 space-y-1">
                <RadioGroupItem value="a" id="option-a" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="option-a"
                    className={`font-normal ${isSubmitted && correctAnswer === "a" ? "text-green-500 font-medium" : ""}`}
                  >
                    Ozone depletion
                  </Label>
                </div>
                {isSubmitted && correctAnswer === "a" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {isSubmitted && selectedOption === "a" && correctAnswer !== "a" && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex items-start space-x-2 space-y-1">
                <RadioGroupItem value="b" id="option-b" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="option-b"
                    className={`font-normal ${isSubmitted && correctAnswer === "b" ? "text-green-500 font-medium" : ""}`}
                  >
                    Carbon dioxide and other greenhouse gases
                  </Label>
                </div>
                {isSubmitted && correctAnswer === "b" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {isSubmitted && selectedOption === "b" && correctAnswer !== "b" && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex items-start space-x-2 space-y-1">
                <RadioGroupItem value="c" id="option-c" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="option-c"
                    className={`font-normal ${isSubmitted && correctAnswer === "c" ? "text-green-500 font-medium" : ""}`}
                  >
                    Solar flares
                  </Label>
                </div>
                {isSubmitted && correctAnswer === "c" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {isSubmitted && selectedOption === "c" && correctAnswer !== "c" && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex items-start space-x-2 space-y-1">
                <RadioGroupItem value="d" id="option-d" className="mt-1" />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="option-d"
                    className={`font-normal ${isSubmitted && correctAnswer === "d" ? "text-green-500 font-medium" : ""}`}
                  >
                    Ocean currents
                  </Label>
                </div>
                {isSubmitted && correctAnswer === "d" && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {isSubmitted && selectedOption === "d" && correctAnswer !== "d" && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </RadioGroup>

            {isSubmitted && (
              <div
                className={`mt-4 rounded-lg p-3 ${isCorrect ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"}`}
              >
                {isCorrect ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>
                      Correct! Carbon dioxide and other greenhouse gases trap heat in Earth's atmosphere, causing the
                      greenhouse effect.
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    <span>
                      Incorrect. The correct answer is: Carbon dioxide and other greenhouse gases trap heat in Earth's
                      atmosphere, causing the greenhouse effect.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          {!isSubmitted ? (
            <Button onClick={handleSubmit} disabled={!selectedOption}>
              Submit Answer
            </Button>
          ) : (
            <Button variant="outline">Next Question</Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}

