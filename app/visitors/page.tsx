"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCard } from "@/components/stats-card"
import { DataTable, Column } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Users,
  Clock,
  UserX,
  UserCheck,
  Heart,
  Eye,
  Pencil,
  MessageSquare,
  UserPlus,
  CheckSquare,
} from "lucide-react"
import { visitors, visitorStats, Visitor, getFullName } from "@/lib/mock-data"

export default function VisitorsPage() {
  const [interestFilter, setInterestFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const filteredVisitors = visitors.filter((visitor) => {
    const matchesInterest =
      interestFilter === "all" || visitor.interest === interestFilter
    const matchesStatus =
      statusFilter === "all" || visitor.status === statusFilter
    const fullName = getFullName(visitor).toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      fullName.includes(searchQuery.toLowerCase())
    return matchesInterest && matchesStatus && matchesSearch
  })

  const columns: Column<Visitor>[] = [
    {
      key: "name",
      header: "Name",
      render: (visitor) => (
        <div>
          <p className="font-medium text-foreground">{getFullName(visitor)}</p>
          <p className="text-sm text-muted-foreground">{visitor.gender}</p>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (visitor) => (
        <div>
          <p className="text-foreground">{visitor.contact}</p>
          <p className="text-sm text-muted-foreground">{visitor.email}</p>
        </div>
      ),
    },
    {
      key: "visits",
      header: "Visits",
      render: (visitor) => (
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          {visitor.visits} visits
        </Badge>
      ),
    },
    {
      key: "firstVisit",
      header: "First Visit",
      render: (visitor) => (
        <div>
          <p className="text-foreground">{visitor.firstVisit}</p>
          <p className="text-sm text-muted-foreground">
            Last: {visitor.lastVisit}
          </p>
        </div>
      ),
    },
    {
      key: "interest",
      header: "Interest",
      render: (visitor) => (
        <span className="text-foreground">{visitor.interest}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (visitor) => (
        <Badge
          variant="secondary"
          className={
            visitor.status === "Not Contacted"
              ? "bg-red-100 text-red-800"
              : visitor.status === "Contacted"
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
          }
        >
          {visitor.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:text-amber-600">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600 hover:text-green-600">
            <UserPlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <CheckSquare className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <DashboardLayout title="Visitor Management">
      {/* Stats Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatsCard
          title="Total Visitors"
          value={visitorStats.totalVisitors}
          icon={Users}
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
        />
        <StatsCard
          title="Recent (30 days)"
          value={visitorStats.recent30Days}
          icon={Clock}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Uncontacted"
          value={visitorStats.uncontacted}
          icon={UserX}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
        <StatsCard
          title="Want Membership"
          value={visitorStats.wantMembership}
          icon={UserCheck}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="High Interest"
          value={visitorStats.highInterest}
          icon={Heart}
          iconBgColor="bg-pink-100"
          iconColor="text-pink-600"
        />
      </div>

      {/* Add Button */}
      <div className="mb-6 flex justify-end">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Add New Visitor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Visitor</DialogTitle>
              <DialogDescription>
                Record a new visitor to the church.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="First name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input id="middleName" placeholder="Middle name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input id="contact" placeholder="Enter contact number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest">Interest Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="N/A">N/A</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>
                Add Visitor
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Interest Level</Label>
          <Select value={interestFilter} onValueChange={setInterestFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Contact Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Visitors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Visitors</SelectItem>
              <SelectItem value="Not Contacted">Not Contacted</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Follow Up">Follow Up</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Search</Label>
          <Input
            type="search"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredVisitors}
        emptyMessage="No visitors found"
      />
    </DashboardLayout>
  )
}
