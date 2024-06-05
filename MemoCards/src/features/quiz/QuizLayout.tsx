import Quiz from '@/pages/Quiz'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'
import { Outlet } from 'react-router-dom'

function QuizLayout() {
    const isTakingQuiz = false

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
