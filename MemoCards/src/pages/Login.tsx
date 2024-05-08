import supabase from '@/services/supabase'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { Auth } from '@supabase/auth-ui-react'

function Login() {
    {
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    }
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
}

export default Login
