import { useAppSelector } from '@/hooks/useAppSelector'
import { getQuiz } from '../quizSlice'
import Empty from '@/ui/Empty'

function TestingGrid() {
    const quiz = useAppSelector(getQuiz)

    if (quiz.questions.length === 0)
        return <Empty resource="Decks/Cards for the coresponding Quiz"></Empty>

    return <div>Grid</div>
}

export default TestingGrid
