import supabase from './supabase'
import { Tables } from '../types/database.types'
import { PAGE_SIZE_DECKS } from '@/utils/constants'

export async function getDecks(userId: string) {
    const { data, error } = await supabase
        .from('Decks')
        .select('*')
        .eq('user_id', userId)

    if (error) {
        throw new Error('Decks could not be loaded.')
    }

    return data
}

export async function getDecksPaginated(userId: string, page: number) {
    let query = supabase
        .from('Decks')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)

    if (page) {
        const from = (page - 1) * PAGE_SIZE_DECKS
        const to = page * PAGE_SIZE_DECKS
        // console.log(from, to);
        query = query.range(from, to - 1)
    }

    const { data: decks, error, count } = await query

    if (error) throw new Error('Could not fetch the decks.')

    return { decks, count }
}

export async function createEditDeck(
    newDeck: Tables<'Decks'>,
    id: number | null
) {
    let query

    if (!id) {
        const { data: existingData, error } = await supabase
            .from('Decks')
            .select('*')
            .eq('user_id', newDeck.user_id)
            .eq('lesson', newDeck.lesson)

        if (error) {
            throw new Error(error.message)
        }

        // Check if data already exists
        if (existingData && existingData.length > 0) {
            throw new Error('Data already exists.')
        }
        query = supabase.from('Decks').insert([newDeck])
    } else query = supabase.from('Decks').update(newDeck).eq('id', id)

    const { data, error } = await query.select().single()

    if (error) {
        throw new Error('Deck could not be created.')
    }

    return data
}

export async function deleteDeck(id: number) {
    const { error } = await supabase.from('Decks').delete().eq('id', id)

    if (error) throw new Error('Could not delete the deck.')
}

export async function deleteAllDecks(userId: string) {
    const { error } = await supabase
        .from('Decks')
        .delete()
        .eq('user_id', userId)

    if (error) throw new Error(error.message)
}

export async function getDeckIdForCard(
    chapter: string,
    subChapter: string,
    lesson: string
) {
    const { data, error } = await supabase
        .from('Decks')
        .select('id')
        .eq('chapter', chapter)
        .eq('subchapter', subChapter)
        .eq('lesson', lesson)

    if (error ?? data?.length === 0) {
        throw new Error("Couldn't find a deck with the data provided.")
    }

    console.log(data?.[0].id)
    return data?.[0].id
}

// export async function getDeckByDetails(id: number) {
//     const { data, error } = await supabase
//         .from('Decks')
//         .select('chapter,subchapter,lesson')
//         .eq('id', id)

//     if (error) {
//         throw new Error("Couldn't find a deck with the data provided.")
//     }
//     return data[0]
// }
