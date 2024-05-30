import { Tables } from '@/types/database.types'
import supabase from './supabase'
import { PAGE_SIZE_QUIZES } from '@/utils/constants'

export async function createEditQuiz(
    newQuiz: Tables<'Quizes'>,
    id: number | null
) {
    console.log(newQuiz)
    let query

    if (!id) {
        const { data: existingData, error } = await supabase
            .from('Quizes')
            .select('*')
            .eq('user_id', newQuiz.user_id)
            .eq('quizName', newQuiz.quizName)

        if (error) {
            throw new Error(error.message)
        }
        // Check if data already exists
        if (existingData && existingData.length > 0) {
            console.log('error')
            throw new Error('Quiz with the same name already exists.')
        }

        query = supabase.from('Quizes').insert([newQuiz])
    } else query = supabase.from('Quizes').update(newQuiz).eq('id', id)

    const { data, error } = await query.select().single()
    console.log(data)

    if (error) {
        throw new Error('Quiz could not be created.')
    }

    return data
}

export async function getQuizesPaginated(userId: string, page: number) {
    let query = supabase
        .from('Quizes')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)

    if (page) {
        const from = (page - 1) * PAGE_SIZE_QUIZES
        const to = page * PAGE_SIZE_QUIZES
        // console.log(from, to);
        query = query.range(from, to - 1)
    }

    const { data: quizes, error, count } = await query

    if (error) throw new Error('Could not fetch the decks.')

    return { quizes, count }
}
