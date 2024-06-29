import { Tables } from '@/types/database.types'
import supabase from './supabase'
import { PAGE_SIZE_QUIZES } from '@/utils/constants'
import { fromThisDay } from '@/utils/helpers'
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

// export async function updateQuizesRecapPlan(
//     settings: Tables<'Settings'>,
//     userId: string,
//     quizId: number
// ) {

//     if(quizId)
//         const { data: quizes, error: errorGettingQuizes } = await supabase
//     .from('Quizes')
//     .select('*', { count: 'exact' })
//     .eq('user_id', userId)
//     .not('lastTested', 'is', null)

//     const { data: quizes, error: errorGettingQuizes } = await supabase
//         .from('Quizes')
//         .select('*', { count: 'exact' })
//         .eq('user_id', userId)
//         .not('lastTested', 'is', null)

//     if (errorGettingQuizes)
//         throw new Error('Could not get data for your quizes.')

//     if (!quizes || quizes.length === 0) return

//     const quizesUpdated = quizes.map((el) => {
//         // if (!el.perfectionScore) return
//         const score =
//             el.perfectionScore!.at(-1)! <= 25
//                 ? '25'
//                 : el.perfectionScore!.at(-1)! > 25 &&
//                     el.perfectionScore!.at(-1)! <= 50
//                   ? '50'
//                   : el.perfectionScore!.at(-1)! > 50 &&
//                       el.perfectionScore!.at(-1)! <= 75
//                     ? '75'
//                     : el.perfectionScore!.at(-1)! > 75 &&
//                         el.perfectionScore!.at(-1)! <= 100
//                       ? '100'
//                       : ''

//         //   const      toBeTestedInDays = data

//         const typeOfRecap =
//             `recap_weekstime_p${score}` as keyof Tables<'Settings'>

//         const daysToBeTested = (settings?.[typeOfRecap] as number) * 7
//         const toBeTested = fromThisDay(
//             daysToBeTested,
//             el.lastTested!.at(-1)!,
//             'endOfDay'
//         )
//         return { ...el, toBeTested }
//     })
//     if (!quizesUpdated || quizesUpdated.length === 0) return

//     const { data: dataUpdated, error: errorUpdatingCompletionTime } =
//         await supabase.from('Quizes').upsert(quizesUpdated).select('*')

//     if (errorUpdatingCompletionTime)
//         throw new Error(
//             'Could not update your quizes according to new settings.'
//         )
//     return dataUpdated
// }
