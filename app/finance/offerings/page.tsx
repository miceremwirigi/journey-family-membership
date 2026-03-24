"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign } from "lucide-react"

export default function OfferingsPage() {
  return (
    <DashboardLayout title="Offerings" subtitle="Track and manage church offerings">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Offerings Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>Offerings management coming soon. This page will allow you to track tithes and offerings.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
