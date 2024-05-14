import supabase from './supabase'
import { Tables } from '../types/database.types'

export async function getDecks() {
    const { data, error } = await supabase.from('Decks').select('*')

    if (error) {
        console.error(error)
        throw new Error('Decks could not be loaded.')
    }

    return data
}

export async function createEditDeck(
    newDeck: Tables<'Decks'>,
    id: number | null
) {
    let query

    if (!id) query = supabase.from('Decks').insert([newDeck])
    else query = supabase.from('Decks').update(newDeck).eq('id', id)

    const { data, error } = await query.select().single()

    if (error) {
        throw new Error('Deck could not be created.')
    }

    return data
}

export async function deleteDeck(id: number) {
    const { error } = await supabase
        .from('Decks')
        .delete()
        .eq('id', id)
        .select()

    if (error) throw new Error('Could not delete the deck.')
}
