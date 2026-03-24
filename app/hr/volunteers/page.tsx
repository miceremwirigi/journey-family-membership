"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function VolunteersPage() {
  return (
    <DashboardLayout title="Volunteer Management" subtitle="Manage church volunteers">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Volunteer Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>Volunteer management coming soon. This page will allow you to manage volunteers and their schedules.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
