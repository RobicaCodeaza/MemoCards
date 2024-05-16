import { ExtendedUser } from '@/features/authentication/UpdateUserDataForm'
import supabase, { supabaseKey, supabaseUrl } from './supabase'

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

    //Updating Storage for Avatars
    const fileName = `avatar-${data.user?.id}-${Math.random()}`
    const url = `${supabaseUrl}/storage/v1/object/authenticated/avatars/${fileName}`

    const { error: storageError } = await supabase.storage
        .from('avatars')
        .upload(fileName, updateData.data.avatar)

    if (storageError)
        throw new Error(`{${storageError.message}}.Error coming from storage`)

    //----------------------------------------------
    //Updating Metadata for Avatar

    //1. Getting the token in order to fetch the file
    const {
        data: { session },
    } = await supabase.auth.getSession()

    //2.Getting the file from the private bucket
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
    })
    if (!response.ok)
        throw new Error(`Error in fetching the avatar.${response.statusText}`)

    //3.Creating a URL of the photo to be used in the app
    const dataUsed = await response.blob()
    const avatarUrl = URL.createObjectURL(dataUsed)

    const { data: updatedUser, error: errorUpdatingAvatar } =
        await supabase.auth.updateUser({
            data: {
                avatar: avatarUrl,
            },
        })

    if (errorUpdatingAvatar)
        throw new Error(
            `${errorUpdatingAvatar.message},
            Error in updating avatar.`
        )

    //---------------------------------------------

    return updatedUser?.user
}
