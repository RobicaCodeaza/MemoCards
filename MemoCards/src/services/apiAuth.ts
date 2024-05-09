import supabase from './supabase'

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession()
    // If there is no user
    if (!session.session) return

    //Getting the user
    const { data, error } = await supabase.auth.getUser()

    if (error) throw new Error(error.message)

    return data?.user
}
