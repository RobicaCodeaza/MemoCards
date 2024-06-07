import { useAppSelector } from '@/hooks/useAppSelector'
import { getQuiz, newAnswer } from '../quizSlice'
import { useAppDispatch } from '@/hooks/useAppDispatch'

function TestOptions() {
    const dispatch = useAppDispatch()
    const quiz = useAppSelector(getQuiz)
    const question = quiz.questions[quiz.index]
    const hasAnswered = quiz.answer ? true : false

    return (
        <div className="mb-10 flex flex-col gap-5">
            {question.answers.map((answer, index) => {
                return (
                    <button
                        key={index}
                        className={`block w-full cursor-pointer rounded-full border-2 border-picton-blue-150 bg-picton-blue-75 px-10 py-5 text-left font-sans text-[1.6rem] transition-all duration-300 hover:translate-x-5 hover:border-picton-blue-200 hover:bg-picton-blue-100 disabled:hover:cursor-not-allowed ${index === quiz.answer ? 'translate-x-10' : ''} ${hasAnswered ? (index === question.correctAnswer ? 'border-2 border-chateau-green-200 bg-chateau-green-300 text-chateau-green-700' : 'border-2 border-danger-200 bg-danger-100 text-danger-700') : ''} `}
                        onClick={() => dispatch(newAnswer(index))}
                    >
                        {answer}
                    </button>
                )
            })}
        </div>
    )
}

export default TestOptions
