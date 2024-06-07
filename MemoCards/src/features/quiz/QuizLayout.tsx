import { useAppSelector } from '@/hooks/useAppSelector'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'
import { Outlet } from 'react-router-dom'
import { getQuiz } from './quizSlice'

function QuizLayout() {
    const quiz = useAppSelector(getQuiz)
    const isTakingQuiz = quiz.status === 'ready' ? true : false

    return (
        <>
            {!isTakingQuiz ? (
                <Row type="horizontal">
                    <Heading as="h1">Quiz 💯</Heading>
                </Row>
            ) : (
                <Row type="horizontal">
                    <Heading as="h1">Taking Quiz ⌛</Heading>
                </Row>
            )}
            <Outlet></Outlet>
        </>
    )
}

export default QuizLayout
