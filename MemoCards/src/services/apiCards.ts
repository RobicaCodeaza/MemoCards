import { Tables } from '@/types/database.types'
import supabase from './supabase'

export async function getCards() {
    const { data: cards, error } = await supabase.from('Card').select('*')
    if (error) {
        throw new Error(error.message)
    }
    return cards
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
