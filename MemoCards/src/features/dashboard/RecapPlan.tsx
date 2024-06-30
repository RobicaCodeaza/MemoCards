import { Tables } from '@/types/database.types'
import RecapPlanCard from './RecapPlan/RecapPlanCard'
import Heading from '@/ui/Heading'

// Define the quizesTested type

type RecapPlanProps = { quizesTested: Tables<'Quizes'>[] }

function RecapPlan({ quizesTested }: RecapPlanProps) {
    quizesTested?.sort((a, b) => {
        return a.perfectionScore!.at(-1)! - b.perfectionScore!.at(-1)!
    })

    return (
        <div className="col-span-full flex flex-col gap-7">
            <Heading as="h4">Recap Plan</Heading>
            <div className="flex gap-12 overflow-x-scroll rounded-lg border border-mako-grey-150 bg-picton-blue-75 px-4 py-4 phone:px-6 phone:py-6 tab-port:px-8 tab-port:py-8 tab-land:px-10 tab-land:py-10 particular-small-laptop:px-12 particular-small-laptop:py-12">
                {quizesTested?.map((el) => {
                    return (
                        <RecapPlanCard
                            key={el.id}
                            quizName={el.quizName}
                            perfectionScore={el.perfectionScore?.at(-1) ?? 0}
                            quizId={el.id}
                            toBeTested={el.toBeTested}
                        ></RecapPlanCard>
                    )
                })}{' '}
            </div>
        </div>
    )
}

export default RecapPlan
