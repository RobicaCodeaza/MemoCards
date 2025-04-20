import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

export const supabaseUrl = 'https://evgdlnfsjktxeehaccui.supabase.co'
export const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Z2RsbmZzamt0eGVlaGFjY3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNzg5NTAsImV4cCI6MjA2MDY1NDk1MH0.bK8RB5RP7oTyLdS5MEr8AeyLlRRAsGbK0qxs4oCOqGk'

const supabase = createClient<Database>(supabaseUrl, supabaseKey)
export default supabase
