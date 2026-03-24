"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cog } from "lucide-react"

export default function EventConfigurationPage() {
  return (
    <DashboardLayout title="Event Configuration" subtitle="Configure event categories and settings">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cog className="h-5 w-5 text-primary" />
            Event Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>Event configuration coming soon. This page will allow you to set up event categories and templates.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
