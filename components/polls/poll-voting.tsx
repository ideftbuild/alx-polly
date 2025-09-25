"use client"

import { useState } from "react"
import { Poll, PollOption } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Vote, Users, Calendar } from "lucide-react"
import { isPollActive, getPollTotalVotes, getVotePercentage } from "@/lib/poll-utils"

interface PollVotingProps {
  poll: Poll
  onVote: (optionIds: string[]) => Promise<void>
  isLoading?: boolean
  showResults?: boolean
  userVotes?: string[]
  className?: string
}

export function PollVoting({
  poll,
  onVote,
  isLoading = false,
  showResults = false,
  userVotes = [],
  className
}: PollVotingProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(userVotes)
  const [hasVoted, setHasVoted] = useState(userVotes.length > 0)

  const isExpired = poll.expiresAt && new Date(poll.expiresAt) < new Date()
  const canVote = isPollActive(poll) && !isExpired && !hasVoted

  const handleSingleSelect = (optionId: string) => {
    setSelectedOptions([optionId])
  }

  const handleMultiSelect = (optionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions(prev => [...prev, optionId])
    } else {
      setSelectedOptions(prev => prev.filter(id => id !== optionId))
    }
  }

  const handleSubmitVote = async () => {
    if (selectedOptions.length === 0) return

    try {
      await onVote(selectedOptions)
      setHasVoted(true)
    } catch (error) {
      console.error("Failed to submit vote:", error)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getOptionVotePercentage = (option: PollOption) => {
    const totalVotes = getPollTotalVotes(poll)
    return getVotePercentage(option.votes, totalVotes)
  }

  const sortedOptions = [...poll.options].sort((a, b) => {
    if (showResults) return b.votes - a.votes
    return 0 // Keep original order when not showing results
  })

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{poll.title}</CardTitle>
            {poll.description && (
              <CardDescription className="text-base">
                {poll.description}
              </CardDescription>
            )}
          </div>
          <Badge variant={canVote ? "default" : "secondary"}>
            {canVote ? "Active" : isExpired ? "Expired" : hasVoted ? "Voted" : "Inactive"}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Vote className="h-4 w-4" />
              <span>{getPollTotalVotes(poll)} total votes</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>by {poll.creator?.name || "Anonymous"}</span>
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

        <div className="flex flex-wrap gap-2">
          {poll.allowMultipleVotes && (
            <Badge variant="outline">
              Multiple votes allowed
            </Badge>
          )}
          {showResults && (
            <Badge variant="outline">
              Results visible
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {canVote && !poll.allowMultipleVotes && (
          <RadioGroup
            value={selectedOptions[0] || ""}
            onValueChange={handleSingleSelect}
            className="space-y-3"
          >
            {poll.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer text-base leading-relaxed"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {canVote && poll.allowMultipleVotes && (
          <div className="space-y-3">
            {poll.options.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedOptions.includes(option.id)}
                  onCheckedChange={(checked) =>
                    handleMultiSelect(option.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer text-base leading-relaxed"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        )}

        {(showResults || hasVoted || !canVote) && (
          <div className="space-y-4">
            <h3 className="font-semibold text-base">Results</h3>
            <div className="space-y-3">
              {sortedOptions.map((option, index) => (
                <div key={option.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">
                        #{index + 1}
                      </span>
                      <span className="text-base leading-relaxed">
                        {option.text}
                      </span>
                      {userVotes.includes(option.id) && (
                        <Badge variant="default" className="text-xs">
                          Your vote
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="font-medium">
                        {getOptionVotePercentage(option)}%
                      </span>
                      <span className="text-muted-foreground">
                        ({option.votes} votes)
                      </span>
                    </div>
                  </div>
                  <Progress value={getOptionVotePercentage(option)} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {canVote && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {poll.allowMultipleVotes
                ? `${selectedOptions.length} option${selectedOptions.length !== 1 ? 's' : ''} selected`
                : selectedOptions.length > 0
                  ? "1 option selected"
                  : "No option selected"
              }
            </div>
            <Button
              onClick={handleSubmitVote}
              disabled={selectedOptions.length === 0 || isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? "Submitting..." : "Submit Vote"}
            </Button>
          </div>
        )}

        {hasVoted && !showResults && (
          <div className="text-center py-4 text-muted-foreground">
            <p>Thank you for voting! Results will be shown when the poll ends.</p>
          </div>
        )}

        {isExpired && (
          <div className="text-center py-4 text-muted-foreground">
            <p>This poll has expired and is no longer accepting votes.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
