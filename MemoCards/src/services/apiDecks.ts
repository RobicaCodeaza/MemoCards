import supabase from './supabase'
import { Tables } from '../types/database.types'

export async function getDecks() {
    const { data, error } = await supabase.from('Decks').select('*')

    if (error) {
        console.error(error)
        throw new Error('Cabins could not be loaded')
    }

    return data
}

export async function createEditDeck(newDeck: Tables<'Decks'>, id: number) {
    let query

    if (!id) query = supabase.from('Decks').insert([newDeck])
    else query = supabase.from('Decks').update(newDeck).eq('id', id)

    const { data, error } = await query.select().single()

    if (error) {
        console.error(error)
        throw new Error('Deck could not be created')
    }

    return data
}
