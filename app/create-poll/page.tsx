"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { CreatePollForm } from "@/components/polls/create-poll-form"
import { Button } from "@/components/ui/button"
import { CreatePollData } from "@/types"
import { ArrowLeft, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CreatePollPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreatePoll = async (data: CreatePollData) => {
    setIsLoading(true)

    try {
      // TODO: Implement actual poll creation API call
      console.log("Creating poll:", data)

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // TODO: Handle successful poll creation
      // - Send data to backend API
      // - Get poll ID from response
      // - Redirect to the new poll page

      // Mock successful creation - redirect to polls list for now
      router.push("/polls")

    } catch (error) {
      console.error("Failed to create poll:", error)
      // TODO: Handle poll creation error
      // - Show error message to user
      // - Keep form data intact for retry
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/polls" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Polls
          </Link>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Create a New Poll</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create engaging polls to gather opinions and make decisions with your community.
            Your poll will be visible to all users once published.
          </p>
        </div>

        {/* Tips Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg text-blue-900">Tips for Creating Great Polls</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-blue-800">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Make your question clear and specific</li>
              <li>Provide balanced and comprehensive options</li>
              <li>Keep options concise and easy to understand</li>
              <li>Consider if multiple votes make sense for your question</li>
              <li>Set an appropriate expiry date if needed</li>
            </ul>
          </CardContent>
        </Card>

        {/* Poll Creation Form */}
        <CreatePollForm onSubmit={handleCreatePoll} isLoading={isLoading} />

        {/* Footer Actions */}
        <div className="text-center space-y-4 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Need inspiration? Check out other polls to see what the community is discussing.
          </p>
          <div className="flex justify-center space-x-3">
            <Link href="/polls">
              <Button variant="outline">
                Browse Existing Polls
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">
                View My Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
