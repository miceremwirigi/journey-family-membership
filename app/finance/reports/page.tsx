"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function FinanceReportsPage() {
  return (
    <DashboardLayout title="Financial Reports" subtitle="View financial summaries and reports">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Financial Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
            <p>Financial reports coming soon. This page will display income/expense summaries and charts.</p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
