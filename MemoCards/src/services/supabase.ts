import { createClient } from '@supabase/supabase-js'
import { Database } from '../../public/types/database'

const supabaseUrl = 'https://bicvqgmxkyigtsiltrns.supabase.co'
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY3ZxZ214a3lpZ3RzaWx0cm5zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMjE1MjAsImV4cCI6MjAzMDU5NzUyMH0.gp9cUdMqHVqtBaJNjIVtOft1XVqaqIT7vGjS1MT3Qps'

const supabase = createClient<Database>(supabaseUrl, supabaseKey)
export default supabase
