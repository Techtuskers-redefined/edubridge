
  
  "use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Edit, Trash2, Plus, FileText, Star, Download, Share, MoreHorizontal, Filter } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Note {
  id: string
  title: string
  content: string
  subject: string
  createdAt: Date
  updatedAt: Date
  starred: boolean
  tags: string[]
}

export default function NotesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSubject, setFilterSubject] = useState<string | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    subject: "",
  })

  // This would come from an API in a real app
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "note-1",
      title: "Cell Structure and Function",
      content:
        "The cell is the basic unit of life. All living organisms are composed of cells. There are two main types of cells: prokaryotic and eukaryotic...",
      subject: "Biology",
      createdAt: new Date(2023, 3, 15),
      updatedAt: new Date(2023, 3, 15),
      starred: true,
      tags: ["cell", "biology", "important"],
    },
    {
      id: "note-2",
      title: "Quadratic Equations",
      content:
        "A quadratic equation is a second-degree polynomial equation in a single variable x: ax² + bx + c = 0, where a ≠ 0. The solutions to this equation are given by the quadratic formula...",
      subject: "Mathematics",
      createdAt: new Date(2023, 2, 10),
      updatedAt: new Date(2023, 2, 12),
      starred: false,
      tags: ["algebra", "equations"],
    },
    {
      id: "note-3",
      title: "World War II Timeline",
      content:
        "1939: Germany invades Poland, Britain and France declare war on Germany\n1941: Japan attacks Pearl Harbor, US enters the war\n1944: D-Day landings in Normandy\n1945: Germany surrenders, atomic bombs dropped on Japan, Japan surrenders",
      subject: "History",
      createdAt: new Date(2023, 1, 5),
      updatedAt: new Date(2023, 1, 20),
      starred: true,
      tags: ["history", "war", "timeline"],
    },
    {
      id: "note-4",
      title: "Chemical Reactions",
      content:
        "Chemical reactions involve the breaking and forming of bonds between atoms. Types of reactions include synthesis, decomposition, single replacement, double replacement, and combustion...",
      subject: "Chemistry",
      createdAt: new Date(2023, 0, 25),
      updatedAt: new Date(2023, 0, 25),
      starred: false,
      tags: ["chemistry", "reactions"],
    },
    {
      id: "note-5",
      title: "Newton's Laws of Motion",
      content:
        "First Law: An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\nSecond Law: F = ma\nThird Law: For every action, there is an equal and opposite reaction.",
      subject: "Physics",
      createdAt: new Date(2022, 11, 15),
      updatedAt: new Date(2023, 0, 5),
      starred: true,
      tags: ["physics", "motion", "important"],
    },
  ])

  const subjects = Array.from(new Set(notes.map((note) => note.subject)))

  const handleCreateNote = () => {
    if (!newNote.title || !newNote.content || !newNote.subject) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to create a note.",
        variant: "destructive",
      })
      return
    }

    const newNoteObj: Note = {
      id: `note-${notes.length + 1}`,
      title: newNote.title,
      content: newNote.content,
      subject: newNote.subject,
      createdAt: new Date(),
      updatedAt: new Date(),
      starred: false,
      tags: [],
    }

    setNotes([newNoteObj, ...notes])
    setNewNote({ title: "", content: "", subject: "" })
    setIsCreateDialogOpen(false)

    toast({
      title: "Note created",
      description: "Your note has been successfully created.",
    })
  }

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))

    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted.",
    })
  }

  const handleToggleStar = (id: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, starred: !note.starred } : note)))
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = !filterSubject || note.subject === filterSubject

    return matchesSearch && matchesSubject
  })

  const starredNotes = filteredNotes.filter((note) => note.starred)
  const recentNotes = [...filteredNotes].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground">Manage your learning notes and study materials.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-1.5">
              <Plus className="h-4 w-4" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Note</DialogTitle>
              <DialogDescription>Add a new note to your collection. Fill in the details below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="Enter note title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={newNote.subject} onValueChange={(value) => setNewNote({ ...newNote, subject: value })}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  placeholder="Enter note content"
                  className="min-h-[200px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateNote}>Create Note</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`gap-1.5 ${!filterSubject ? "bg-primary/10" : ""}`}
            onClick={() => setFilterSubject(null)}
          >
            <Filter className="h-4 w-4" />
            All
          </Button>
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant="outline"
              size="sm"
              className={`gap-1.5 ${filterSubject === subject ? "bg-primary/10" : ""}`}
              onClick={() => setFilterSubject(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-8">
        <TabsList>
          <TabsTrigger value="all">All Notes</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-4">
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NoteCard note={note} onDelete={handleDeleteNote} onToggleStar={handleToggleStar} />
              </motion.div>
            ))}
            {filteredNotes.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="text-4xl">📝</div>
                <h3 className="mt-4 text-lg font-semibold">No notes found</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or create a new note</p>
                <Button className="mt-4 gap-1.5" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4" />
                  Create Note
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="starred" className="space-y-6">
          <div className="grid gap-4">
            {starredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NoteCard note={note} onDelete={handleDeleteNote} onToggleStar={handleToggleStar} />
              </motion.div>
            ))}
            {starredNotes.length === 0 && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <div className="text-4xl">⭐</div>
                <h3 className="mt-4 text-lg font-semibold">No starred notes</h3>
                <p className="mt-2 text-sm text-muted-foreground">Star your important notes to find them quickly</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-4">
            {recentNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NoteCard note={note} onDelete={handleDeleteNote} onToggleStar={handleToggleStar} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface NoteCardProps {
  note: Note
  onDelete: (id: string) => void
  onToggleStar: (id: string) => void
}

function NoteCard({ note, onDelete, onToggleStar }: NoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">{note.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={note.starred ? "text-yellow-500" : "text-muted-foreground"}
              onClick={() => onToggleStar(note.id)}
            >
              <Star className={`h-4 w-4 ${note.starred ? "fill-yellow-500" : ""}`} />
              <span className="sr-only">{note.starred ? "Unstar" : "Star"}</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                  onClick={() => onDelete(note.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{note.subject}</Badge>
          <span className="text-xs text-muted-foreground">Updated {formatDate(note.updatedAt)}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className={`prose prose-sm dark:prose-invert max-w-none ${!isExpanded ? "line-clamp-3" : ""}`}>
          {note.content}
        </div>
        {note.content.length > 150 && (
          <Button variant="link" className="h-auto p-0 text-xs" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <div className="flex w-full flex-wrap items-center gap-2">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}