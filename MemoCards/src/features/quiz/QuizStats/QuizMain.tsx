import Empty from '@/ui/Empty'
import QuizGrid from './QuizGrid'
import QuizSummary from './QuizSummary'
import { useQuizesPaginated } from '../useQuizesPaginated'
import Spinner from '@/ui/Spinner'
import { useSearchParams } from 'react-router-dom'
import { Tables } from '@/types/database.types'
import { useQuizesSummary } from '../useQuizesSummary'

function QuizMain() {
    const {
        dataQuiz: quizesSummary,
        count: countSummary,
        dataExam: examIn,
    } = useQuizesSummary()
    const { quizes, count, isLoading } = useQuizesPaginated()
    const [searchParams] = useSearchParams()
    if (isLoading) return <Spinner></Spinner>

    if (!quizes?.length || !count)
        return (
            <>
                <QuizSummary
                    averageTime={0}
                    quizesNum={0}
                    future_exam_in_days={examIn?.future_exam_in_days ?? 0}
                ></QuizSummary>
                <Empty resource="quiz"></Empty>
            </>
        )

    // 2.Sort
    const sortBy = searchParams.get('sortBy') ?? 'quizName-asc'
    const [field, direction] = sortBy.split('-') as [
        keyof Tables<'Quizes'>,
        'asc' | 'desc',
    ]

    const modifier = direction === 'asc' ? 1 : -1

    const sortedQuizes = quizes?.sort((a, b) => {
        const aValue = a[field]
        const bValue = b[field]
        if (aValue === null || bValue === null) {
            return 0 // Handle null or undefined values
        }

        if (
            field === 'lastTested' &&
            typeof aValue === 'string' &&
            typeof bValue === 'string'
        ) {
            // Handle date strings
            const aDate = new Date(aValue)
            const bDate = new Date(bValue)
            return modifier * (aDate.getTime() - bDate.getTime())
        } else if (typeof aValue === 'string' && typeof bValue === 'string') {
            return modifier * aValue.localeCompare(bValue)
        } else {
            const aNumber = aValue as number
            const bNumber = bValue as number
            return modifier * (aNumber - bNumber)
        }
    })

    const quizesNum = countSummary ? countSummary : 0
    const quizesWithTime = quizesSummary?.filter(
        (quiz) => quiz.completionTime !== null
    )
    const averageTime = quizesWithTime?.reduce((acc, curr) => {
        return (acc + curr.completionTime!) / quizesWithTime.length
    }, 0)
    return (
        <>
            <QuizSummary
                quizesNum={quizesNum}
                averageTime={averageTime ? averageTime : 0}
                future_exam_in_days={examIn?.future_exam_in_days ?? 0}
            ></QuizSummary>
            <QuizGrid count={count} quizes={sortedQuizes}></QuizGrid>
        </>
    )
}

export default QuizMain
