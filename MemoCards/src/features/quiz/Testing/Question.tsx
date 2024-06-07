import { useAppSelector } from '@/hooks/useAppSelector'
import { getQuiz } from '../quizSlice'
import Heading from '@/ui/Heading'
import TestOptions from './TestOptions'

function Question() {
    const quiz = useAppSelector(getQuiz)
    const question = quiz.questions[quiz.index]

    return (
        <div className="flex h-2/3 flex-col gap-10 rounded-lg border border-chateau-green-300 px-16 py-10 shadow-md">
            <Heading as="h4">{question.question}</Heading>
            <TestOptions></TestOptions>
        </div>
    )
}

export default Question
