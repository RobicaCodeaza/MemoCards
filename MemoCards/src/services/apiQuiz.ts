import { Tables } from '@/types/database.types'
import supabase from './supabase'
import { PAGE_SIZE_QUIZES } from '@/utils/constants'
import { fromThisDay, getToday } from '@/utils/helpers'
import toast from 'react-hot-toast'

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

    if (error) throw new Error('Could not fetch the Quizes.')
    return { quizes, count }
}

export async function getQuizesAll(userId: string) {
    const {
        data: quizes,
        error,
        count,
    } = await supabase
        .from('Quizes')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)

    if (error) throw new Error('Could not fetch the Quizes.')

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
export async function getQuizById(userId: string, quizId: number) {
    const { data: quiz, error: errorGettingQuiz } = await supabase
        .from('Quizes')
        .select('*')
        .eq('id', quizId)
        .eq('user_id', userId)

    if (errorGettingQuiz) throw new Error('Could not get the quiz by quizId.')

    return quiz[0]
}

export async function getRecentQuizes(userId: string, date: string | null) {
    let query
    if (!date) query = supabase.from('Quizes').select('*').eq('user_id', userId)
    else
        query = supabase.rpc('filter_quizes_by_last_tested', {
            user_id: userId,
            start_date: date,
            end_date: getToday({ end: true }),
        })

    const { data, error } = await query

    if (error) {
        // console.error(error)
        throw new Error('Recent Quizes could not get loaded.')
    }

    // console.log('recent data quizes', data)
    return data
}
