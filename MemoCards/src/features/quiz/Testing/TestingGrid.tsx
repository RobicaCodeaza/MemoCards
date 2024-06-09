import { useAppSelector } from '@/hooks/useAppSelector'
import {
    getQuizAnswer,
    getQuizIndex,
    getQuizNumQuestions,
    getQuizQuestions,
    getQuizStatus,
} from '../quizSlice'
import Empty from '@/ui/Empty'
import Spinner from '@/ui/Spinner'
import { Progress } from '@/components/ui/progress'
import Question from './Question'
import StartScreen from './StartScreen'
import TestProgress from './TestProgress'
import TimerTest from './TimerTest'
import QuestionBtn from './QuestionBtn'
import { Carousel, CarouselContent } from '@/components/ui/carousel'

function TestingGrid() {
    const status = useAppSelector(getQuizStatus)
    const questionNum = useAppSelector(getQuizNumQuestions)

    if (questionNum === 0)
        return <Empty resource="Decks/Cards for the coresponding Quiz"></Empty>

    return (
        <main className="ml-auto mr-auto  flex h-[72.5rem] w-[100rem]   max-w-[120rem] flex-col gap-8 rounded-xl border-2 border-mako-grey-100 bg-picton-blue-50 px-20 py-20">
            {status === 'loading' && <Spinner></Spinner>}
            {/* {status === 'error' && <Error></Error>} */}
            {status === 'ready' && <StartScreen></StartScreen>}
            {status === 'active' && (
                <>
                    <TimerTest></TimerTest>
                    <TestProgress></TestProgress>
                    <Carousel className="flex h-full flex-col ">
                        <CarouselContent className=" p-2">
                            <Question></Question>
                        </CarouselContent>
                        <QuestionBtn></QuestionBtn>
                    </Carousel>
                </>
            )}
            {/* {status === 'finished' && <FinishedTest></FinishedTest>} */}
        </main>
    )
}

export default TestingGrid
