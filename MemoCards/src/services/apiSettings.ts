import { fromThisDay, fromToday } from '@/utils/helpers'
import supabase from './supabase'
import { SettingsType } from '@/features/settings/UpdateRecap'
import { Tables } from '@/types/database.types'

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
    updates: SettingsType,
    userId: string
) {
    const { data, error: errorUpdatingSettings } = await supabase
        .from('Settings')
        .upsert(updates)
        .select('*')
    const settings = data?.[0]

    const {
        data: quizes,
        error: errorGettingQuizes,
        count,
    } = await supabase
        .from('Quizes')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .not('lastTested', 'is', null)

    const quizesUpdated = quizes?.map((el) => {
        // if (!el.perfectionScore) return
        const score =
            el.perfectionScore!.at(-1)! <= 25
                ? '25'
                : el.perfectionScore!.at(-1)! > 25 &&
                    el.perfectionScore!.at(-1)! <= 50
                  ? '50'
                  : el.perfectionScore!.at(-1)! > 50 &&
                      el.perfectionScore!.at(-1)! <= 75
                    ? '75'
                    : el.perfectionScore!.at(-1)! > 75 &&
                        el.perfectionScore!.at(-1)! <= 100
                      ? '100'
                      : ''

        //   const      toBeTestedInDays = data

        const typeOfRecap =
            `recap_weekstime_p${score}` as keyof Tables<'Settings'>

        const daysToBeTested = (settings?.[typeOfRecap] as number) * 7
        const toBeTested = fromThisDay(
            daysToBeTested,
            el.lastTested!.at(-1)!,
            'endOfDay'
        )
        return { ...el, toBeTested }
    })

    console.log(quizesUpdated)

    // const { error: errorUpdatingCompletionTime } = await supabase
    //     .from('Quizes')
    //     .update(quizes)
    //     .select()
    //     .single()

    if (errorUpdatingSettings)
        throw new Error('Could not update settings for your account.')

    return data
}
