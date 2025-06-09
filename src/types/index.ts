export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  level: 'customer' | 'evacon'
  role: 'evacon_admin' | 'evacon_staff' | 'customer_admin' | 'customer_user'
  organization_id: string
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  email: string
  password: string
}

export interface UserMetadata {
  first_name: string
  last_name: string
  level: User['level']
  role: User['role']
}

export interface Organization {
  id: string
  name: string
  logo_url: string
  address: {
    street_address: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  account_status: 'active' | 'inactive'
  website: string
  time_zone: string
  notes: string
  contact: {
    name: string
    email: string
    phone: string
    created_at: string
    created_by: string
  }
  created_at: string
  created_by: string
  updated_at: string
  updated_by: string
}

export interface Project {
  id: string
  name: string
  description: string
  location: {
    city: string
    state: string
    country: string
  }
  organization_id: string
  status: 'active' | 'completed' | 'on_hold' | 'canceled'
  created_at: string
  updated_at: string
  fds_url?: string
  setpoint_url?: string
  design_url?: string
  io_url?: string
  diagrams?: Diagram[]
}

export interface Job {
  id: string
  organization_id: string
  type: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  payload: any
  result?: any
  error?: string
  created_at: string
  updated_at: string
}

export interface Diagram {
  id: string
  project_id: string
  name: string
  description: string
  url?: string
  created_at: string
  updated_at: string
}