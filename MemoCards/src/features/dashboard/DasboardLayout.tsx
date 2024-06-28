import Spinner from '@/ui/Spinner'
import { useQuizesAll } from '../quiz/useQuizesAll'
import DecksContribution from './DecksContribution'
import OverallStats from './OverallStats'
import RecapPlan from './RecapPlan'

function DasboardLayout() {
    const { quizes, count, isLoading } = useQuizesAll()

    if (isLoading) return <Spinner></Spinner>

    const quizesTested = quizes?.filter((quiz) => quiz.lastTested !== null)
    console.log(quizesTested)
    return (
        <div className="grid w-full grid-cols-[1fr_1fr] grid-rows-[min-content_auto] gap-20">
            <RecapPlan quizesTested={quizesTested}></RecapPlan>
            <OverallStats></OverallStats>
            <DecksContribution></DecksContribution>
        </div>
    )
}

export default DasboardLayout
