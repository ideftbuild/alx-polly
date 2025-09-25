"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { PollVoting } from "@/components/polls/poll-voting"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Poll } from "@/types"
import { ArrowLeft, Share2, Edit, Trash2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { isPollActive, getPollTotalVotes } from "@/lib/poll-utils"

// Mock data - replace with actual API calls
const mockPoll: Poll = {
  id: "1",
  title: "What's your favorite programming language?",
  description: "Help us understand the programming language preferences in our community. This poll will help us decide what technologies to focus on in our upcoming projects.",
  options: [
    { id: "1a", text: "JavaScript", votes: 45, pollId: "1" },
    { id: "1b", text: "Python", votes: 38, pollId: "1" },
    { id: "1c", text: "Java", votes: 22, pollId: "1" },
    { id: "1d", text: "TypeScript", votes: 35, pollId: "1" },
    { id: "1e", text: "Go", votes: 18, pollId: "1" },
    { id: "1f", text: "Rust", votes: 12, pollId: "1" }
  ],
  creatorId: "user1",
  creator: {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  allowMultipleVotes: false,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
}

interface PollPageProps {
  params: {
    id: string
  }
}

export default function PollPage() {
  const params = useParams()
  const router = useRouter()
  const pollId = params?.id as string

  const [poll, setPoll] = useState<Poll | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVoting, setIsVoting] = useState(false)
  const [userVotes, setUserVotes] = useState<string[]>([])
  const [hasVoted, setHasVoted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Mock current user - replace with actual auth
  const currentUserId = "user2" // Change to "user1" to test owner actions

  // Mock API call to fetch poll
  useEffect(() => {
    const fetchPoll = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))

        if (pollId === "1") {
          setPoll(mockPoll)

          // Mock user's previous votes - replace with actual API call
          const mockUserVotes: string[] = [] // Empty array means user hasn't voted
          setUserVotes(mockUserVotes)
          setHasVoted(mockUserVotes.length > 0)

          // Show results if poll is expired or user has voted
          const isExpired = mockPoll.expiresAt && new Date(mockPoll.expiresAt) < new Date()
          setShowResults(isExpired || mockUserVotes.length > 0)
        } else {
          setError("Poll not found")
        }
      } catch (error) {
        console.error("Failed to fetch poll:", error)
        setError("Failed to load poll")
      } finally {
        setIsLoading(false)
      }
    }

    if (pollId) {
      fetchPoll()
    }
  }, [pollId])

  const handleVote = async (optionIds: string[]) => {
    if (!poll) return

    setIsVoting(true)

    try {
      // TODO: Implement actual voting API call
      console.log("Voting for options:", optionIds)

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock successful vote - update poll data
      const updatedPoll = { ...poll }
      updatedPoll.options = updatedPoll.options.map(option => ({
        ...option,
        votes: optionIds.includes(option.id) ? option.votes + 1 : option.votes
      }))
      // Total votes are calculated dynamically from options

      setPoll(updatedPoll)
      setUserVotes(optionIds)
      setHasVoted(true)
      setShowResults(true)

    } catch (error) {
      console.error("Failed to submit vote:", error)
      // TODO: Show error message to user
    } finally {
      setIsVoting(false)
    }
  }

  const handleShare = async () => {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({
          title: poll?.title || "Check out this poll",
          text: poll?.description || "Vote on this interesting poll!",
          url: url,
        })
      } catch (error) {
        // User cancelled sharing or error occurred
        console.log("Sharing cancelled or failed:", error)
      }
    } else {
      // Fallback to copying to clipboard
      try {
        await navigator.clipboard.writeText(url)
        // TODO: Show success toast
        console.log("Link copied to clipboard!")
      } catch (error) {
        console.error("Failed to copy link:", error)
      }
    }
  }

  const handleEdit = () => {
    // Navigate to edit poll page
    router.push(`/polls/${pollId}/edit`)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this poll? This action cannot be undone.")) {
      return
    }

    try {
      // TODO: Implement delete API call
      console.log("Deleting poll:", pollId)

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Navigate back to polls list
      router.push("/polls")
    } catch (error) {
      console.error("Failed to delete poll:", error)
      // TODO: Show error message
    }
  }

  const isOwner = poll && currentUserId === poll.creatorId
  const isExpired = poll?.expiresAt && new Date(poll.expiresAt) < new Date()
  const canVote = poll ? isPollActive(poll) && !isExpired && !hasVoted : false

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-20 mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>

            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-2 bg-gray-300 rounded w-full"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error || !poll) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/polls" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Polls
          </Link>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto mb-4 text-muted-foreground">
                  <BarChart3 className="w-full h-full" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {error || "Poll not found"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  The poll you're looking for doesn't exist or has been removed.
                </p>
                <Link href="/polls">
                  <Button>
                    Browse All Polls
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/polls" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Polls
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            {isOwner && (
              <>
                <Button variant="outline" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Poll Voting Component */}
        <PollVoting
          poll={poll}
          onVote={handleVote}
          isLoading={isVoting}
          showResults={showResults}
          userVotes={userVotes}
          className="w-full"
        />

        {/* Additional Poll Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Poll Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Created by:</span>
                <span className="ml-2">{poll.creator?.name || "Anonymous"}</span>
              </div>
              <div>
                <span className="font-medium">Created on:</span>
                <span className="ml-2">
                  {new Date(poll.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <div>
                <span className="font-medium">Total votes:</span>
                <span className="ml-2 font-bold">{getPollTotalVotes(poll)}</span>
              </div>
              {poll.expiresAt && (
                <div>
                  <span className="font-medium">
                    {isExpired ? "Expired on:" : "Expires on:"}
                  </span>
                  <span className="ml-2">
                    {new Date(poll.expiresAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant={isPollActive(poll) && !isExpired ? "default" : "secondary"}>
                {isPollActive(poll) && !isExpired ? "Active" : isExpired ? "Expired" : "Inactive"}
              </Badge>
              {poll.allowMultipleVotes && (
                <Badge variant="outline">
                  Multiple votes allowed
                </Badge>
              )}
              {hasVoted && (
                <Badge variant="outline">
                  You have voted
                </Badge>
              )}
              {isOwner && (
                <Badge variant="outline">
                  Your poll
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Related Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What's Next?</CardTitle>
            <CardDescription>
              Explore more polls or create your own
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Link href="/polls">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Browse More Polls
              </Button>
            </Link>
            <Link href="/create-poll">
              <Button>
                Create Your Own Poll
              </Button>
            </Link>
            {isOwner && (
              <Link href="/dashboard">
                <Button variant="outline">
                  View Dashboard
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
