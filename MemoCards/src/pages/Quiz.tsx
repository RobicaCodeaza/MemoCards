import QuizGrid from '@/features/quiz/QuizGrid'
import QuizMain from '@/features/quiz/QuizMain'
import QuizModifiers from '@/features/quiz/QuizModifiers'
import QuizSummary from '@/features/quiz/QuizSummary'
import QuizTableOperation from '@/features/quiz/QuizTableOperation'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Quiz() {
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Quiz 💯</Heading>
            </Row>
            <Row type="horizontal">
                <QuizModifiers></QuizModifiers>
                <QuizTableOperation></QuizTableOperation>
            </Row>
            <QuizMain></QuizMain>
        </>
    )
}

export default Quiz
