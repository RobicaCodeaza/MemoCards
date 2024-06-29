import Button from '@/ui/Button'
import { formatDistanceFromNow, fromToday } from '@/utils/helpers'
import { useNavigate } from 'react-router-dom'

type RecapPlanCardProps = {
    quizName: string
    perfectionScore: number
    toBeTested: string | null
    quizId: number
}

function RecapPlanCard({
    quizName,
    perfectionScore,
    toBeTested,
    quizId,
}: RecapPlanCardProps) {
    const navigate = useNavigate()

    const score =
        perfectionScore <= 25
            ? '25'
            : perfectionScore > 25 && perfectionScore <= 50
              ? '50'
              : perfectionScore > 50 && perfectionScore <= 75
                ? '75'
                : perfectionScore > 75 && perfectionScore <= 100
                  ? '100'
                  : '0'

    console.log(score)

    const glowingShadow = {
        0: '0 0 4px 2px rgba(224, 34, 46, 0.75)',
        25: '0 0 4px 2px rgba(224, 34, 46, 0.75)',
        50: '0 0 4px 2px rgba(251, 110, 119, 0.75)',
        75: '0 0 4px 2px rgba(152, 221, 173, 0.75)',
        100: '0 0 4px 2px rgba(69, 187, 106, 0.75)',
    }

    return (
        <div
            className={`relative flex h-[12rem]  w-[14rem] flex-shrink-0  flex-col justify-center gap-3 rounded-md   border  border-danger-300 bg-picton-blue-50 px-2 py-2 text-mako-grey-500  transition-shadow duration-300 hover:shadow-inner phone:px-4 phone:py-4 tab-port:px-6 tab-port:py-6`}
            style={{ boxShadow: glowingShadow[`${score}`] }}
        >
            <p className="border-b border-mako-grey-100 py-1 text-[1.3rem] font-semibold tracking-wide">
                🧾: <strong>{quizName.toUpperCase()}</strong>
            </p>
            <p className=" border-b border-mako-grey-100 py-1 text-[1.3rem] font-medium tracking-wide">
                ⭐: <strong>{perfectionScore}</strong>p
            </p>
            <p className=" border-b border-mako-grey-100 py-1 text-[1.3rem] font-medium tracking-wide">
                📆:{' '}
                <strong>
                    {toBeTested
                        ? formatDistanceFromNow(toBeTested)
                        : 'No Recap Set'}
                </strong>{' '}
            </p>
            <div className="absolute inset-0 flex items-center justify-center  rounded-md bg-picton-blue-50 opacity-0 shadow-inner transition-opacity duration-300 hover:opacity-100">
                <Button
                    size="tiny"
                    variation="simpleTertiary"
                    onClick={() => navigate(`/quiz/${quizId}`)}
                >
                    Take Quiz
                </Button>
            </div>
        </div>
    )
}

export default RecapPlanCard
