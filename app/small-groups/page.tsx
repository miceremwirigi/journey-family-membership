"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Users,
  MapPin,
  Calendar,
  Clock,
  UserPlus,
  Pencil,
  Trash2,
  UsersRound,
} from "lucide-react"
import { smallGroups, members, zones, getFullName, SmallGroup } from "@/lib/mock-data"

const zoneColors: Record<string, string> = {
  "North Zone": "bg-amber-100 text-amber-800",
  "South Zone": "bg-red-100 text-red-800",
  "East Zone": "bg-green-100 text-green-800",
  "West Zone": "bg-blue-100 text-blue-800",
  "Central Zone": "bg-purple-100 text-purple-800",
}

export default function SmallGroupsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [zoneFilter, setZoneFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<SmallGroup | null>(null)

  const filteredGroups = smallGroups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          group.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesZone = zoneFilter === "all" || group.zone === zoneFilter
    return matchesSearch && matchesZone
  })

  const getGroupMembers = (group: SmallGroup) => {
    return group.memberIds.map((id) => members.find((m) => m.id === id)).filter(Boolean)
  }

  const totalMembers = smallGroups.reduce((acc, g) => acc + g.memberIds.length, 0)

  return (
    <DashboardLayout
      title="Small Groups"
      showSearch
      searchPlaceholder="Search groups..."
      onSearch={setSearchQuery}
      actions={
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Small Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Small Group</DialogTitle>
              <DialogDescription>
                Set up a new community or cell group for your zone
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Group Name</Label>
                <Input placeholder="e.g., Garden Estate CG" />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label>Zone</Label>
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
                  <Label>Location</Label>
                  <Input placeholder="e.g., Garden Estate" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea placeholder="Brief description of the group..." />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label>Meeting Day</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Meeting Time</Label>
                  <Input type="time" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Group Leader (Optional)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leader" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {getFullName(member)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsCreateDialogOpen(false)}>
                Create Group
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <UsersRound className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{smallGroups.length}</p>
                <p className="text-sm text-muted-foreground">Total Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalMembers}</p>
                <p className="text-sm text-muted-foreground">Members in Groups</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{zones.length}</p>
                <p className="text-sm text-muted-foreground">Active Zones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <div className="space-y-2 max-w-xs">
          <Label className="text-sm text-muted-foreground">Filter by Zone</Label>
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
      </div>

      {/* Groups Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredGroups.map((group) => {
          const groupMembers = getGroupMembers(group)
          const leader = group.leaderId ? members.find((m) => m.id === group.leaderId) : null

          return (
            <Card key={group.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <Badge className={`mt-1 ${zoneColors[group.zone] || "bg-gray-100 text-gray-800"}`}>
                      {group.zone}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{group.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{group.location}</span>
                  </div>
                  {group.meetingDay && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{group.meetingDay}</span>
                      {group.meetingTime && (
                        <>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{group.meetingTime}</span>
                        </>
                      )}
                    </div>
                  )}
                  {leader && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Leader: {getFullName(leader)}</span>
                    </div>
                  )}
                </div>

                {/* Members Preview */}
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Members ({groupMembers.length})
                    </span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <UserPlus className="mr-1 h-3 w-3" />
                      Add
                    </Button>
                  </div>
                  <div className="flex -space-x-2">
                    {groupMembers.slice(0, 5).map((member) => (
                      member && (
                        <div
                          key={member.id}
                          className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center"
                          title={getFullName(member)}
                        >
                          <span className="text-xs font-medium text-primary">
                            {member.firstName[0]}{member.lastName[0]}
                          </span>
                        </div>
                      )
                    ))}
                    {groupMembers.length > 5 && (
                      <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <span className="text-xs font-medium text-muted-foreground">
                          +{groupMembers.length - 5}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredGroups.length === 0 && (
          <Card className="sm:col-span-2 lg:col-span-3">
            <CardContent className="p-8 text-center">
              <UsersRound className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No small groups found</h3>
              <p className="text-muted-foreground mb-4">
                Create a small group to help members connect in their communities
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Small Group
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
