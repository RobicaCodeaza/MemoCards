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
import Question from './Question'
import StartScreen from './StartScreen'
import TestProgress from './TestProgress'
import TimerTest from './TimerTest'
import QuestionBtn from './QuestionBtn'
import { Carousel, CarouselContent } from '@/components/ui/carousel'
import { motion } from 'framer-motion'
import FinishScreen from './FinishScreen'

function TestingGrid() {
    const status = useAppSelector(getQuizStatus)
    const questionNum = useAppSelector(getQuizNumQuestions)

    if (status === 'loading') return <Spinner></Spinner>

    if (questionNum === 0)
        return <Empty resource="Decks/Cards for the coresponding Quiz"></Empty>

    return (
        <main className="ml-auto  mr-auto flex h-[70rem]   w-full max-w-[120rem] flex-col gap-8 rounded-xl border-2 border-mako-grey-100 bg-picton-blue-50 px-4 py-10 phone:h-[65rem] phone:w-[65rem] tab-port:h-[65rem] tab-port:w-[75rem]   tab-land:h-[65rem] tab-land:w-[90rem] particular-small-laptop:h-[72.5rem] particular-small-laptop:w-[100rem]">
            {/* {status === 'error' && <Error></Error>} */}
            {status === 'ready' && <StartScreen></StartScreen>}
            {status === 'active' && (
                <>
                    <TimerTest></TimerTest>
                    <TestProgress></TestProgress>

                    <Carousel className="flex h-full flex-col ">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.2, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <CarouselContent className="perspective--big p-2">
                                <Question></Question>
                            </CarouselContent>
                        </motion.div>
                        <QuestionBtn></QuestionBtn>
                    </Carousel>
                </>
            )}

            {status === 'finished' && <FinishScreen></FinishScreen>}
        </main>
    )
}

export default TestingGrid
