import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { GrScorecard } from 'react-icons/gr'
import { PiHourglassSimpleLowDuotone } from 'react-icons/pi'
import {
    RiProgress1Line,
    RiProgress2Line,
    RiProgress3Line,
    RiProgress4Line,
    RiProgress5Line,
    RiProgress6Line,
    RiProgress7Line,
    RiProgress8Line,
} from 'react-icons/ri'
import Button from '@/ui/Button'
import Heading from '@/ui/Heading'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import {
    getDecksData,
    getQuizNumQuestions,
    getQuizPerfectionScore,
    getTotalTime,
    restart,
} from '../quizSlice'
import { useAppSelector } from '@/hooks/useAppSelector'

function FinishScreen() {
    const dispatch = useAppDispatch()
    const quizPerfectionScore = useAppSelector(getQuizPerfectionScore)
    const completionTime = useAppSelector(getTotalTime)
    const questionsNum = useAppSelector(getQuizNumQuestions)
    const decksData = useAppSelector(getDecksData)
    console.log(decksData)

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
                        {quizPerfectionScore < 25 && (
                            <div className="flex items-center gap-2">
                                <RiProgress1Line className="h-9 w-9 text-danger-600"></RiProgress1Line>
                            </div>
                        )}
                        {quizPerfectionScore === 25 && (
                            <div className="flex items-center gap-2">
                                <RiProgress2Line className="h-9 w-9 text-danger-500"></RiProgress2Line>
                            </div>
                        )}
                        {quizPerfectionScore < 50 &&
                            quizPerfectionScore > 25 && (
                                <div className="flex items-center gap-2">
                                    <RiProgress3Line className="h-9 w-9 text-danger-400"></RiProgress3Line>
                                </div>
                            )}
                        {quizPerfectionScore === 50 && (
                            <div className="flex items-center gap-2">
                                <RiProgress4Line className="h-9 w-9 text-danger-300"></RiProgress4Line>
                            </div>
                        )}
                        {quizPerfectionScore < 75 &&
                            quizPerfectionScore > 50 && (
                                <div className="flex items-center gap-2">
                                    <RiProgress5Line className="h-9 w-9 text-chateau-green-300"></RiProgress5Line>
                                </div>
                            )}
                        {quizPerfectionScore === 75 && (
                            <div className="flex items-center gap-2">
                                <RiProgress6Line className="h-9 w-9 text-chateau-green-400"></RiProgress6Line>
                            </div>
                        )}
                        {quizPerfectionScore < 100 &&
                            quizPerfectionScore > 75 && (
                                <div className="flex items-center gap-2">
                                    <RiProgress7Line className="h-9 w-9 text-chateau-green-500"></RiProgress7Line>
                                </div>
                            )}

                        {quizPerfectionScore === 100 && (
                            <div className="flex items-center gap-2">
                                <RiProgress8Line className="h-9 w-9 text-chateau-green-600"></RiProgress8Line>
                            </div>
                        )}
                        <span className="tracking-wide text-picton-blue-800">
                            Perfection Score:{' '}
                        </span>
                        <span>
                            {(quizPerfectionScore * 100) / questionsNum}/100
                        </span>
                        <span className="text-[1.6rem]font-semibold text-picton-blue-600"></span>
                    </p>
                    <p className="flex items-center gap-3 text-[1.7rem] font-medium ">
                        <span>
                            <PiHourglassSimpleLowDuotone className="h-9 w-9 text-picton-blue-500"></PiHourglassSimpleLowDuotone>
                        </span>
                        <span className="text-text-chateau-green-800 tracking-wide">
                            Completion Time:{' '}
                        </span>

                        <span className="text-[1.6rem]font-semibold text-text-chateau-green-600">
                            {completionTime < 60 && (
                                <span>{completionTime} seconds</span>
                            )}
                            {completionTime > 60 && (
                                <>
                                    <span>{completionTime / 60}min</span>
                                    {completionTime % 60 > 0 && (
                                        <span>
                                            {completionTime % 60}seconds
                                        </span>
                                    )}
                                </>
                            )}
                        </span>
                    </p>
                </div>
                <Button
                    variation="accentSecondary"
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
