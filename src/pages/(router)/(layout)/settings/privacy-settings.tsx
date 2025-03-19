"use client"

import { useState } from "react"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Button } from "@/shared/ui/button"

const PrivacySettings = () => {
  const [privateAccount, setPrivateAccount] = useState(false)
  const [activityStatus, setActivityStatus] = useState(true)
  const [storySharing, setStorySharing] = useState("followers")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Privacy settings updated")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]">
      <div className="flex items-center justify-between">
        <Label htmlFor="private-account">Private Account</Label>
        <Switch id="private-account" checked={privateAccount} onCheckedChange={setPrivateAccount} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="activity-status">Activity Status</Label>
        <Switch id="activity-status" checked={activityStatus} onCheckedChange={setActivityStatus} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="story-sharing">Story Sharing</Label>
        <Select value={storySharing} onValueChange={setStorySharing}>
          <SelectTrigger id="story-sharing">
            <SelectValue placeholder="Select who can share your story" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="everyone">Everyone</SelectItem>
            <SelectItem value="followers">Followers</SelectItem>
            <SelectItem value="off">Off</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  )
}

export default PrivacySettings

