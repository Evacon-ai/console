import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Verify the user is authenticated and get their role
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    if (authError) throw authError
    if (!user) throw new Error('Not authenticated')

    // Check if user has permission to update users
    const metadata = user.user_metadata
    const userRole = metadata.role || ''
    if (!userRole || !['evacon_admin', 'evacon_staff'].includes(userRole)) {
      throw new Error('Not authorized to update users')
    }

    // Get the request body
    const { userId, firstName, lastName, email, role } = await req.json()

    // Validate role changes
    const isCustomerRole = role.startsWith('customer_')
    const isEvaconRole = role.startsWith('evacon_')
    
    if (!['customer_user', 'customer_admin', 'evacon_staff', 'evacon_admin'].includes(role)) {
      throw new Error('Invalid role')
    }

    // Update the user metadata
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      userId,
      {
        email,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          role
        }
      }
    )
    if (updateError) throw updateError

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})