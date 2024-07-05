import { Tables } from '@/types/database.types'
import RecapPlanCard from './RecapPlan/RecapPlanCard'

type RecapPlanProps = {
    recentQuizesAndCardsTested:
        | (Tables<'Quizes'> & { cards: Tables<'Card'>[] })[]
        | undefined
}

function RecapPlan({ recentQuizesAndCardsTested }: RecapPlanProps) {
    recentQuizesAndCardsTested?.sort((a, b) => {
        return a.perfectionScore!.at(-1)! - b.perfectionScore!.at(-1)!
    })

    return (
        <div className="flex flex-col gap-7 tab-land:w-half-minus-arrows">
            <div className="flex gap-12 overflow-x-scroll rounded-lg border border-mako-grey-150 bg-picton-blue-75 px-4 py-4 phone:px-6 phone:py-6 tab-port:px-8 tab-port:py-8 tab-land:px-10 tab-land:py-10 particular-small-laptop:px-12 particular-small-laptop:py-12">
                {recentQuizesAndCardsTested?.map((el) => {
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
