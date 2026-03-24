"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DataTable, Column } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MessageSquare, Send, Calendar } from "lucide-react"
import { messages, groups, Message } from "@/lib/mock-data"

export default function MessagingPage() {
  const [messageType, setMessageType] = useState<"sms" | "whatsapp">("sms")
  const [messageText, setMessageText] = useState("")
  const [dateFilter, setDateFilter] = useState("")

  const filteredMessages = messages.filter((msg) => {
    if (!dateFilter) return true
    return msg.date.includes(dateFilter)
  })

  const columns: Column<Message>[] = [
    {
      key: "date",
      header: "Date",
      render: (msg) => (
        <div>
          <p className="font-medium text-foreground">{msg.date}</p>
          <p className="text-sm text-muted-foreground">{msg.time}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (msg) => (
        <Badge
          variant="secondary"
          className={
            msg.type === "sms"
              ? "bg-primary/10 text-primary"
              : "bg-green-100 text-green-700"
          }
        >
          {msg.type}
        </Badge>
      ),
    },
    {
      key: "recipients",
      header: "Recipients",
      render: (msg) => (
        <Badge variant="outline" className="font-normal">
          {msg.recipients}
        </Badge>
      ),
    },
    {
      key: "message",
      header: "Message",
      className: "max-w-md",
      render: (msg) => (
        <p className="truncate text-foreground">{msg.message}</p>
      ),
    },
    {
      key: "delivered",
      header: "Deliver",
      render: (msg) => (
        <span className="font-medium text-primary">{msg.delivered}</span>
      ),
    },
  ]

  return (
    <DashboardLayout
      title="Messages"
      subtitle="Send and manage communications"
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant={messageType === "sms" ? "default" : "outline"}
            onClick={() => setMessageType("sms")}
            className={messageType === "sms" ? "bg-primary" : ""}
          >
            SMS
          </Button>
        </div>
      }
    >
      {/* Compose Message Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <MessageSquare className="h-5 w-5 text-primary" />
            Compose {messageType === "sms" ? "SMS" : "WhatsApp"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <p className="text-sm text-muted-foreground">
              {messageText.length} characters
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select group..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-members">All Members</SelectItem>
                <SelectItem value="all-visitors">All Visitors</SelectItem>
                {groups.map((group) => (
                  <SelectItem key={group} value={group.toLowerCase().replace(/\s+/g, "-")}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Send className="mr-2 h-4 w-4" />
            Send {messageType === "sms" ? "SMS" : "WhatsApp"}
          </Button>
        </CardContent>
      </Card>

      {/* Message History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            Message History
          </CardTitle>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter by date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-40"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredMessages}
            emptyMessage="No messages sent yet"
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
