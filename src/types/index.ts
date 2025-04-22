export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  level: 'customer' | 'evacon'
  role: 'evacon_admin' | 'evacon_staff' | 'customer_admin' | 'customer_user'
  createdAt: string
  updatedAt: string
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
  firstName: string
  lastName: string
  level: User['level']
  role: User['role']
}