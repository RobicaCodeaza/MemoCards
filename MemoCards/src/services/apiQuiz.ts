import { Tables } from '@/types/database.types'
import supabase from './supabase'
import { PAGE_SIZE_QUIZES } from '@/utils/constants'

export async function createEditQuiz(
    newQuiz: Tables<'Quizes'>,
    id: number | null
) {
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
            throw new Error('Quiz with the same name already exists.')
        }

        query = supabase.from('Quizes').insert([newQuiz])
    } else query = supabase.from('Quizes').update(newQuiz).eq('id', id)

    const { data, error } = await query.select().single()

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

export async function getQuizesSummary(userId: string) {
    const {
        data: dataQuiz,
        count,
        error,
    } = await supabase
        .from('Quizes')
        .select('completionTime', { count: 'exact' })
        .eq('user_id', userId)

    if (error) throw new Error('Could not fetch the quizes summary stats.')

    const { data, error: errorGettingExamDate } = await supabase
        .from('Settings')
        .select('future_exam_in_days')
        .eq('user_id', userId)

    if (errorGettingExamDate) throw new Error('Could not fetch the exam date.')
    const dataExam = data[0]
    console.log(dataExam)

    return { dataQuiz, dataExam, count }
}

export async function deleteQuiz(id: number, userId: string) {
    const { error } = await supabase
        .from('Quizes')
        .delete()
        .eq('id', id)
        .eq('user_id', userId)

    if (error) throw new Error('Could not delete the Quiz.')
}
export async function deleteAllQuizes(userId: string) {
    const { error } = await supabase
        .from('Quizes')
        .delete()
        .eq('user_id', userId)

    if (error) throw new Error(error.message)
}
