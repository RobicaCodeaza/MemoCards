import supabase from './supabase'
import { SettingsType } from '@/features/settings/UpdateRecap'

export async function getRecapSettings(userId: string) {
    const { data: settings, error: errorGettingRecapSettings } = await supabase
        .from('Settings')
        .select('*')
        .eq('user_id', userId)

    if (errorGettingRecapSettings)
        throw new Error('Could not get settings for your account.')

    return settings
}

export async function updateRecapSettings(updates: SettingsType) {
    const { data, error: errorUpdatingSettings } = await supabase
        .from('Settings')
        .upsert(updates)
        .select('*')

    if (errorUpdatingSettings)
        throw new Error('Could not update settings for your account.')

    return data
}
