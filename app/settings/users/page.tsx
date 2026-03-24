"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCog } from "lucide-react"

export default function UsersSettingsPage() {
  return (
    <DashboardLayout title="User Management" subtitle="Manage system users and permissions">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="h-5 w-5 text-primary" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>User management coming soon. This page will allow you to manage admin users and their permissions.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
