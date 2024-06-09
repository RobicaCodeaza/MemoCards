import { useAppSelector } from '@/hooks/useAppSelector'
import {
    getAnswerTimeFinished,
    getQuestionTime,
    getQuiz,
    getQuizAnswer,
    getQuizRemainingQuestionTime,
    getQuizRemainingQuizTime,
    getQuizTime,
    tick,
} from '../quizSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useCallback, useEffect, useRef } from 'react'
import { AppDispatch } from '@/services/store'

function TimerTest() {
    const dispatch = useAppDispatch()
    const quizTime = useAppSelector(getQuizTime)
    const questionTime = useAppSelector(getQuestionTime)
    const answer = useAppSelector(getQuizAnswer)
    const quizRemaining = useAppSelector(getQuizRemainingQuizTime)
    const questionRemaining = useAppSelector(getQuizRemainingQuestionTime)
    const answerTimeFinished = useAppSelector(getAnswerTimeFinished)

    const timerQuiz = quizTime
    const timerQuestion = questionTime
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

    const minQuiz = quizRemaining ? Math.floor(quizRemaining / 60) : 0
    const secondsQuiz = quizRemaining ? quizRemaining % 60 : 0

    const minQuestion = questionRemaining
        ? Math.floor(questionRemaining / 60)
        : 0
    const secondsQuestion = questionRemaining ? questionRemaining % 60 : 0

    const startInterval = useCallback(() => {
        intervalIdRef.current = setInterval(() => {
            dispatch(tick('secondsRemainingQuestion'))
        }, 1000)
    }, [dispatch])

    const clearExistingInterval = useCallback(() => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current)
            intervalIdRef.current = null
        }
    }, [])

    // const pauseInterval = () => {
    //     clearExistingInterval()
    //     setIsPaused(true)
    // }

    // const resumeInterval = () => {
    //     if (isPaused) {
    //         startInterval()
    //         setIsPaused(false)
    //     }
    // }

    useEffect(
        function () {
            let id: NodeJS.Timeout | undefined
            if (timerQuiz)
                id = setInterval(function () {
                    dispatch(tick('secondsRemainingQuiz'))
                }, 1000)
            else {
                if (typeof id !== 'undefined') clearInterval(id)
            }
            return () => {
                if (id) return clearInterval(id)
            }
        },
        [dispatch, timerQuiz]
    )
    useEffect(
        function () {
            if (answer === null && !answerTimeFinished) {
                startInterval()
            } else clearExistingInterval()
            return () => clearExistingInterval()
        },
        [answer, startInterval, clearExistingInterval, answerTimeFinished]
    )

    return (
        <div className="flex justify-between">
            <div
                className={`rounded-md border-2  px-6 py-3 text-[1.4rem]  ${timerQuestion ? 'border-mako-grey-200 text-mako-grey-400' : 'border-mako-grey-100 text-mako-grey-300'} flex items-center gap-1`}
            >
                <span className="text-[1.2rem] uppercase tracking-wider text-mako-grey-500">
                    Question Time:{' '}
                </span>
                {minQuestion < 10 && '0'}
                {minQuestion}:{secondsQuestion < 10 && '0'}
                {secondsQuestion}
            </div>
            <div
                className={`rounded-md border-2  px-6 py-3 text-[1.4rem] ${timerQuiz ? 'border-mako-grey-200 text-mako-grey-400' : 'border-mako-grey-100 text-mako-grey-300'} flex items-center gap-1`}
            >
                <span className="text-[1.2rem] uppercase tracking-wider text-mako-grey-500">
                    Quiz Time:{' '}
                </span>
                {minQuiz < 10 && '0'}
                {minQuiz}:{secondsQuiz < 10 && '0'}
                {secondsQuiz}
            </div>
        </div>
    )
}

export default TimerTest
