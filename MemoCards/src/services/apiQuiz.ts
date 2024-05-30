import { Tables } from '@/types/database.types'
import supabase from './supabase'

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
