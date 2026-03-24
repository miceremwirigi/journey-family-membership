"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export default function GeneralSettingsPage() {
  return (
    <DashboardLayout title="General Settings" subtitle="Configure system settings">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>General settings coming soon. This page will allow you to configure church information and preferences.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
