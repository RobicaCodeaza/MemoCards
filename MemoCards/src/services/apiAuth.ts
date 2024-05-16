import { ExtendedUser } from '@/features/authentication/UpdateUserDataForm'
import supabase, { supabaseUrl } from './supabase'

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
    if ('password' in updateData) newData = updateData
    else newData = { data: { fullName: updateData.data.fullName } }

    const { data, error } = await supabase.auth.updateUser({
        ...newData,
    })
    if (error) throw new Error(error.message)

    if ('password' in updateData) return data?.user

    //----------------------------------------------
    //Updating Metadata for Avatar
    const fileName = `avatar-${data.user?.id}-${Math.random()}`
    const { data: updatedUser, error: errorUpdatingAvatar } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        })

    if (errorUpdatingAvatar) throw new Error(errorUpdatingAvatar.message)

    //----------------------------------------------
    //Updating Storage for Avatars
    const { error: storageError } = await supabase.storage
        .from('avatars')
        .upload(fileName, updateData.data.avatar)

    if (storageError) throw new Error(storageError.message)

    return updatedUser?.user
}
