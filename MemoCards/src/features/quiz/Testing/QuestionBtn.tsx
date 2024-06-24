import { useAppDispatch } from '@/hooks/useAppDispatch'
import Button from '@/ui/Button'
import {
    finish,
    getAnswerTimeFinished,
    getQuizAnswer,
    getQuizIndex,
    getQuizNumQuestions,
    getQuizQuestion,
    getRevealAnswerStatus,
    nextQuestion,
    revealAnswer,
} from '../quizSlice'
import { CarouselNext } from '@/components/ui/carousel'
import { useAppSelector } from '@/hooks/useAppSelector'

function QuestionBtn() {
    const dispatch = useAppDispatch()
    const answerQuiz = useAppSelector(getQuizAnswer)
    const indexQuiz = useAppSelector(getQuizIndex)
    const numQuestions = useAppSelector(getQuizNumQuestions)
    const question = useAppSelector(getQuizQuestion(indexQuiz))
    const hasFinishedQuestionTime = useAppSelector(getAnswerTimeFinished)
    const revealAnswerStatus = useAppSelector(getRevealAnswerStatus)

    function handleNextQuestion() {
        dispatch(nextQuestion())
    }

    return (
        <div className="mt-auto flex justify-between">
            {question.answers.length < 2 ? (
                <Button
                    variation="accentTertiary"
                    size="medium"
                    onClick={() => dispatch(revealAnswer())}
                >
                    {revealAnswerStatus || hasFinishedQuestionTime
                        ? 'See Question'
                        : 'Reveal Answer'}
                </Button>
            ) : null}
            {answerQuiz !== null ||
            hasFinishedQuestionTime ||
            revealAnswerStatus ? (
                indexQuiz < numQuestions - 1 ? (
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
                )
            ) : null}
        </div>
    )
}

export default QuestionBtn
