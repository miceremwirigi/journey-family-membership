"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Upload, Pencil, Trash2, Phone, Link2, QrCode, Copy, CheckCircle2 } from "lucide-react"
import { zones, smallGroups as mockSmallGroups, families as mockFamilies, getFullName, Member } from "@/lib/mock-data"
import { useMembers } from "@/hooks/useMembers"

const zoneColors: Record<string, string> = {
  "North Zone": "bg-amber-100 text-amber-800",
  "South Zone": "bg-red-100 text-red-800",
  "East Zone": "bg-green-100 text-green-800",
  "West Zone": "bg-blue-100 text-blue-800",
  "Central Zone": "bg-purple-100 text-purple-800",
}

export default function MembersPage() {
  const { members, loading, error, isUsingFallback } = useMembers()
  const [zoneFilter, setZoneFilter] = useState<string>("all")
  const [groupFilter, setGroupFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const registrationLink = typeof window !== "undefined" 
    ? `${window.location.origin}/register` 
    : "/register"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(registrationLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredMembers = members.filter((member) => {
    const matchesZone = zoneFilter === "all" || member.zone === zoneFilter
    const matchesGroup = groupFilter === "all" || member.smallGroupId === groupFilter
    const fullName = getFullName(member).toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      fullName.includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesZone && matchesGroup && matchesSearch
  })

  const getMemberSmallGroup = (member: Member) => {
    if (!member.smallGroupId) return null
    return mockSmallGroups.find((sg) => sg.id === member.smallGroupId)
  }

  const getMemberFamily = (member: Member) => {
    if (!member.familyId) return null
    return mockFamilies.find((f) => f.id === member.familyId)
  }

  const columns: Column<Member>[] = [
    {
      key: "name",
      header: "Name",
      render: (member) => {
        const family = getMemberFamily(member)
        return (
          <div>
            <p className="font-medium text-foreground">{getFullName(member)}</p>
            <p className="text-sm text-muted-foreground">{member.email}</p>
            {family && (
              <Badge variant="outline" className="mt-1 text-xs">
                {family.name}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      key: "gender",
      header: "Gender",
      render: (member) => (
        <span className="capitalize text-foreground">{member.gender}</span>
      ),
    },
    {
      key: "zone",
      header: "Zone",
      render: (member) => (
        <Badge
          variant="secondary"
          className={zoneColors[member.zone] || "bg-gray-100 text-gray-800"}
        >
          {member.zone}
        </Badge>
      ),
    },
    {
      key: "smallGroup",
      header: "Small Group",
      render: (member) => {
        const smallGroup = getMemberSmallGroup(member)
        return smallGroup ? (
          <span className="text-foreground">{smallGroup.name}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      },
    },
    {
      key: "mobile",
      header: "Mobile",
      render: (member) => (
        <div className="flex items-center gap-1 text-foreground">
          <Phone className="h-3 w-3 text-muted-foreground" />
          {member.mobile}
        </div>
      ),
    },
    {
      key: "residence",
      header: "Residence",
      render: (member) => <span className="text-foreground">{member.residence}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  if (loading) {
    return (
      <DashboardLayout title="Church Members">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading members...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      title="Church Members"
      showSearch
      searchPlaceholder="Search by name"
      onSearch={setSearchQuery}
      actions={
        <div className="flex items-center gap-2">
          {isUsingFallback && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              Using Sample Data
            </Badge>
          )}
          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Link2 className="mr-2 h-4 w-4" />
                Registration Link
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Member Registration Link</DialogTitle>
                <DialogDescription>
                  Share this link or QR code with new members to register themselves
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="link" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="link">Link</TabsTrigger>
                  <TabsTrigger value="qr">QR Code</TabsTrigger>
                </TabsList>
                <TabsContent value="link" className="space-y-4">
                  <div className="flex gap-2">
                    <Input value={registrationLink} readOnly className="font-mono text-sm" />
                    <Button variant="outline" onClick={handleCopyLink}>
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Members can use this link to submit their information including family members and small group preferences.
                  </p>
                </TabsContent>
                <TabsContent value="qr" className="space-y-4">
                  <div className="flex justify-center p-4 bg-white rounded-lg border">
                    <div className="w-48 h-48 bg-muted flex items-center justify-center rounded">
                      <QrCode className="h-32 w-32 text-foreground" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Scan this QR code to open the registration form
                  </p>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
                <DialogDescription>
                  Enter the details of the new church member below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Names */}
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
                {/* Contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input id="mobile" placeholder="Enter mobile number" />
                  </div>
                </div>
                {/* Gender & Status */}
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
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {/* Zone & Residence */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zone">Zone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select zone" />
                      </SelectTrigger>
                      <SelectContent>
                        {zones.map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residence">Residence</Label>
                    <Input id="residence" placeholder="Enter residence" />
                  </div>
                </div>
                {/* Small Group */}
                <div className="space-y-2">
                  <Label htmlFor="smallGroup">Small Group</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select small group (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {mockSmallGroups.map((sg) => (
                        <SelectItem key={sg.id} value={sg.id}>
                          {sg.name} ({sg.location})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Important Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthday">Birthday</Label>
                    <Input id="birthday" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weddingAnniversary">Wedding Anniversary</Label>
                    <Input id="weddingAnniversary" type="date" />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(false)}>
                  Add Member
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Bulk Upload
          </Button>
        </div>
      }
    >
      {error && !isUsingFallback && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">Error loading members: {error.message}</p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Filter by Fellowship Zone</Label>
          <Select value={zoneFilter} onValueChange={setZoneFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Zones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              {zones.map((zone) => (
                <SelectItem key={zone} value={zone}>
                  {zone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Filter by Small Group</Label>
          <Select value={groupFilter} onValueChange={setGroupFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              {mockSmallGroups.map((sg) => (
                <SelectItem key={sg.id} value={sg.id}>
                  {sg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filteredMembers} emptyMessage="No members found" />
    </DashboardLayout>
  )
}