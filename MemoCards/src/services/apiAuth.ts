import { ExtendedUser } from '@/features/authentication/UpdateUserDataForm'
import supabase from './supabase'

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession()
    // If there is no user
    if (!session.session) return

    //Getting the user
    const { data, error } = await supabase.auth.getUser()

    if (error) throw new Error(error.message)

    return data?.user as ExtendedUser
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
    let newData
    if (
        ('data' in updateData && 'avatar' in updateData.data) ||
        'password' in updateData
    )
        newData = updateData
    else newData = { data: { fullName: updateData.data.fullName } }

    const { data, error } = await supabase.auth.updateUser({
        ...newData,
    })

    if (error) throw new Error(error.message)

    // console.log(Boolean(data?.user.user_metadata.avatar))
    return data?.user
}
