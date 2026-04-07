import Cookies from "js-cookie";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

// ============= Type Definitions =============

export interface ApiResponse<T = unknown> {
  token?: string;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  member?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export interface Member {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  gender: 'male' | 'female';
  zone: string;
  maritalStatus: string;
  mobile: string;
  residence: string;
  birthday?: string;
  weddingAnniversary?: string;
  specialCelebration?: string;
  specialCelebrationDescription?: string;
  familyId?: string;
  familyRole?: string;
  smallGroupId?: string;
  joinDate?: string;
  role?: string;
}

export interface Family {
  id: string;
  name: string;
  headId: string;
  // CHANGED: members is now a simple array of { memberId, role } instead of full Member objects
  members?: {
    memberId: string;
    role: string;
  }[];
}

export interface SmallGroup {
  id: string;
  name: string;
  zone: string;
  location: string;
  leaderId?: string;
  description?: string;
  meetingDay?: string;
  meetingTime?: string;
  // CHANGED: memberIds instead of members array
  memberIds?: string[];
}

export interface Visitor {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: 'male' | 'female';
  contact: string;
  email: string;
  visits: number;
  firstVisit: string;
  lastVisit: string;
  interest: 'N/A' | 'Low' | 'Medium' | 'High';
  status: 'Not Contacted' | 'Contacted' | 'Follow Up';
}

export interface Message {
  id: string;
  date: string;
  time: string;
  type: 'sms' | 'whatsapp';
  recipients: string;
  message: string;
  delivered: number;
}

export interface Event {
  id: string;
  title: string;
  category: string;
  dateTime: string;
  location: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
}

// ============= API Call Function =============

export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const token = typeof window !== 'undefined' ? Cookies.get('token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options?.headers as Record<string, string>)||{}),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `API error: ${response.statusText}`;
      
      try {
        const errorData = await response.json() as Record<string, unknown>;
        if (typeof errorData.message === 'string') {
          errorMessage = errorData.message;
        } else if (typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        }
      } catch {
        // If JSON parsing fails, use default error message
      }
      
      throw new Error(errorMessage);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    // Re-throw to be caught by hooks
    throw error;
  }
}

// ============= Authentication =============

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const data = await apiCall<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  // Store token in cookie
  if (data.token) {
    Cookies.set('token', data.token, {expires: 1, sameSite: 'strict', secure: true}); // expires in 1 day
  }

  return data;
}

export function logout(): void {
  Cookies.remove('token');
  window.location.href = '/login';
}

export function getStoredToken(): string | null {
  const token = typeof window !== 'undefined' ? Cookies.get('token') : null;
  return token || null;
}

// ============= Members =============

export async function getMembers(): Promise<Member[]> {
  return apiCall<Member[]>('/members');
}

export async function getMember(id: string): Promise<Member> {
  return apiCall<Member>(`/members/${id}`);
}

export async function createMember(data: Omit<Member, 'id'>): Promise<Member> {
  return apiCall<Member>('/members', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateMember(
  id: string,
  data: Partial<Member>
): Promise<Member> {
  return apiCall<Member>(`/members/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMember(id: string): Promise<void> {
  await apiCall<void>(`/members/${id}`, {
    method: 'DELETE',
  });
}

// ============= Families =============

export async function getFamilies(): Promise<Family[]> {
  return apiCall<Family[]>('/families');
}

export async function getFamily(id: string): Promise<Family> {
  return apiCall<Family>(`/families/${id}`);
}

export async function createFamily(
  data: Omit<Family, 'id'>
): Promise<Family> {
  return apiCall<Family>('/families', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateFamily(
  id: string,
  data: Partial<Family>
): Promise<Family> {
  return apiCall<Family>(`/families/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteFamily(id: string): Promise<void> {
  await apiCall<void>(`/families/${id}`, {
    method: 'DELETE',
  });
}

// ============= Small Groups =============

export async function getSmallGroups(): Promise<SmallGroup[]> {
  return apiCall<SmallGroup[]>('/small-groups');
}

export async function getSmallGroup(id: string): Promise<SmallGroup> {
  return apiCall<SmallGroup>(`/small-groups/${id}`);
}

export async function createSmallGroup(
  data: Omit<SmallGroup, 'id'>
): Promise<SmallGroup> {
  return apiCall<SmallGroup>('/small-groups', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateSmallGroup(
  id: string,
  data: Partial<SmallGroup>
): Promise<SmallGroup> {
  return apiCall<SmallGroup>(`/small-groups/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSmallGroup(id: string): Promise<void> {
  await apiCall<void>(`/small-groups/${id}`, {
    method: 'DELETE',
  });
}

// ============= Visitors =============

export async function getVisitors(): Promise<Visitor[]> {
  return apiCall<Visitor[]>('/visitors');
}

export async function getVisitor(id: string): Promise<Visitor> {
  return apiCall<Visitor>(`/visitors/${id}`);
}

export async function createVisitor(
  data: Omit<Visitor, 'id'>
): Promise<Visitor> {
  return apiCall<Visitor>('/visitors', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateVisitor(
  id: string,
  data: Partial<Visitor>
): Promise<Visitor> {
  return apiCall<Visitor>(`/visitors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteVisitor(id: string): Promise<void> {
  await apiCall<void>(`/visitors/${id}`, {
    method: 'DELETE',
  });
}

// ============= Messages =============

export async function getMessages(): Promise<Message[]> {
  return apiCall<Message[]>('/messages');
}

export async function getMessage(id: string): Promise<Message> {
  return apiCall<Message>(`/messages/${id}`);
}

export async function createMessage(
  data: Omit<Message, 'id'>
): Promise<Message> {
  return apiCall<Message>('/messages', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateMessage(
  id: string,
  data: Partial<Message>
): Promise<Message> {
  return apiCall<Message>(`/messages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMessage(id: string): Promise<void> {
  await apiCall<void>(`/messages/${id}`, {
    method: 'DELETE',
  });
}

// ============= Events =============

export async function getEvents(): Promise<Event[]> {
  return apiCall<Event[]>('/events');
}

export async function getEvent(id: string): Promise<Event> {
  return apiCall<Event>(`/events/${id}`);
}

export async function createEvent(data: Omit<Event, 'id'>): Promise<Event> {
  return apiCall<Event>('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateEvent(
  id: string,
  data: Partial<Event>
): Promise<Event> {
  return apiCall<Event>(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteEvent(id: string): Promise<void> {
  await apiCall<void>(`/events/${id}`, {
    method: 'DELETE',
  });
}