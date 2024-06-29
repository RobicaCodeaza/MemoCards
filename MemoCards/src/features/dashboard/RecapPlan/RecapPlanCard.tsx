import Button from '@/ui/Button'
import { formatDistanceFromNow, fromToday } from '@/utils/helpers'

type RecapPlanCardProps = {
    quizName: string
    perfectionScore: number
    lastTested: string
}

function RecapPlanCard({
    quizName,
    perfectionScore,
    lastTested,
}: RecapPlanCardProps) {
    // console.log(formatDistanceFromNow(lastTested))
    // console.log('From', fromToday(2))

    return (
        <div
            className=" relative flex h-[12rem]  w-[14rem] flex-shrink-0  flex-col justify-center gap-3 rounded-md   border  border-danger-300 bg-picton-blue-50 px-2 py-2 text-mako-grey-500 shadow-glowing-border-p50 transition-shadow duration-300 hover:shadow-inner phone:px-4 phone:py-4 tab-port:px-6 tab-port:py-6"
            // style={{ background: 'linear-gradient(135deg,#fb6e77,#fea3a9)' }}
        >
            <p className="border-b border-mako-grey-100 py-1 text-[1.3rem] font-semibold tracking-wide">
                🧾: <strong>{quizName}</strong>
            </p>
            <p className=" border-b border-mako-grey-100 py-1 text-[1.3rem] font-medium tracking-wide">
                ⭐: <strong>{perfectionScore}</strong>p
            </p>
            <p className=" border-b border-mako-grey-100 py-1 text-[1.3rem] font-medium tracking-wide">
                📆: in <strong>{lastTested}</strong> days
            </p>
            <div className="absolute inset-0 flex items-center justify-center  rounded-md bg-picton-blue-50 opacity-0 shadow-inner transition-opacity duration-300 hover:opacity-100">
                <Button size="tiny" variation="simpleTertiary">
                    Take Quiz
                </Button>
            </div>
        </div>
    )
}

export default RecapPlanCard
