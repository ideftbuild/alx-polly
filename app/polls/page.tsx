"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PollCard } from "@/components/polls/poll-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Poll } from "@/types"
import { Search, Plus, Filter, TrendingUp } from "lucide-react"

// Mock data - replace with actual API calls
const mockPolls: Poll[] = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Help us understand the programming language preferences in our community",
    options: [
      { id: "1a", text: "JavaScript", votes: 45, pollId: "1" },
      { id: "1b", text: "Python", votes: 38, pollId: "1" },
      { id: "1c", text: "Java", votes: 22, pollId: "1" },
      { id: "1d", text: "TypeScript", votes: 35, pollId: "1" }
    ],
    creatorId: "user1",
    creator: { id: "user1", name: "John Doe", email: "john@example.com", avatar: null, createdAt: new Date(), updatedAt: new Date() },
    isActive: true,
    allowMultipleVotes: false,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    totalVotes: 140
  },
  {
    id: "2",
    title: "Best time for team meetings?",
    description: "Let's find the optimal time for our weekly team sync",
    options: [
      { id: "2a", text: "9:00 AM", votes: 12, pollId: "2" },
      { id: "2b", text: "11:00 AM", votes: 8, pollId: "2" },
      { id: "2c", text: "2:00 PM", votes: 15, pollId: "2" },
      { id: "2d", text: "4:00 PM", votes: 5, pollId: "2" }
    ],
    creatorId: "user2",
    creator: { id: "user2", name: "Jane Smith", email: "jane@example.com", avatar: null, createdAt: new Date(), updatedAt: new Date() },
    isActive: true,
    allowMultipleVotes: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    totalVotes: 40
  },
  {
    id: "3",
    title: "Office lunch options",
    description: null,
    options: [
      { id: "3a", text: "Pizza", votes: 25, pollId: "3" },
      { id: "3b", text: "Sandwiches", votes: 18, pollId: "3" },
      { id: "3c", text: "Salads", votes: 12, pollId: "3" }
    ],
    creatorId: "user3",
    creator: { id: "user3", name: "Mike Johnson", email: "mike@example.com", avatar: null, createdAt: new Date(), updatedAt: new Date() },
    isActive: false,
    allowMultipleVotes: false,
    expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    totalVotes: 55
  }
]

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "expired">("all")
  const [isLoading, setIsLoading] = useState(true)

  // Mock API call - replace with actual implementation
  useEffect(() => {
    const fetchPolls = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        setPolls(mockPolls)
      } catch (error) {
        console.error("Failed to fetch polls:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPolls()
  }, [])

  // Filter and search polls
  useEffect(() => {
    let filtered = polls

    // Apply status filter
    if (activeFilter === "active") {
      filtered = filtered.filter(poll => {
        const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
        return poll.isActive && !isExpired
      })
    } else if (activeFilter === "expired") {
      filtered = filtered.filter(poll => {
        const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
        return !poll.isActive || isExpired
      })
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(poll =>
        poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.creator?.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    setFilteredPolls(filtered)
  }, [polls, searchQuery, activeFilter])

  const handlePollView = (pollId: string) => {
    // Navigate to poll detail page
    window.location.href = `/polls/${pollId}`
  }

  const handlePollVote = (pollId: string) => {
    // Navigate to poll voting page
    window.location.href = `/polls/${pollId}`
  }

  const getActivePolls = () => polls.filter(poll => {
    const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
    return poll.isActive && !isExpired
  })

  const getExpiredPolls = () => polls.filter(poll => {
    const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
    return !poll.isActive || isExpired
  })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold tracking-tight">All Polls</h1>
          <p className="text-muted-foreground">
            Discover and participate in polls from the community
          </p>
        </div>
        <Link href="/create-poll">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Poll
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Total Polls</p>
                <p className="text-2xl font-bold">{polls.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Active Polls</p>
                <p className="text-2xl font-bold">{getActivePolls().length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-500" />
              <div className="ml-2">
                <p className="text-sm font-medium leading-none">Expired Polls</p>
                <p className="text-2xl font-bold">{getExpiredPolls().length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search polls by title, description, or creator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex space-x-1">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button
              variant={activeFilter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("active")}
            >
              Active
            </Button>
            <Button
              variant={activeFilter === "expired" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("expired")}
            >
              Expired
            </Button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          {filteredPolls.length === 0 ? "No polls found" :
           filteredPolls.length === 1 ? "1 poll found" :
           `${filteredPolls.length} polls found`}
        </p>
      </div>

      {/* Polls Grid */}
      {filteredPolls.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground">
                <Search className="w-full h-full" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No polls found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || activeFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Be the first to create a poll!"
                }
              </p>
              {!searchQuery && activeFilter === "all" && (
                <Link href="/create-poll">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Poll
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPolls.map((poll) => (
            <PollCard
              key={poll.id}
              poll={poll}
              onView={() => handlePollView(poll.id)}
              onVote={() => handlePollVote(poll.id)}
              showResults={!poll.isActive || (poll.expiresAt && new Date(poll.expiresAt) < new Date())}
            />
          ))}
        </div>
      )}
    </div>
  )
}
