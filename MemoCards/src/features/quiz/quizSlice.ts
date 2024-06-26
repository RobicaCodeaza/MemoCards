import { Tables } from '@/types/database.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import supabase from '../../services/supabase'
import { RootState, store } from '@/services/store'
import toast from 'react-hot-toast'

type quizStateType = {
    quizId: number
    questions: Tables<'Card'>[]
    index: number
    status: 'loading' | 'ready' | 'error' | 'finished' | 'active' | 'notTesting'
    answer: number | null
    isFlippingCard: boolean
    revealAnswer: boolean
    answerTimeFinished: boolean
    questionPoints: number
    perfectionScore: number
    decksData: {
        deckId: number
        perfectionScore: number[]
        numQuestions: number
    }[]
    secondsRemainingQuestion: number | null
    questionTime: number | null
    secondsRemainingQuiz: number | null
    quizTime: number | null
    completionTime: number
}

const initialStateQuiz: quizStateType = {
    quizId: -1,
    questions: [],
    index: 0,
    status: 'notTesting',
    answer: null,
    isFlippingCard: false,
    revealAnswer: false,
    answerTimeFinished: false,
    questionPoints: 0,
    perfectionScore: 0,
    decksData: [],
    secondsRemainingQuestion: null,
    questionTime: null,
    secondsRemainingQuiz: null,
    quizTime: null,
    completionTime: 0,
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState: initialStateQuiz,
    reducers: {
        gettingData(state) {
            state.status = 'loading'
        },
        dataReceived(
            state,
            action: PayloadAction<{
                questions: Tables<'Card'>[]
                quizTime: number | null
                questionTime: number | null
                decksData: {
                    deckId: number
                    perfectionScore: number[]
                    numQuestions: number
                }[]
                quizId: number
            }>
        ) {
            console.log(action.payload.decksData)
            state.status = 'ready'
            state.questions = action.payload.questions
            state.questionTime = action.payload.questionTime
            state.quizTime = action.payload.quizTime
            state.decksData = action.payload.decksData
            state.quizId = action.payload.quizId
        },

        dataFailed(state) {
            state.status = 'error'
        },
        start(state) {
            state.status = 'active'
            state.secondsRemainingQuestion = state.questionTime
            state.secondsRemainingQuiz = state.quizTime
            state.answer = null
            state.revealAnswer = false
            state.isFlippingCard = false
            state.index = 0
            state.answerTimeFinished = false
            state.perfectionScore = 0
            state.completionTime = state.quizTime ? state.quizTime : 0
        },
        newAnswer(
            state,
            action: PayloadAction<{
                type: 'flippingCard' | 'normalQuestion'
                value: number
            }>
        ) {
            const question = state.questions.at(state.index) as Tables<'Card'>
            console.log('newAnswer', action.payload)

            if (action.payload.type === 'normalQuestion') {
                const pointsToBeAdded =
                    action.payload.value === question.correctAnswer ? 1 : 0
                state.answer = action.payload.value
                state.questionPoints = pointsToBeAdded
                state.decksData = state.decksData.map((deckData) => {
                    if (deckData.deckId === question.deckId) {
                        const deckPerfectionScore =
                            deckData.perfectionScore.slice()
                        deckPerfectionScore[deckPerfectionScore.length - 1] =
                            deckPerfectionScore[
                                deckPerfectionScore.length - 1
                            ] + pointsToBeAdded
                        return {
                            ...deckData,
                            perfectionScore: deckPerfectionScore,
                        }
                    } else return deckData
                })
            }
            if (action.payload.type === 'flippingCard') {
                state.questionPoints = action.payload.value * 1
                state.decksData = state.decksData.map((deckData) => {
                    if (deckData.deckId === question.deckId) {
                        const deckPerfectionScore =
                            deckData.perfectionScore.slice()
                        deckPerfectionScore[deckPerfectionScore.length - 1] =
                            deckPerfectionScore[
                                deckPerfectionScore.length - 1
                            ] +
                            action.payload.value * 1
                        return {
                            ...deckData,
                            perfectionScore: deckPerfectionScore,
                        }
                    } else return deckData
                })
                // console.log(action.payload.value, state.questionPoints)
            }

            state.decksData = state.decksData.map((el) =>
                el.deckId === question.deckId
                    ? { ...el, numQuestions: el.numQuestions + 1 }
                    : el
            )
        },
        nextQuestion(state) {
            state.index = state.index + 1
            state.answer = null
            state.answerTimeFinished = false
            state.secondsRemainingQuestion = state.questionTime
            state.isFlippingCard =
                state.questions[state.index].answers.length > 1 ? false : true
            state.revealAnswer = false
            state.perfectionScore = state.perfectionScore + state.questionPoints
            state.questionPoints = 0
        },
        revealAnswer(state) {
            state.revealAnswer = !state.revealAnswer
        },
        finish(state) {
            state.perfectionScore = state.perfectionScore + state.questionPoints
            state.status = 'finished'
        },
        restart(state) {
            // console.log(restart)
            state.status = 'ready'
            state.secondsRemainingQuestion = null
            state.secondsRemainingQuiz = null
            let decksData = state.decksData
            decksData = decksData.map((el) => {
                return {
                    ...el,
                    perfectionScore: [...el.perfectionScore, 0],
                    numQuestions: 0,
                }
            })
            console.log('deckReset', decksData)
            state.decksData = decksData
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
            state[action.payload] = state[action.payload]! - 1
            if (action.payload === 'secondsRemainingQuiz') {
                state.status =
                    state[action.payload] === 0 ? 'finished' : state.status
                state.completionTime = state.secondsRemainingQuiz!
            } else {
                state.answerTimeFinished =
                    state[action.payload] === 0
                        ? true
                        : state.answerTimeFinished
                state.completionTime = state.completionTime + 1
            }
        },
    },
})

export const {
    gettingData,
    dataFailed,
    newAnswer,
    start,
    nextQuestion,
    restart,
    reset,
    tick,
    revealAnswer,
} = quizSlice.actions

export function dataReceived(quizId: string) {
    return async function (dispatch: typeof store.dispatch) {
        try {
            dispatch({ type: 'quiz/gettingData' })
            const { data, error: errorGettingDecks } = await supabase
                .from('Quizes')
                .select('decksId,questionTime,quizTime,id')
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

            //We need this data in order to update those decks progression later
            const {
                data: decksPerfectionScore,
                error: errorGettingDecksPerfection,
            } = await supabase
                .from('Decks')
                .select('perfectionScore,id')
                .in('id', data[0].decksId)

            if (errorGettingDecksPerfection ?? decksPerfectionScore === null)
                throw new Error(
                    'Cannot find coresponding data. Make sure you selected decks with cards.'
                )

            const decksInQuestions = decksPerfectionScore.map((el) => {
                const perfectionScore = el.perfectionScore
                    ? el.perfectionScore
                    : []
                perfectionScore?.push(0)
                return {
                    deckId: el.id,
                    perfectionScore,
                    numQuestions: 0,
                }
            })
            // console.log(decksInQuestions, 'decksinQuestions')

            const payload = {
                questions,
                questionTime: data[0].questionTime,
                quizTime: data[0].quizTime,
                decksData: decksInQuestions,
                quizId: data[0].id,
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

export function finish() {
    return async function (
        dispatch: typeof store.dispatch,
        getState: typeof store.getState
    ) {
        try {
            const { quiz } = getState()
            console.log(quiz.decksData)
            const newQuizCompletionTime = {
                completionTime: quiz.completionTime,
            }

            //Updating Quiz Completion Time
            const { error: errorUpdatingCompletionTime } = await supabase
                .from('Quizes')
                .update(newQuizCompletionTime)
                .eq('id', quiz.quizId)
                .select()
                .single()

            if (errorUpdatingCompletionTime) {
                throw new Error('Error updating completion time of the quiz.')
            }
            const perfectionScoreTotal =
                quiz.perfectionScore + quiz.questionPoints
            //Updating Quiz Perfection Score
            const { error: errorUpdatingPerfectionScore } = await supabase.rpc(
                'append_completiondata_quiz',
                {
                    row_id: quiz.quizId,
                    new_perfection_score:
                        (perfectionScoreTotal * 100) / quiz.questions.length,
                    new_last_tested: new Date().toISOString(),
                }
            )

            if (errorUpdatingPerfectionScore) {
                throw new Error('Error updating Perfection Score of the quiz.')
            }

            //Updating Decks Perfection Score
            const decksEdited = quiz.decksData.map((el) => el.deckId)
            const { data, error: errorGettingDecksTested } = await supabase
                .from('Decks')
                .select('*')
                .in('id', decksEdited)
            console.log('data', quiz.decksData)
            if (errorGettingDecksTested) {
                throw new Error('Error getting data of the decks.')
            }

            const updates = data.map((el) => {
                const deckToAdd = quiz.decksData.filter(
                    (deckData) => deckData.deckId === el.id
                )
                const perfectionScoreToAdd =
                    (deckToAdd[0].perfectionScore.at(-1)! * 100) /
                    deckToAdd[0].numQuestions

                const perfectionScore = el.perfectionScore
                    ? ([
                          ...el.perfectionScore,
                          perfectionScoreToAdd,
                      ] as number[])
                    : ([perfectionScoreToAdd] as number[])

                const dateToAdd = new Date().toISOString()
                const lastTested = el.lastTested
                    ? [...el.lastTested, dateToAdd]
                    : [dateToAdd]
                return {
                    ...el,
                    lastTested,
                    perfectionScore,
                }
            })
            console.log('updates', updates)

            const { error: errorUpdatingDecks } = await supabase
                .from('Decks')
                .upsert(updates)

            if (errorUpdatingDecks) {
                throw new Error(
                    'Error updating Perfection Score of the Decks contained by Quiz.'
                )
            }

            return dispatch({ type: 'quiz/finish' })
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
export const getQuizTime = (store: RootState) => store.quiz.quizTime
export const getQuestionTime = (store: RootState) => store.quiz.questionTime
export const getAnswerTimeFinished = (store: RootState) =>
    store.quiz.answerTimeFinished
export const getisFlippingCard = (store: RootState) => store.quiz.isFlippingCard
export const getRevealAnswerStatus = (store: RootState) =>
    store.quiz.revealAnswer
export const getTotalTime = (store: RootState) => store.quiz.completionTime
export const getDecksData = (store: RootState) => store.quiz.decksData

export default quizSlice.reducer
