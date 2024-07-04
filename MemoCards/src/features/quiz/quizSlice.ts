import { Tables } from '@/types/database.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import supabase from '../../services/supabase'
import { RootState, store } from '@/services/store'
import toast from 'react-hot-toast'
import { fromThisDay, fromToday } from '@/utils/helpers'
import { getRecapSettings } from '@/services/apiSettings'
import { UserType } from '@/ui/ProtectedRoute'
import { getQuizById, updateQuizesRecapPlan } from '@/services/apiQuiz'

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
            state.status = 'ready'
            state.questions = action.payload.questions
            state.isFlippingCard = false
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
            state.index = 0
            state.isFlippingCard =
                state.questions[state.index].answers.length > 1 ? false : true
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
            state.decksData = decksData
            state.index = 0
            state.isFlippingCard =
                state.questions[state.index].answers.length > 1 ? false : true
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

            // Getting Settings For To Be Tested Time
            const user = JSON.parse(localStorage.getItem('user')!) as UserType
            const settings = await getRecapSettings(user.user_id)

            //The Perfection Score of the quiz
            const perfectionScoreTotal =
                quiz.perfectionScore + quiz.questionPoints
            const perfectionScoreQuiz = Number(
                ((perfectionScoreTotal * 100) / quiz.questions.length).toFixed(
                    1
                )
            )

            //Getting Actual Score Interval for the Recap Interval
            const score =
                perfectionScoreQuiz <= 25
                    ? '25'
                    : perfectionScoreQuiz > 25 && perfectionScoreQuiz <= 50
                      ? '50'
                      : perfectionScoreQuiz > 50 && perfectionScoreQuiz <= 75
                        ? '75'
                        : perfectionScoreQuiz > 75 && perfectionScoreQuiz <= 100
                          ? '100'
                          : '0'

            const typeOfRecap =
                `recap_weekstime_p${score}` as keyof Tables<'Settings'>
            const daysToBeTested = (settings?.[typeOfRecap] as number) * 7

            //Setting The ToBeTested time based on perfectionScore
            const toBeTested = fromThisDay(
                daysToBeTested,
                fromToday(0, 'yes'),
                'endOfDay'
            )

            //Updating Quiz
            const { error: errorUpdatingQuiz } = await supabase.rpc(
                'append_updateddata_quiz',
                {
                    row_id: quiz.quizId,
                    new_perfection_score: perfectionScoreQuiz,
                    new_last_tested: fromToday(0, 'yes'),
                    new_to_be_tested: toBeTested,
                    new_completion_time: quiz.completionTime,
                }
            )

            if (errorUpdatingQuiz) {
                throw new Error('Error updating Quiz Data.')
            }

            //Updating Decks Perfection Score
            const decksEdited = quiz.decksData.map((el) => el.deckId)
            const { data, error: errorGettingDecksTested } = await supabase
                .from('Decks')
                .select('*')
                .in('id', decksEdited)
            // console.log('data', quiz.decksData)
            if (errorGettingDecksTested) {
                throw new Error('Error getting data of the decks.')
            }

            const updates = data.map((el) => {
                const deckToAdd = quiz.decksData.filter(
                    (deckData) => deckData.deckId === el.id
                )
                const perfectionScoreToAdd =
                    deckToAdd[0].perfectionScore.at(-1) !== 0
                        ? (deckToAdd[0].perfectionScore.at(-1)! * 100) /
                          deckToAdd[0].numQuestions
                        : 0

                const perfectionScore = el.perfectionScore
                    ? ([
                          ...el.perfectionScore,
                          Number(perfectionScoreToAdd.toFixed(1)),
                      ] as number[])
                    : ([perfectionScoreToAdd] as number[])

                const dateToAdd = fromToday(0, 'yes')
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
