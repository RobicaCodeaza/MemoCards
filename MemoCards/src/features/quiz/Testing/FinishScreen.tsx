import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { GrScorecard } from 'react-icons/gr'
import { PiHourglassSimpleLowDuotone } from 'react-icons/pi'
import Button from '@/ui/Button'
import Heading from '@/ui/Heading'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { getQuizPerfectionScore, restart } from '../quizSlice'
import { useAppSelector } from '@/hooks/useAppSelector'
function FinishScreen() {
    const dispatch = useAppDispatch()
    const quizPerfectionScore = useAppSelector(getQuizPerfectionScore)

    return (
        <div className="flex h-full flex-col gap-24">
            <div className="h-1/4 tab-land:h-1/3 particular-small-laptop:h-1/2">
                <DotLottieReact
                    autoplay
                    src="/finishExamAnim.lottie"
                    loop
                    // width={'100%'}
                    // height={'50%'}
                    style={{ objectFit: 'contain' }}
                    autoResizeCanvas
                ></DotLottieReact>
            </div>
            <div className="flex flex-col items-center gap-6">
                <Heading as="h2">
                    Congratulations! You finished your Quiz.
                </Heading>
                <div className="mb-2 mt-2 flex flex-col gap-4 rounded-md border border-mako-grey-100 bg-picton-blue-75 px-16 py-8">
                    <p className="flex items-center gap-3 text-[1.7rem] font-medium ">
                        <span>
                            <GrScorecard className="h-8 w-9 text-picton-blue-500"></GrScorecard>
                        </span>
                        <span className="tracking-wide text-picton-blue-800">
                            Perfection Score:{' '}
                        </span>

                        <span className="text-[1.6rem]font-semibold text-picton-blue-600">
                            {quizPerfectionScore}/100
                        </span>
                    </p>
                    <p className="flex items-center gap-3 text-[1.7rem] font-medium ">
                        <span>
                            <PiHourglassSimpleLowDuotone className="h-9 w-9 text-chateau-green-500"></PiHourglassSimpleLowDuotone>
                        </span>
                        <span className="tracking-wide text-chateau-green-800">
                            Completion Time:{' '}
                        </span>

                        <span className="text-[1.6rem]font-semibold text-chateau-green-600">
                            23 min
                        </span>
                    </p>
                </div>
                <Button
                    variation="simplePrimary"
                    size="medium"
                    onClick={() => dispatch(restart())}
                >
                    Restart Quiz
                </Button>
            </div>
        </div>
    )
}

export default FinishScreen
