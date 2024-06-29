import { Tables } from '@/types/database.types'
import RecapPlanCard from './RecapPlan/RecapPlanCard'
import Heading from '@/ui/Heading'
import Button from '@/ui/Button'
import { useNavigate } from 'react-router-dom'
import Empty from '@/ui/Empty'

type RecapPlanProps = {
    quizesTested: Tables<'Quizes'>[]
    settings: Tables<'Settings'> | undefined
}

function RecapPlan({ quizesTested, settings }: RecapPlanProps) {
    const navigate = useNavigate()
    const areRecapWeeksDefined =
        settings?.recap_weekstime_p25 &&
        settings?.recap_weekstime_p50 &&
        settings?.recap_weekstime_p75 &&
        settings?.recap_weekstime_p100
    console.log(quizesTested)

    return (
        <div className="col-span-full flex flex-col gap-7">
            <Heading as="h4">Recap Plan</Heading>
            <div className="flex gap-12 overflow-x-scroll rounded-lg border border-mako-grey-150 bg-picton-blue-75 px-4 py-4 phone:px-6 phone:py-6 tab-port:px-8 tab-port:py-8 tab-land:px-10 tab-land:py-10 particular-small-laptop:px-12 particular-small-laptop:py-12">
                {areRecapWeeksDefined ? (
                    quizesTested.length > 0 ? (
                        quizesTested.map((el) => {
                            return (
                                <RecapPlanCard
                                    key={el.id}
                                    quizName={el.quizName}
                                    perfectionScore={
                                        el.perfectionScore?.at(-1) ?? 0
                                    }
                                    toBeTested={el.toBeTested}
                                ></RecapPlanCard>
                            )
                        })
                    ) : (
                        <div className="flex w-full items-center justify-center gap-6 text-mako-grey-600">
                            <Empty resource="Tested Quizes"></Empty>
                            <Button
                                variation="simpleSecondary"
                                size="small"
                                onClick={() => navigate('/quiz')}
                            >
                                Take Quiz
                            </Button>
                        </div>
                    )
                ) : (
                    <span className="flex w-full items-center justify-center gap-6 text-mako-grey-600">
                        No Recap Settings Defined. Please define them in the
                        section.
                        <Button
                            variation="subtleGrey"
                            size="small"
                            onClick={() => navigate('/settings')}
                        >
                            Set Recap Plan
                        </Button>
                    </span>
                )}{' '}
            </div>
        </div>
    )
}

export default RecapPlan
