import DecksContribution from './DecksContribution'
import OverallStats from './OverallStats'
import RecapPlan from './RecapPlan'

function DasboardLayout() {
    return (
        <div className="grid w-full grid-cols-[1fr_1fr] grid-rows-[min-content_auto] gap-20">
            <RecapPlan></RecapPlan>
            <OverallStats></OverallStats>
            <DecksContribution></DecksContribution>
        </div>
    )
}

export default DasboardLayout
