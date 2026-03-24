"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserX, Baby, UsersRound, Heart } from "lucide-react"
import { dashboardStats, families, smallGroups } from "@/lib/mock-data"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const genderData = [
  { name: "Men", value: dashboardStats.genderRatio.men, color: "#0D9488" },
  { name: "Women", value: dashboardStats.genderRatio.women, color: "#B45309" },
]

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatsCard
          title="Total Members"
          value={dashboardStats.totalMembers}
          icon={Users}
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
        />
        <StatsCard
          title="Men"
          value={dashboardStats.men}
          icon={UserCheck}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Women"
          value={dashboardStats.women}
          icon={UserX}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Children"
          value={dashboardStats.children}
          icon={Baby}
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
        />
        <StatsCard
          title="Families"
          value={families.length}
          icon={Heart}
          iconBgColor="bg-pink-100"
          iconColor="text-pink-600"
        />
        <StatsCard
          title="Small Groups"
          value={smallGroups.length}
          icon={UsersRound}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* Gender Ratio Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Gender Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => (
                      <span className="text-sm text-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Fellowship Zones Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Fellowship Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardStats.fellowshipZones}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {dashboardStats.fellowshipZones.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: "12px" }}
                    formatter={(value) => (
                      <span className="text-xs text-foreground">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Groups Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Groups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardStats.groupMembership}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="members" fill="#0D9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Members</span>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
