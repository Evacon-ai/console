export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  level: 'customer' | 'evacon'
  role: 'evacon_admin' | 'evacon_staff' | 'customer_admin' | 'customer_user'
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