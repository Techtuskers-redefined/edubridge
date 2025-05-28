import Link from "next/link"
import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">EduBridge</span>
        </div>
        <nav className="flex flex-wrap gap-4 md:gap-6">
          <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonials
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
            Terms of Service
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} EduBridge. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

