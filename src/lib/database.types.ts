export type UserRole = 'evacon_admin' | 'evacon_staff' | 'customer_admin' | 'customer_user'

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          logo_url?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          first_name: string
          last_name: string
          role: UserRole
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          role: UserRole
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          role?: UserRole
          created_at?: string
          updated_at?: string
        }
      }
      user_organizations: {
        Row: {
          user_id: string
          org_id: string
          role: UserRole
          is_primary: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          org_id: string
          role: UserRole
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          org_id?: string
          role?: UserRole
          is_primary?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          org_id: string
          status: 'planning' | 'in_progress' | 'review' | 'completed' | 'error'
          files: {
            fds?: string
            setPoints?: string
            design?: string
            io?: string
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          org_id: string
          status: 'planning' | 'in_progress' | 'review' | 'completed' | 'error'
          files?: {
            fds?: string
            setPoints?: string
            design?: string
            io?: string
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          org_id?: string
          status?: 'planning' | 'in_progress' | 'review' | 'completed' | 'error'
          files?: {
            fds?: string
            setPoints?: string
            design?: string
            io?: string
          }
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}