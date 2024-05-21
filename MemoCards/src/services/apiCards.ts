import { Tables } from '@/types/database.types'
import supabase from './supabase'

export async function getCards(
    userId: string,
    filter: {
        chapter: { value: string; field: string } | null
        subchapter: { value: string; field: string } | null
        lesson: { value: string; field: string } | null
    }
) {
    let query = supabase.from('Decks').select('id').eq('user_id', userId)

    if (filter.chapter !== null)
        query = query.eq(filter.chapter.field, filter.chapter.value)

    if (filter.subchapter !== null)
        query = query.eq(filter.subchapter.field, filter.subchapter.value)

    if (filter.lesson !== null)
        query = query.eq(filter.lesson.field, filter.lesson.value)

    const { data: deck, error } = await query
    console.log(deck)

    if (error) {
        throw new Error(error.message)
    }

    const {
        data: card,
        errorGettingCard,
        count,
    } = await supabase
        .from('Card')
        .select('*', { count: 'exact' })
        .eq('deckId', deck[0].id)
    console.log(card)

    return card
}

export async function createEditCard(
    newCard: Tables<'Card'>,
    id: number | null
) {
    let query

    if (!id) {
        const { data: existingData, error } = await supabase
            .from('Card')
            .select('*')
            .eq('user_id', newCard.user_id)
            .eq('question', newCard.question)

        if (error) {
            throw new Error(error.message)
        }

        // Check if data already exists
        if (existingData && existingData.length > 0) {
            throw new Error('Card with the same question already exists.')
        }

        query = supabase.from('Card').insert([newCard])
    } else query = supabase.from('Card').update(newCard).eq('id', id)

    const { data, error } = await query.select().single()

    if (error) {
        throw new Error('Card could not be created.')
    }

    return data
}

export async function deleteAllCards(userId: string) {
    const { error } = await supabase.from('Card').delete().eq('user_id', userId)

    if (error) throw new Error(error.message)
}
