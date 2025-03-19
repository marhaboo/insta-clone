"use client"

import { Button } from "@/shared/ui/button"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { useState } from "react"

const NotificationSettings = () => {
  const [likes, setLikes] = useState(true)
  const [comments, setComments] = useState(true)
  const [followers, setFollowers] = useState(true)
  const [directMessages, setDirectMessages] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Notification settings updated")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-[120px] sm:my-[100px] md:my-[80px] lg:my-[60px] xl:my-[40px] 2xl:my-[50px]">
      <div className="flex items-center justify-between">
        <Label htmlFor="likes">Likes</Label>
        <Switch id="likes" checked={likes} onCheckedChange={setLikes} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="comments">Comments</Label>
        <Switch id="comments" checked={comments} onCheckedChange={setComments} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="followers">New Followers</Label>
        <Switch id="followers" checked={followers} onCheckedChange={setFollowers} />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="direct-messages">Direct Messages</Label>
        <Switch id="direct-messages" checked={directMessages} onCheckedChange={setDirectMessages} />
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  )
}

export default NotificationSettings

