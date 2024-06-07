import { useAppSelector } from '@/hooks/useAppSelector'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'
import { Outlet, useSearchParams } from 'react-router-dom'
import { getQuiz } from './quizSlice'

function QuizLayout() {
    const [searchParams, _] = useSearchParams()
    const quiz = useAppSelector(getQuiz)
    console.log('quizLayout', quiz)
    const isTakingQuiz = quiz.status === 'ready' ? true : false

    return (
        <>
            {!isTakingQuiz ? (
                <Row type="horizontal">
                    <Heading as="h1">Quiz 💯</Heading>
                </Row>
            ) : (
                <Row type="horizontal">
                    <Heading as="h1">
                        Testing -{' '}
                        <span className="gradient-text">
                            {`${searchParams.get('name')?.toUpperCase()}`}
                        </span>
                    </Heading>
                </Row>
            )}
            <Outlet></Outlet>
        </>
    )
}

export default QuizLayout
