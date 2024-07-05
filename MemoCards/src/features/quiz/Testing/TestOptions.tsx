import { useAppSelector } from '@/hooks/useAppSelector'
import {
    getAnswerTimeFinished,
    getQuizAnswer,
    getQuizQuestion,
    getRevealAnswerStatus,
    getisFlippingCard,
    newAnswer,
} from '../quizSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { ComponentPropsWithoutRef, useState } from 'react'
import StarRating from '@/ui/StarRating'

type TestOptionsProps = {
    indexQuestion: number
} & ComponentPropsWithoutRef<'div'>

function TestOptions({ indexQuestion, ...props }: TestOptionsProps) {
    const [ratingFlippedCard, setRatingFlippedCard] = useState<number>(-1)
    const dispatch = useAppDispatch()
    const answerQuiz = useAppSelector(getQuizAnswer)
    const question = useAppSelector(getQuizQuestion(indexQuestion))
    const hasFinishedQuestionTime = useAppSelector(getAnswerTimeFinished)
    const isFlippingCard = useAppSelector(getisFlippingCard)
    const revealAnswerStatus = useAppSelector(getRevealAnswerStatus)
    const hasAnswered = answerQuiz ? true : false

    function handleRatingFlippingCard(rating: number) {
        setRatingFlippedCard(rating)
        dispatch(
            newAnswer({
                type: 'flippingCard',
                value: rating / 10,
            })
        )
    }

    return (
        <div
            className={`mb-10 flex h-full flex-col justify-center gap-5 ${isFlippingCard ? ' transition-all duration-300' : ''}  ${isFlippingCard ? (revealAnswerStatus || hasFinishedQuestionTime ? 'rotate-negative-y-180' : 'hidden') : ''}`}
            {...props}
        >
            {question.answers.map((answer, index) => {
                return (
                    <>
                        {isFlippingCard ? (
                            <div
                                key={index}
                                className="flex h-full flex-col justify-between"
                            >
                                <div className="mt-auto block w-full text-wrap break-words rounded-full bg-chateau-green-200 px-10 py-5">
                                    {answer}
                                </div>
                                <div className="mt-auto flex flex-col items-center gap-4 self-center">
                                    <p className="text-[1.4rem] font-medium uppercase tracking-wide text-neon-carrot-700/75">
                                        Understanding of this Question
                                    </p>
                                    <StarRating
                                        // onClick={handleRatingFlippingCard}
                                        maxRating={10}
                                        color="#fe902d"
                                        defaultRating={ratingFlippedCard}
                                        size={24}
                                        className="flex flex-col gap-1 phone:flex-row phone:gap-4 "
                                        onSetRating={handleRatingFlippingCard}
                                        messages={[
                                            '0%',
                                            '10%',
                                            '20%',
                                            '30%',
                                            '40%',
                                            '50%',
                                            '60%',
                                            '70%',
                                            '80%',
                                            '90%',
                                            '100%',
                                        ]}
                                    ></StarRating>
                                </div>
                            </div>
                        ) : (
                            <button
                                key={index}
                                className={`block w-full cursor-pointer text-wrap break-words  rounded-full border-2 px-10 py-5 text-left font-sans text-[1.4rem] transition-all duration-300 hover:translate-x-5 hover:border-picton-blue-300 hover:bg-picton-blue-150 disabled:hover:cursor-not-allowed phone:text-[1.6rem] ${index + 1 === answerQuiz ? 'translate-x-10' : ''} ${hasAnswered || hasFinishedQuestionTime ? (index + 1 === question.correctAnswer ? 'border border-chateau-green-300 bg-chateau-green-200 text-chateau-green-700' : 'border-danger-300 bg-danger-200 text-danger-700') : 'border-picton-blue-150 bg-picton-blue-75'} `}
                                disabled={
                                    hasFinishedQuestionTime || hasAnswered
                                }
                                onClick={() =>
                                    dispatch(
                                        newAnswer({
                                            type: 'normalQuestion',
                                            value: index + 1,
                                        })
                                    )
                                }
                            >
                                {answer}
                            </button>
                        )}
                    </>
                )
            })}
        </div>
    )
}

export default TestOptions
