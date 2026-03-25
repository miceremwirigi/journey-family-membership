// Mock data for JourneyFamily Church Management Platform

export interface Member {
  id: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  gender: "male" | "female"
  zone: string
  maritalStatus: string
  mobile: string
  residence: string
  birthday?: string
  weddingAnniversary?: string
  specialCelebration?: string
  specialCelebrationDescription?: string
  familyId?: string
  familyRole?: string
  smallGroupId?: string
  joinDate?: string
}

export interface Family {
  id: string
  name: string
  headId: string
  members: {
    memberId: string
    role: string
  }[]
}

export interface SmallGroup {
  id: string
  name: string
  zone: string
  location: string
  leaderId?: string
  description?: string
  meetingDay?: string
  meetingTime?: string
  memberIds: string[]
}

export interface Visitor {
  id: string
  firstName: string
  middleName: string
  lastName: string
  gender: "male" | "female"
  contact: string
  email: string
  visits: number
  firstVisit: string
  lastVisit: string
  interest: "N/A" | "Low" | "Medium" | "High"
  status: "Not Contacted" | "Contacted" | "Follow Up"
}

export interface Message {
  id: string
  date: string
  time: string
  type: "sms" | "whatsapp"
  recipients: string
  message: string
  delivered: number
}

export interface Event {
  id: string
  title: string
  category: string
  dateTime: string
  location: string
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled"
}

export const zones = [
  "North Zone",
  "South Zone",
  "East Zone",
  "West Zone",
  "Central Zone",
]

export const groups = [
  "Youth Fellowship",
  "Men's Ministry",
  "Women's Ministry",
  "Worship Team",
  "Sunday School",
  "Outreach Team",
]

export const familyRoles = [
  "Husband",
  "Wife",
  "Son",
  "Daughter",
  "Grandchild",
  "Niece",
  "Nephew",
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Uncle",
  "Aunt",
  "Cousin",
  "Guardian",
  "Other",
]

export const smallGroups: SmallGroup[] = [
  {
    id: "sg1",
    name: "Garden Estate CG",
    zone: "North Zone",
    location: "Garden Estate",
    description: "Community group for Garden Estate residents",
    meetingDay: "Wednesday",
    meetingTime: "6:30 PM",
    memberIds: ["1", "5", "10"],
  },
  {
    id: "sg2",
    name: "Kilimani Home Fellowship",
    zone: "Central Zone",
    location: "Kilimani",
    description: "Fellowship group in Kilimani area",
    meetingDay: "Thursday",
    meetingTime: "7:00 PM",
    memberIds: ["6", "11"],
  },
  {
    id: "sg3",
    name: "Westlands Bible Study",
    zone: "West Zone",
    location: "Westlands",
    description: "Weekly Bible study and prayer group",
    meetingDay: "Friday",
    meetingTime: "6:00 PM",
    memberIds: ["2", "7", "12"],
  },
  {
    id: "sg4",
    name: "South B Young Adults",
    zone: "South Zone",
    location: "South B",
    description: "Young adults fellowship and mentorship",
    meetingDay: "Saturday",
    meetingTime: "4:00 PM",
    memberIds: ["4", "9"],
  },
  {
    id: "sg5",
    name: "Eastleigh Family CG",
    zone: "East Zone",
    location: "Eastleigh",
    description: "Family-focused community group",
    meetingDay: "Sunday",
    meetingTime: "3:00 PM",
    memberIds: ["3", "8"],
  },
]

export const families: Family[] = [
  {
    id: "fam1",
    name: "The Omondi Family",
    headId: "1",
    members: [
      { memberId: "1", role: "Husband" },
    ],
  },
  {
    id: "fam2",
    name: "The Thuo Family",
    headId: "3",
    members: [
      { memberId: "3", role: "Husband" },
    ],
  },
]

export const members: Member[] = [
  {
    id: "1",
    firstName: "Michael",
    middleName: "Otieno",
    lastName: "Omondi",
    email: "michael-omondi12@example.com",
    gender: "male",
    zone: "East Zone",
    maritalStatus: "married",
    mobile: "254770000012",
    residence: "Nairobi",
    birthday: "1985-03-15",
    weddingAnniversary: "2010-06-20",
    familyId: "fam1",
    familyRole: "Husband",
    smallGroupId: "sg5",
    joinDate: "2020-01-15",
  },
  {
    id: "2",
    firstName: "Nancy",
    middleName: "Wanjiku",
    lastName: "Wairimu",
    email: "nancy-wairimu23@example.com",
    gender: "female",
    zone: "West Zone",
    maritalStatus: "single",
    mobile: "254770000023",
    residence: "Nairobi",
    birthday: "1992-08-22",
    smallGroupId: "sg3",
    joinDate: "2021-03-10",
  },
  {
    id: "3",
    firstName: "Martin",
    middleName: "Kamau",
    lastName: "Thuo",
    email: "martin-thuo22@example.com",
    gender: "male",
    zone: "East Zone",
    maritalStatus: "married",
    mobile: "254770000022",
    residence: "Eldoret",
    birthday: "1980-11-30",
    weddingAnniversary: "2005-12-15",
    familyId: "fam2",
    familyRole: "Husband",
    smallGroupId: "sg5",
    joinDate: "2019-06-20",
  },
  {
    id: "4",
    firstName: "Joyce",
    middleName: "Wambui",
    lastName: "Nyambura",
    email: "joyce-nyambura21@example.com",
    gender: "female",
    zone: "South Zone",
    maritalStatus: "divorced",
    mobile: "254770000021",
    residence: "Nairobi",
    birthday: "1988-04-12",
    specialCelebration: "2026-07-01",
    specialCelebrationDescription: "Ministry Anniversary",
    smallGroupId: "sg4",
    joinDate: "2022-01-05",
  },
  {
    id: "5",
    firstName: "Samuel",
    middleName: "Mwangi",
    lastName: "Njoroge",
    email: "samuel-njoroge20@example.com",
    gender: "male",
    zone: "North Zone",
    maritalStatus: "widowed",
    mobile: "254770000020",
    residence: "Eldoret",
    birthday: "1975-09-08",
    smallGroupId: "sg1",
    joinDate: "2018-02-14",
  },
  {
    id: "6",
    firstName: "Margaret",
    middleName: "Nyokabi",
    lastName: "Wanjiru",
    email: "margaret-wanjiru19@example.com",
    gender: "female",
    zone: "Central Zone",
    maritalStatus: "widowed",
    mobile: "254770000019",
    residence: "Eldoret",
    birthday: "1970-02-28",
    smallGroupId: "sg2",
    joinDate: "2017-08-30",
  },
  {
    id: "7",
    firstName: "Charles",
    middleName: "Maina",
    lastName: "Kariuki",
    email: "charles-kariuki18@example.com",
    gender: "male",
    zone: "West Zone",
    maritalStatus: "widowed",
    mobile: "254770000018",
    residence: "Mombasa",
    birthday: "1965-07-14",
    smallGroupId: "sg3",
    joinDate: "2016-05-22",
  },
  {
    id: "8",
    firstName: "Catherine",
    middleName: "Njeri",
    lastName: "Muthoni",
    email: "catherine-muthoni17@example.com",
    gender: "female",
    zone: "East Zone",
    maritalStatus: "single",
    mobile: "254770000017",
    residence: "Nakuru",
    birthday: "1995-12-03",
    smallGroupId: "sg5",
    joinDate: "2023-04-18",
  },
  {
    id: "9",
    firstName: "Robert",
    middleName: "Ochieng",
    lastName: "Mutua",
    email: "robert-mutua16@example.com",
    gender: "male",
    zone: "South Zone",
    maritalStatus: "married",
    mobile: "254770000016",
    residence: "Nairobi",
    birthday: "1983-05-25",
    weddingAnniversary: "2012-04-10",
    smallGroupId: "sg4",
    joinDate: "2020-09-01",
  },
  {
    id: "10",
    firstName: "Jane",
    middleName: "Akinyi",
    lastName: "Atieno",
    email: "jane-atieno15@example.com",
    gender: "female",
    zone: "North Zone",
    maritalStatus: "widowed",
    mobile: "254770000015",
    residence: "Nairobi",
    birthday: "1978-10-17",
    smallGroupId: "sg1",
    joinDate: "2019-11-11",
  },
  {
    id: "11",
    firstName: "Stephen",
    middleName: "Owino",
    lastName: "Odhiambo",
    email: "stephen-odhiambo14@example.com",
    gender: "male",
    zone: "Central Zone",
    maritalStatus: "single",
    mobile: "254770000014",
    residence: "Nakuru",
    birthday: "1990-06-09",
    smallGroupId: "sg2",
    joinDate: "2021-07-25",
  },
  {
    id: "12",
    firstName: "Ruth",
    middleName: "Adhiambo",
    lastName: "Achieng",
    email: "ruth-achieng13@example.com",
    gender: "female",
    zone: "West Zone",
    maritalStatus: "widowed",
    mobile: "254770000013",
    residence: "Mombasa",
    birthday: "1968-01-21",
    smallGroupId: "sg3",
    joinDate: "2015-03-08",
  },
]

export const visitors: Visitor[] = [
  {
    id: "1",
    firstName: "Philip",
    middleName: "Kiprono",
    lastName: "Gachoki",
    gender: "male",
    contact: "254770000024",
    email: "philip-gachoki24@example.com",
    visits: 2,
    firstVisit: "Feb 14, 2026",
    lastVisit: "Feb 13, 2026",
    interest: "N/A",
    status: "Not Contacted",
  },
  {
    id: "2",
    firstName: "Agnes",
    middleName: "Wangari",
    lastName: "Njeri",
    gender: "female",
    contact: "254770000027",
    email: "agnes-njeri27@example.com",
    visits: 4,
    firstVisit: "Feb 6, 2026",
    lastVisit: "Feb 12, 2026",
    interest: "N/A",
    status: "Not Contacted",
  },
  {
    id: "3",
    firstName: "Simon",
    middleName: "Gitau",
    lastName: "Maina",
    gender: "male",
    contact: "254770000026",
    email: "simon-maina26@example.com",
    visits: 3,
    firstVisit: "Jan 18, 2026",
    lastVisit: "Feb 8, 2026",
    interest: "N/A",
    status: "Not Contacted",
  },
  {
    id: "4",
    firstName: "Esther",
    middleName: "Nyambura",
    lastName: "Wambui",
    gender: "female",
    contact: "254770000025",
    email: "esther-wambui25@example.com",
    visits: 4,
    firstVisit: "Jan 25, 2026",
    lastVisit: "Feb 7, 2026",
    interest: "N/A",
    status: "Not Contacted",
  },
]

export const messages: Message[] = [
  {
    id: "1",
    date: "Feb 21, 2026",
    time: "06:45 PM",
    type: "sms",
    recipients: "Sunday service reminder",
    message:
      "Enim quibusdam fugit illo et et eos quis voluptatem omnis possimus labore voluptates suscipit dolores nesciunt molestias.",
    delivered: 2,
  },
  {
    id: "2",
    date: "Feb 21, 2026",
    time: "06:45 PM",
    type: "whatsapp",
    recipients: "Fellowship meeting this Saturday",
    message:
      "Cupiditate aut consequatur vitae iusto qui sit ut numquam exercitationem nostrum et cumque similique.",
    delivered: 1,
  },
  {
    id: "3",
    date: "Feb 21, 2026",
    time: "06:45 PM",
    type: "sms",
    recipients: "Thanks for your service",
    message: "Delectus saepe dicta ratione accusamus deleniti consequuntur et.",
    delivered: 3,
  },
  {
    id: "4",
    date: "Feb 21, 2026",
    time: "06:45 PM",
    type: "whatsapp",
    recipients: "Prayer request from the church",
    message:
      "Earum natus ut vitae numquam ut et voluptas ut excepturi eveniet voluptas quia ex sit consectetur molestias.",
    delivered: 2,
  },
  {
    id: "5",
    date: "Feb 21, 2026",
    time: "06:45 PM",
    type: "whatsapp",
    recipients: "Upcoming baptism class",
    message: "Natus et ab perferendis aut ipsam hic sed accusamus autem.",
    delivered: 2,
  },
]

export const events: Event[] = []

// Helper function to get full name
export function getFullName(member: Member | Visitor): string {
  return `${member.firstName} ${member.middleName} ${member.lastName}`.trim()
}

// Dashboard statistics
export const dashboardStats = {
  totalMembers: 24,
  men: 12,
  women: 12,
  children: 0,
  genderRatio: {
    men: 50,
    women: 50,
  },
  fellowshipZones: [
    { name: "North Zone", value: 20, color: "#0D9488" },
    { name: "South Zone", value: 25, color: "#B45309" },
    { name: "East Zone", value: 20, color: "#CA8A04" },
    { name: "West Zone", value: 15, color: "#64748B" },
    { name: "Central Zone", value: 20, color: "#3B82F6" },
  ],
  groupMembership: [
    { name: "Youth Fellowship", members: 8 },
    { name: "Men's Ministry", members: 6 },
    { name: "Women's Ministry", members: 10 },
    { name: "Worship Team", members: 8 },
    { name: "Sunday School", members: 7 },
    { name: "Outreach Team", members: 6 },
  ],
}

export const visitorStats = {
  totalVisitors: 4,
  recent30Days: 2,
  uncontacted: 4,
  wantMembership: 0,
  highInterest: 0,
}