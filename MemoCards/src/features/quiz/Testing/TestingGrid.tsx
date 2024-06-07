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

function TestingGrid() {
    const status = useAppSelector(getQuizStatus)
    const questionNum = useAppSelector(getQuizNumQuestions)

    console.log(questionNum)

    if (questionNum === 0)
        return <Empty resource="Decks/Cards for the coresponding Quiz"></Empty>

    return (
        <main className="ml-auto mr-auto  h-[72.5rem] w-[100rem]   rounded-xl border-2 border-chateau-green-100 bg-picton-blue-50 px-20 py-20">
            {status === 'loading' && <Spinner></Spinner>}
            {/* {status === 'error' && <Error></Error>} */}
            {status === 'ready' && <StartScreen></StartScreen>}
            {status === 'active' && (
                <>
                    <TestProgress></TestProgress>
                    <Question></Question>
                    {/* <FooterTest>
                        <TimerTest></TimerTest>
                        <NextQuestionBtn></NextQuestionBtn>
                    </FooterTest> */}
                </>
            )}
            {/* {status === 'finished' && <FinishedTest></FinishedTest>} */}
        </main>
    )
}

export default TestingGrid
