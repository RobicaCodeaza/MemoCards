import { useAppDispatch } from '@/hooks/useAppDispatch'
import Button from '@/ui/Button'
import { newAnswer, nextQuestion } from '../quizSlice'

function QuestionBtn() {
    const dispatch = useAppDispatch()

    function handleNextQuestion() {
        dispatch(nextQuestion())
    }

    return (
        <div className="mt-auto flex justify-between">
            <Button variation="accentTertiary" size="medium">
                Reveal Answer
            </Button>
            <Button
                onClick={handleNextQuestion}
                variation="accentSecondary"
                size="medium"
            >
                Next Question
            </Button>
        </div>
    )
}

export default QuestionBtn
