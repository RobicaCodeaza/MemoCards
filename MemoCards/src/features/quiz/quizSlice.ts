import { Tables } from '@/types/database.types'
import { createSlice } from '@reduxjs/toolkit'
import supabase from '../../services/supabase'
import { AppDispatch, AppStore, RootState, store } from '@/services/store'
import toast from 'react-hot-toast'

type quizStateType = {
    questions: Tables<'Card'>[]
    index: number
    status: 'loading' | 'ready' | 'error' | 'finished' | 'active' | 'notTesting'
    answer: number | null
    perfectionScore: number
    decksData: { deckId: number; perfectionScore: number }[]
    secondsRemaining: number | null
}

const initialStateQuiz: quizStateType = {
    questions: [],
    index: 0,
    status: 'notTesting',
    answer: null,
    perfectionScore: 0,
    decksData: [],
    secondsRemaining: null,
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialStateQuiz,
    reducers: {
        gettingData(state, action) {
            state.status = 'loading'
        },
        dataReceived(state, action) {
            state.status = 'ready'
            state.questions = action.payload as Tables<'Card'>[]
        },
        dataFailed(state, action) {
            state.status = 'error'
        },
        start(state, action) {
            state.status = 'active'
            state.secondsRemaining = action.payload as number
        },
        newAnswer(state, action) {
            const question = state.questions.at(state.index) as Tables<'Card'>

            state.answer = action.payload as number
            state.perfectionScore =
                action.payload === question.correctAnswer
                    ? state.perfectionScore + 1
                    : state.perfectionScore
        },
        nextQuestion(state, action) {
            state.index = state.index + 1
            state.answer = null
        },
        finish(state, action) {
            state.status = 'finished'
        },
        restart(state, action) {
            state.index = 0
            state.answer = null
            state.status = 'ready'
            state.secondsRemaining = null
        },
        reset(state) {
            console.log('reset')
            state = initialStateQuiz
        },
    },
})

export const {
    gettingData,
    dataFailed,
    start,
    newAnswer,
    nextQuestion,
    finish,
    restart,
    reset,
} = quizSlice.actions

export function dataReceived(quizId: string) {
    return async function (
        dispatch: typeof store.dispatch,
        getState: typeof store.getState
    ) {
        try {
            dispatch({ type: 'quiz/gettingData' })
            const { data, error: errorGettingDecks } = await supabase
                .from('Quizes')
                .select('decksId')
                .eq('id', quizId)

            if (errorGettingDecks ?? data === null)
                throw new Error('Error in finding coresponding decks.')

            const { data: questions, error: errorGettingQuestions } =
                await supabase
                    .from('Card')
                    .select()
                    .in('deckId', data[0].decksId)

            if (errorGettingQuestions ?? questions === null)
                throw new Error('Error in finding coresponding questions.')
            return dispatch({ type: 'quiz/dataReceived', payload: questions })
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)
            toast.error(message)
        }
    }
}

export const getQuiz = (store: RootState) => store.quiz

export default quizSlice.reducer
