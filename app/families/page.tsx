"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Search, Users, UserPlus, ChevronRight, Pencil, Trash2 } from "lucide-react"
import { families, members, familyRoles, getFullName, Family } from "@/lib/mock-data"

export default function FamiliesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [selectedFamily, setSelectedFamily] = useState<Family | null>(null)
  const [memberSearchQuery, setMemberSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("")

  const filteredFamilies = families.filter((family) =>
    family.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFamilyMembers = (family: Family) => {
    return family.members.map((fm) => {
      const member = members.find((m) => m.id === fm.memberId)
      return member ? { ...member, role: fm.role } : null
    }).filter(Boolean)
  }

  const searchResults = members.filter((member) => {
    const fullName = getFullName(member).toLowerCase()
    return fullName.includes(memberSearchQuery.toLowerCase()) ||
           member.email.toLowerCase().includes(memberSearchQuery.toLowerCase())
  })

  return (
    <DashboardLayout
      title="Families"
      showSearch
      searchPlaceholder="Search families..."
      onSearch={setSearchQuery}
      actions={
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Family
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Family</DialogTitle>
              <DialogDescription>
                Start by selecting the family head
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Family Name</Label>
                <Input placeholder="e.g., The Omondi Family" />
              </div>
              <div className="space-y-2">
                <Label>Family Head</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select family head" />
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
                Create Family
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
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{families.length}</p>
                <p className="text-sm text-muted-foreground">Total Families</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {families.reduce((acc, f) => acc + f.members.length, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Members in Families</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {members.filter((m) => !m.familyId).length}
                </p>
                <p className="text-sm text-muted-foreground">Unassigned Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Family List */}
      <div className="grid gap-4">
        {filteredFamilies.map((family) => {
          const familyMembers = getFamilyMembers(family)
          const head = members.find((m) => m.id === family.headId)

          return (
            <Card key={family.id} className="overflow-hidden">
              <CardHeader className="bg-muted/30 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{family.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Head: {head ? getFullName(head) : "Not assigned"} | {familyMembers.length} member(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedFamily(family)
                        setIsAddMemberDialogOpen(true)
                      }}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {familyMembers.map((member) => (
                    member && (
                      <div
                        key={member.id}
                        className="flex items-center gap-3 p-3 rounded-lg border bg-background"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {member.firstName[0]}{member.lastName[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {getFullName(member)}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {member.role}
                          </Badge>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}

        {filteredFamilies.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No families found</h3>
              <p className="text-muted-foreground mb-4">
                Create a family to group church members together
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Create Family
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Member to Family Dialog */}
      <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Member to {selectedFamily?.name}</DialogTitle>
            <DialogDescription>
              Search for an existing member or add a new one
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Relationship to Family Head</Label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {familyRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Search Member</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={memberSearchQuery}
                  onChange={(e) => setMemberSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="max-h-[200px] overflow-y-auto space-y-2">
              {memberSearchQuery && searchResults.slice(0, 5).map((member) => (
                <button
                  key={member.id}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border hover:bg-muted transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {member.firstName[0]}{member.lastName[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{getFullName(member)}</p>
                    <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddMemberDialogOpen(false)}>
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
