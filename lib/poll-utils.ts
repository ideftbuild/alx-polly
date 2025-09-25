import { Poll } from "@/types"

/**
 * Helper function to determine if a poll is active
 * A poll is active if it has no expiry date or if the expiry date is in the future
 */
export const isPollActive = (poll: Poll): boolean => {
  if (!poll.expiresAt) return true // No expiry date means always active
  return new Date(poll.expiresAt) > new Date()
}

/**
 * Helper function to calculate total votes for a poll
 * Sums up all votes from all options
 */
export const getPollTotalVotes = (poll: Poll): number => {
  return poll.options.reduce((sum, option) => sum + option.votes, 0)
}

/**
 * Helper function to get the percentage of votes for a specific option
 */
export const getVotePercentage = (optionVotes: number, totalVotes: number): number => {
  if (totalVotes === 0) return 0
  return Math.round((optionVotes / totalVotes) * 100)
}

/**
 * Helper function to get the top option (most voted) from a poll
 */
export const getTopOption = (poll: Poll) => {
  if (poll.options.length === 0) return null
  return poll.options.reduce((prev, current) =>
    prev.votes > current.votes ? prev : current
  )
}
