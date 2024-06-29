import Spinner from '@/ui/Spinner'
import { useQuizesAll } from '../quiz/useQuizesAll'
import DecksContribution from './DecksContribution'
import OverallStats from './OverallStats'
import RecapPlan from './RecapPlan'
import Empty from '@/ui/Empty'

function DasboardLayout() {
    const { quizes, count, isLoading } = useQuizesAll()

    if (isLoading) return <Spinner></Spinner>
    if (!quizes) return <Empty resource="Quizes"></Empty>

    const quizesTested = quizes?.filter((quiz) => quiz.lastTested !== null)
    return (
        <div className="grid w-full grid-cols-[1fr_1fr] grid-rows-[min-content_auto] gap-20">
            <RecapPlan quizesTested={quizesTested}></RecapPlan>
            <OverallStats></OverallStats>
            <DecksContribution></DecksContribution>
        </div>
    )
}

export default DasboardLayout
