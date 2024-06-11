import { useAppDispatch } from '@/hooks/useAppDispatch'
import Button from '@/ui/Button'
import {
    finish,
    getQuizAnswer,
    getQuizIndex,
    getQuizNumQuestions,
    getQuizQuestion,
    nextQuestion,
} from '../quizSlice'
import { CarouselNext } from '@/components/ui/carousel'
import { useAppSelector } from '@/hooks/useAppSelector'

function QuestionBtn() {
    const dispatch = useAppDispatch()
    const answerQuiz = useAppSelector(getQuizAnswer)
    const indexQuiz = useAppSelector(getQuizIndex)
    const numQuestions = useAppSelector(getQuizNumQuestions)
    const question = useAppSelector(getQuizQuestion(indexQuiz))
    console.log(question)

    function handleNextQuestion() {
        dispatch(nextQuestion())
    }

    return (
        <div className="mt-auto flex justify-between">
            {question.answers.length < 2 ? (
                <Button variation="accentTertiary" size="medium">
                    Reveal Answer
                </Button>
            ) : null}
            {answerQuiz === null ? null : indexQuiz < numQuestions - 1 ? (
                <CarouselNext className="ml-auto">
                    <Button
                        variation="accentSecondary"
                        size="medium"
                        onClick={() => dispatch(nextQuestion())}
                    >
                        Next Question
                    </Button>
                </CarouselNext>
            ) : (
                <>
                    <span></span>
                    <Button
                        variation="accentSecondary"
                        size="medium"
                        onClick={() => dispatch(finish())}
                    >
                        Finish
                    </Button>
                </>
            )}
        </div>
    )
}

export default QuestionBtn
