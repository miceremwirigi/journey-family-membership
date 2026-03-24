"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Search, X, UserPlus, Users, CalendarHeart, CheckCircle2 } from "lucide-react"
import { zones, smallGroups, familyRoles, members, getFullName } from "@/lib/mock-data"

interface FamilyMember {
  id: string
  name: string
  role: string
  isExisting: boolean
  existingMemberId?: string
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    maritalStatus: "",
    zone: "",
    residence: "",
    smallGroupId: "",
    birthday: "",
    weddingAnniversary: "",
    specialCelebration: "",
    specialCelebrationDescription: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const searchResults = members.filter((member) => {
    const fullName = getFullName(member).toLowerCase()
    return fullName.includes(searchQuery.toLowerCase()) || 
           member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
           member.mobile.includes(searchQuery)
  })

  const addExistingMember = (memberId: string, name: string) => {
    if (selectedRole) {
      setFamilyMembers((prev) => [
        ...prev,
        {
          id: `existing-${memberId}`,
          name,
          role: selectedRole,
          isExisting: true,
          existingMemberId: memberId,
        },
      ])
      setIsSearchDialogOpen(false)
      setSearchQuery("")
      setSelectedRole("")
    }
  }

  const addNewFamilyMember = () => {
    if (selectedRole) {
      const tempName = `New Family Member (${selectedRole})`
      setFamilyMembers((prev) => [
        ...prev,
        {
          id: `new-${Date.now()}`,
          name: tempName,
          role: selectedRole,
          isExisting: false,
        },
      ])
      setSelectedRole("")
    }
  }

  const removeFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const filteredSmallGroups = formData.zone
    ? smallGroups.filter((sg) => sg.zone === formData.zone)
    : smallGroups

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for registering with JourneyFamily Church. We are excited to have you join our community!
            </p>
            <p className="text-sm text-muted-foreground">
              You will receive a confirmation message shortly.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <header className="bg-background border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-center gap-3">
          <Image
            src="/logo.jpg"
            alt="JourneyFamily Logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground">JourneyFamily Church</h1>
            <p className="text-sm text-muted-foreground">Member Registration</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <div className={`w-16 h-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
            <div className={`w-16 h-1 rounded ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-primary" />
                <CardTitle>Personal Information</CardTitle>
              </div>
              <CardDescription>
                Please provide your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Names */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    placeholder="Enter middle name"
                    value={formData.middleName}
                    onChange={(e) => handleInputChange("middleName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                  />
                </div>
              </div>

              {/* Contact */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    placeholder="e.g., 254700000000"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                  />
                </div>
              </div>

              {/* Gender & Marital Status */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select value={formData.gender} onValueChange={(v) => handleInputChange("gender", v)}>
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
                  <Label>Marital Status *</Label>
                  <Select value={formData.maritalStatus} onValueChange={(v) => handleInputChange("maritalStatus", v)}>
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Fellowship Zone *</Label>
                  <Select value={formData.zone} onValueChange={(v) => handleInputChange("zone", v)}>
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
                  <Label htmlFor="residence">Residence *</Label>
                  <Input
                    id="residence"
                    placeholder="Enter your area/estate"
                    value={formData.residence}
                    onChange={(e) => handleInputChange("residence", e.target.value)}
                  />
                </div>
              </div>

              {/* Small Group */}
              <div className="space-y-2">
                <Label>Small Group / Cell Group</Label>
                <Select value={formData.smallGroupId} onValueChange={(v) => handleInputChange("smallGroupId", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or leave empty if none" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None / Not yet joined</SelectItem>
                    {filteredSmallGroups.map((sg) => (
                      <SelectItem key={sg.id} value={sg.id}>
                        {sg.name} ({sg.location})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Small groups meet weekly for fellowship and Bible study in your area
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} className="bg-primary hover:bg-primary/90">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Celebrations & Anniversaries */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarHeart className="h-5 w-5 text-primary" />
                <CardTitle>Celebrations & Anniversaries</CardTitle>
              </div>
              <CardDescription>
                Help us celebrate your special days with you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="birthday">Birthday</Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => handleInputChange("birthday", e.target.value)}
                  />
                </div>
                {(formData.maritalStatus === "married" || formData.maritalStatus === "widowed") && (
                  <div className="space-y-2">
                    <Label htmlFor="weddingAnniversary">Wedding Anniversary</Label>
                    <Input
                      id="weddingAnniversary"
                      type="date"
                      value={formData.weddingAnniversary}
                      onChange={(e) => handleInputChange("weddingAnniversary", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialCelebration">Special Celebration Date</Label>
                  <Input
                    id="specialCelebration"
                    type="date"
                    value={formData.specialCelebration}
                    onChange={(e) => handleInputChange("specialCelebration", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    A special day you would like the church to celebrate with you
                  </p>
                </div>
                {formData.specialCelebration && (
                  <div className="space-y-2">
                    <Label htmlFor="specialCelebrationDescription">What are we celebrating?</Label>
                    <Textarea
                      id="specialCelebrationDescription"
                      placeholder="e.g., Ministry Anniversary, Graduation, Recovery milestone..."
                      value={formData.specialCelebrationDescription}
                      onChange={(e) => handleInputChange("specialCelebrationDescription", e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="bg-primary hover:bg-primary/90">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Family Members */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <CardTitle>Family Members</CardTitle>
              </div>
              <CardDescription>
                Add family members who attend JourneyFamily Church (optional)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Family Member */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <h4 className="font-medium mb-3 text-foreground">Add Family Member</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Relationship</Label>
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
                  <div className="flex items-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsSearchDialogOpen(true)}
                      disabled={!selectedRole}
                      className="flex-1"
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Search Existing
                    </Button>
                    <Button
                      variant="outline"
                      onClick={addNewFamilyMember}
                      disabled={!selectedRole}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      New
                    </Button>
                  </div>
                </div>
              </div>

              {/* Family Members List */}
              {familyMembers.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Your Family Members</h4>
                  {familyMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-background"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{member.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{member.role}</Badge>
                            {member.isExisting && (
                              <span className="text-xs text-muted-foreground">
                                (Existing member)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFamilyMember(member.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
                  Complete Registration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Search Dialog */}
      <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Search Existing Members</DialogTitle>
            <DialogDescription>
              Search for your {selectedRole?.toLowerCase()} if they are already registered
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {searchQuery && searchResults.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No members found. You can add them as a new family member.
                </p>
              )}
              {searchResults.slice(0, 10).map((member) => (
                <button
                  key={member.id}
                  onClick={() => addExistingMember(member.id, getFullName(member))}
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
                  <Badge variant="outline">{member.zone}</Badge>
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSearchDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
