import { Tables } from '@/types/database.types'
import supabase from './supabase'

export async function getRecapSettings(userId: string) {
    const { data: settings, error: errorGettingRecapSettings } = await supabase
        .from('Settings')
        .select('*')
        .eq('user_id', userId)

    if (errorGettingRecapSettings)
        throw new Error('Could not get settings for your account.')

    return settings
}

export async function updateRecapSettings(
    userId: string,
    updates: Tables<'Settings'>
) {
    const { error: errorUpdatingSettings } = await supabase
        .from('Settings')
        .upsert(updates)
        .eq('user_id', userId)
        .select('*')

    if (errorUpdatingSettings)
        throw new Error('Could not update settings for your account.')
}
