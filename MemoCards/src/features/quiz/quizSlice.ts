import { Tables } from '@/types/database.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import supabase from '../../services/supabase'
import { AppStore, RootState, store } from '@/services/store'
import toast from 'react-hot-toast'
import { Root } from 'react-dom/client'

type quizStateType = {
    questions: Tables<'Card'>[]
    index: number
    status: 'loading' | 'ready' | 'error' | 'finished' | 'active' | 'notTesting'
    answer: number | null
    answerTimeFinished: boolean

    revealAnswer: boolean
    perfectionScore: number
    decksData: { deckId: number; perfectionScore: number }[]
    secondsRemainingQuestion: number | null
    secondsRemainingQuiz: number | null
    totalTime: number
}

const initialStateQuiz: quizStateType = {
    questions: [],
    index: 0,
    status: 'notTesting',
    answer: null,
    secondsRemainingQuiz: null,
    revealAnswer: false,
    perfectionScore: 0,
    decksData: [],
    secondsRemainingQuestion: null,
    answerTimeFinished: false,
    totalTime: 0,
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialStateQuiz,
    reducers: {
        gettingData(state, action) {
            state.status = 'loading'
        },
        dataReceived(
            state,
            action: PayloadAction<{
                questions: Tables<'Card'>[]
                quizTime: number | null
                questionTime: number | null
            }>
        ) {
            state.status = 'ready'
            state.questions = action.payload.questions
            state.secondsRemainingQuestion = action.payload.questionTime
            state.secondsRemainingQuiz = action.payload.quizTime
            state.totalTime = state.secondsRemainingQuiz
                ? state.secondsRemainingQuiz
                : state.questions.length * state.secondsRemainingQuestion!
        },

        dataFailed(state) {
            state.status = 'error'
        },
        start(state) {
            state.status = 'active'
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
            state.answerTimeFinished = false
        },
        finish(state, action) {
            state.status = 'finished'
        },
        restart(state, action) {
            state.index = 0
            state.answer = null
            state.status = 'ready'
            state.secondsRemainingQuestion = null
            state.secondsRemainingQuiz = null
        },
        reset(state) {
            state.status = 'notTesting'
            state.questions = []
            state.index = 0
            state.answer = null
            state.perfectionScore = 0
            state.decksData = []
            state.secondsRemainingQuestion = null
            state.secondsRemainingQuiz = null
        },

        tick(
            state,
            action: PayloadAction<
                'secondsRemainingQuestion' | 'secondsRemainingQuiz'
            >
        ) {
            console.log(action.payload)
            state[action.payload] = state[action.payload]! - 1
            if (action.payload === 'secondsRemainingQuiz') {
                state.status =
                    state[action.payload] === 0 ? 'finished' : state.status
                state.totalTime = state.totalTime - state[action.payload]!
            } else
                state.answerTimeFinished =
                    state[action.payload] === 0
                        ? true
                        : state.answerTimeFinished
            state.totalTime = state.totalTime - state[action.payload]!
        },
    },
})

export const {
    gettingData,
    dataFailed,
    newAnswer,
    start,
    nextQuestion,
    finish,
    restart,
    reset,
    tick,
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
                .select('decksId,questionTime,quizTime')
                .eq('id', quizId)

            if (errorGettingDecks ?? data === null)
                throw new Error('Error in finding coresponding decks.')

            const { data: questions, error: errorGettingQuestions } =
                await supabase
                    .from('Card')
                    .select()
                    .in('deckId', data[0].decksId)

            if (errorGettingQuestions ?? questions === null)
                throw new Error(
                    'Cannot find coresponding data. Make sure you selected decks with cards.'
                )

            const payload = {
                questions,
                questionTime: data[0].questionTime,
                quizTime: data[0].quizTime,
            }
            return dispatch({
                type: 'quiz/dataReceived',
                payload,
            })
        } catch (error) {
            let message
            if (error instanceof Error) message = error.message
            else message = String(error)
            toast.error(message)
            dispatch(dataFailed())
        }
    }
}

export const getQuiz = (store: RootState) => store.quiz
export const getQuizStatus = (store: RootState) => store.quiz.status
export const getQuizQuestions = (store: RootState) => store.quiz.questions
export const getQuizNumQuestions = (store: RootState) =>
    store.quiz.questions.length
export const getQuizIndex = (store: RootState) => store.quiz.index
export const getQuizAnswer = (store: RootState) => store.quiz.answer
export const getQuizPerfectionScore = (store: RootState) =>
    store.quiz.perfectionScore
export const getQuizRemainingQuestionTime = (store: RootState) =>
    store.quiz.secondsRemainingQuestion
export const getQuizRemainingQuizTime = (store: RootState) =>
    store.quiz.secondsRemainingQuiz
export const getQuizQuestion = (questionIndex: number) => (store: RootState) =>
    store.quiz.questions[questionIndex]

export default quizSlice.reducer
