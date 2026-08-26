import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/database.types'

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
export const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error(
        'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variable',
    )
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey)
export default supabase
