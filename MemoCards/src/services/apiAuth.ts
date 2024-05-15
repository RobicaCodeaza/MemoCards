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

export async function logout() {
    const { error } = await supabase.auth.signOut()

    if (error) throw new Error(error.message)
}

export type UpdatePassword = {
    password: string
}

export type UpdateMetadata = {
    data: { fullName: string; avatar: File }
}

type UpdateData = UpdatePassword | UpdateMetadata

export async function updateUser(updateData: UpdateData) {
    const { data, error } = await supabase.auth.updateUser({
        ...updateData,
    })

    if (error) throw new Error(error.message)

    return data?.user
}
