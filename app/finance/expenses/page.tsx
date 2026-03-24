"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Receipt } from "lucide-react"

export default function ExpensesPage() {
  return (
    <DashboardLayout title="Expenses" subtitle="Track and manage church expenses">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            Expenses Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>Expenses management coming soon. This page will allow you to record and categorize expenses.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
