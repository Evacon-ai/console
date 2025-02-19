import type { User as SupabaseUser } from '@supabase/supabase-js'

export type UserRole = 'evacon_admin' | 'evacon_staff' | 'customer_admin' | 'customer_user'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}