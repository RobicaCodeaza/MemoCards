import { useAppSelector } from '@/hooks/useAppSelector'
import {
    getAnswerTimeFinished,
    getQuizAnswer,
    getQuizIndex,
    getQuizQuestion,
    newAnswer,
} from '../quizSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'

type TestOptionsProps = {
    indexQuestion: number
}

function TestOptions({ indexQuestion }: TestOptionsProps) {
    const dispatch = useAppDispatch()
    const answerQuiz = useAppSelector(getQuizAnswer)
    const quizIndex = useAppSelector(getQuizIndex)
    const question = useAppSelector(getQuizQuestion(indexQuestion))
    const hasFinishedQuestionTime = useAppSelector(getAnswerTimeFinished)
    console.log(hasFinishedQuestionTime, 'hasfinished')
    const hasAnswered = answerQuiz ? true : false

    return (
        <div className="mb-10 flex flex-col gap-5">
            {question.answers.map((answer, index) => {
                return (
                    <button
                        key={index}
                        className={`block w-full cursor-pointer text-wrap break-words  rounded-full border-2 px-10 py-5 text-left font-sans text-[1.6rem] transition-all duration-300 hover:translate-x-5 hover:border-picton-blue-300 hover:bg-picton-blue-150 disabled:hover:cursor-not-allowed ${index + 1 === answerQuiz ? 'translate-x-10' : ''} ${hasAnswered || hasFinishedQuestionTime ? (index + 1 === question.correctAnswer ? 'border border-chateau-green-300 bg-chateau-green-200 text-chateau-green-700' : 'border-danger-300 bg-danger-200 text-danger-700') : 'border-picton-blue-150 bg-picton-blue-75'} `}
                        onClick={() => dispatch(newAnswer(index + 1))}
                    >
                        {answer}
                    </button>
                )
            })}
        </div>
    )
}

export default TestOptions
