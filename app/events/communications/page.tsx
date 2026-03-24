"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function EventCommunicationsPage() {
  return (
    <DashboardLayout title="Event Communications" subtitle="Manage event-related messages and notifications">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Event Communications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>Event communications coming soon. This page will allow you to send event invitations and reminders.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
