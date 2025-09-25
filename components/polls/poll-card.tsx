"use client"

import { Poll } from "@/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Vote } from "lucide-react"
import { isPollActive, getPollTotalVotes, getTopOption } from "@/lib/poll-utils"

interface PollCardProps {
  poll: Poll
  onVote?: () => void
  onView?: () => void
  showResults?: boolean
  className?: string
}

export function PollCard({
  poll,
  onVote,
  onView,
  showResults = false,
  className
}: PollCardProps) {
  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
  const canVote = isPollActive(poll) && !isExpired

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date))
  }

  const topOption = getTopOption(poll)

  return (
    <Card className={`hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg line-clamp-2">{poll.title}</CardTitle>
            {poll.description && (
              <CardDescription className="line-clamp-2">
                {poll.description}
              </CardDescription>
            )}
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge variant={canVote ? "default" : "secondary"}>
              {canVote ? "Active" : isExpired ? "Expired" : "Inactive"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {showResults && topOption && getPollTotalVotes(poll) > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Leading option:</span>
              <span className="text-muted-foreground">
                {Math.round((topOption.votes / getPollTotalVotes(poll)) * 100)}%
              </span>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="line-clamp-1">{topOption.text}</span>
                <span>{topOption.votes} votes</span>
              </div>
              <Progress value={(topOption.votes / getPollTotalVotes(poll)) * 100} />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Vote className="h-4 w-4" />
              <span>{getPollTotalVotes(poll)} votes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{poll.options.length} options</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Created {formatDate(poll.createdAt)}</span>
          </div>
        </div>

        {poll.expiresAt && (
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {isExpired ? "Expired" : "Expires"} {formatDate(poll.expiresAt)}
            </span>
          </div>
        )}

        {poll.allowMultipleVotes && (
          <Badge variant="outline" className="w-fit">
            Multiple votes allowed
          </Badge>
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4">
        <div className="text-sm text-muted-foreground">
          by {poll.creator?.name || "Anonymous"}
        </div>
        <div className="flex space-x-2">
          {onView && (
            <Button variant="outline" size="sm" onClick={onView}>
              View Details
            </Button>
          )}
          {onVote && canVote && (
            <Button size="sm" onClick={onVote}>
              Vote Now
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
