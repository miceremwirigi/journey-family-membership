"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

export default function StaffPage() {
  return (
    <DashboardLayout title="Staff Management" subtitle="Manage church staff members">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Staff Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>Staff management coming soon. This page will allow you to manage paid staff members.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
