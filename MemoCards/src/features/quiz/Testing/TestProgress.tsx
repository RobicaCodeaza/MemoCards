import { Progress } from '@/components/ui/progress'
import { useAppSelector } from '@/hooks/useAppSelector'
import {
    getQuizAnswer,
    getQuizIndex,
    getQuizNumQuestions,
    getQuizPerfectionScore,
} from '../quizSlice'

function TestProgress() {
    const index = useAppSelector(getQuizIndex)
    const answer = useAppSelector(getQuizAnswer)
    const questionsNum = useAppSelector(getQuizNumQuestions)
    const perfectionScore = useAppSelector(getQuizPerfectionScore)

    return (
        <div className="mb-10 grid  grid-cols-[auto_auto] justify-between gap-5 text-[1.6rem] text-mako-grey-500">
            <Progress
                className="grid-col col-start-1 col-end-[-1] h-6 w-full  rounded-xl border border-neon-carrot-300 bg-mako-grey-100"
                max={questionsNum}
                value={((index + Number(answer !== null)) / questionsNum) * 100}
            ></Progress>
            <div>
                Question <strong>{index + 1}</strong>/{questionsNum}
            </div>
            <p>
                Points <strong>{perfectionScore}</strong>/ {questionsNum}
            </p>
        </div>
    )
}

export default TestProgress
