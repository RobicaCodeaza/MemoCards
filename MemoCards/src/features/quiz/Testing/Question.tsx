import { useAppSelector } from '@/hooks/useAppSelector'
import {
    getAnswerTimeFinished,
    getQuizQuestions,
    getRevealAnswerStatus,
    getisFlippingCard,
} from '../quizSlice'
import Heading from '@/ui/Heading'
import TestOptions from './TestOptions'
import { CarouselItem } from '@/components/ui/carousel'

function Question() {
    const questions = useAppSelector(getQuizQuestions)
    const isFlippingCard = useAppSelector(getisFlippingCard)
    const revealAnswerStatus = useAppSelector(getRevealAnswerStatus)
    const hasFinishedQuestionTime = useAppSelector(getAnswerTimeFinished)

    // const question = questions[index]

    return (
        <>
            {questions.map((question, index) => (
                <CarouselItem
                    key={index}
                    className={`ml-2 mr-2 flex  h-[35rem] flex-col justify-center gap-6 rounded-lg border border-chateau-green-300 px-12 py-10 shadow-md transition-all duration-300 phone:h-[30rem] tab-port:h-[30rem] tab-land:h-[32.5rem] particular-small-laptop:h-[32.5rem] ${isFlippingCard ? (revealAnswerStatus === true || hasFinishedQuestionTime ? 'rotate-y-180 ' : '') : ''}`}
                >
                    {isFlippingCard &&
                    (revealAnswerStatus === true ||
                        hasFinishedQuestionTime) ? null : (
                        <Heading as="h4">{question.question}</Heading>
                    )}
                    <TestOptions indexQuestion={index}></TestOptions>
                </CarouselItem>
            ))}
        </>
    )
}

export default Question
