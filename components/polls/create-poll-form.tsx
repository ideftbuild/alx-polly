"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CreatePollData } from "@/types"
import { X, Plus } from "lucide-react"

interface CreatePollFormProps {
  onSubmit: (data: CreatePollData) => Promise<void>
  isLoading?: boolean
}

export function CreatePollForm({ onSubmit, isLoading = false }: CreatePollFormProps) {
  const [formData, setFormData] = useState<CreatePollData>({
    title: "",
    description: "",
    options: ["", ""],
    allowMultipleVotes: false,
    expiresAt: undefined
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Poll title is required"
    }

    const validOptions = formData.options.filter(option => option.trim())
    if (validOptions.length < 2) {
      newErrors.options = "At least 2 options are required"
    }

    if (formData.expiresAt) {
      const expiryDate = new Date(formData.expiresAt)
      if (expiryDate <= new Date()) {
        newErrors.expiresAt = "Expiry date must be in the future"
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const pollData: CreatePollData = {
        ...formData,
        options: validOptions,
        expiresAt: formData.expiresAt ? new Date(formData.expiresAt) : undefined
      }
      await onSubmit(pollData)
    } catch (error) {
      console.error("Failed to create poll:", error)
    }
  }

  const handleInputChange = (field: keyof CreatePollData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    handleInputChange("options", newOptions)
  }

  const addOption = () => {
    if (formData.options.length < 10) {
      handleInputChange("options", [...formData.options, ""])
    }
  }

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index)
      handleInputChange("options", newOptions)
    }
  }

  const formatDateForInput = (date?: Date) => {
    if (!date) return ""
    const d = new Date(date)
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
    return d.toISOString().slice(0, 16)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Poll</CardTitle>
        <CardDescription>
          Create a new poll for others to vote on. Add your question and possible answers.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Poll Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Poll Question *</Label>
            <Input
              id="title"
              placeholder="What's your poll question?"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              disabled={isLoading}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Poll Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              placeholder="Add more context to your poll..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Poll Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Poll Options *</Label>
              <Badge variant="outline" className="text-xs">
                {formData.options.filter(opt => opt.trim()).length} of {formData.options.length}
              </Badge>
            </div>

            <div className="space-y-2">
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  {formData.options.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeOption(index)}
                      disabled={isLoading}
                      className="shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {formData.options.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                disabled={isLoading}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Another Option
              </Button>
            )}

            {errors.options && (
              <p className="text-sm text-red-500">{errors.options}</p>
            )}
          </div>

          {/* Poll Settings */}
          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-sm">Poll Settings</h4>

            {/* Multiple Votes */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowMultipleVotes"
                checked={formData.allowMultipleVotes}
                onCheckedChange={(checked) =>
                  handleInputChange("allowMultipleVotes", checked)
                }
                disabled={isLoading}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="allowMultipleVotes"
                  className="text-sm font-medium cursor-pointer"
                >
                  Allow multiple votes
                </Label>
                <p className="text-xs text-muted-foreground">
                  Let users select multiple options
                </p>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <Label htmlFor="expiresAt">Poll Expiry (Optional)</Label>
              <Input
                id="expiresAt"
                type="datetime-local"
                value={formData.expiresAt ? formatDateForInput(formData.expiresAt) : ""}
                onChange={(e) =>
                  handleInputChange("expiresAt", e.target.value ? new Date(e.target.value) : undefined)
                }
                disabled={isLoading}
                min={formatDateForInput(new Date())}
                className={errors.expiresAt ? "border-red-500" : ""}
              />
              {errors.expiresAt && (
                <p className="text-sm text-red-500">{errors.expiresAt}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Leave empty for no expiry date
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-3 p-4 border rounded-lg bg-background">
            <h4 className="font-medium text-sm">Preview</h4>
            <div className="space-y-2">
              <h3 className="font-semibold">
                {formData.title || "Your poll question will appear here"}
              </h3>
              {formData.description && (
                <p className="text-muted-foreground text-sm">{formData.description}</p>
              )}
              <div className="space-y-1">
                {formData.options.map((option, index) =>
                  option.trim() && (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-4 h-4 rounded-full border border-muted-foreground"></div>
                      <span>{option}</span>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.allowMultipleVotes && (
                  <Badge variant="outline" className="text-xs">
                    Multiple votes allowed
                  </Badge>
                )}
                {formData.expiresAt && (
                  <Badge variant="outline" className="text-xs">
                    Expires {new Date(formData.expiresAt).toLocaleDateString()}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title.trim() || formData.options.filter(opt => opt.trim()).length < 2}
            >
              {isLoading ? "Creating Poll..." : "Create Poll"}
            </Button>
          </div>
        </CardContent>
      </form>
    </Card>
  )
}
