import Empty from '@/ui/Empty'
import QuizGrid from './QuizGrid'
import QuizSummary from './QuizSummary'
import { useQuizesPaginated } from './useQuizesPaginated'
import Spinner from '@/ui/Spinner'

function QuizMain() {
    const { quizes, count, isLoading } = useQuizesPaginated()
    if (isLoading) return <Spinner></Spinner>

    if (
        !quizes?.length ||
        quizes === undefined ||
        count === undefined ||
        count === null
    )
        return <Empty resource="Quizes"></Empty>

    return (
        <>
            <QuizSummary></QuizSummary>
            <QuizGrid count={count} quizes={quizes}></QuizGrid>
        </>
    )
}

export default QuizMain
