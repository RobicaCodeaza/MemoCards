import QuizGrid from '@/features/quiz/QuizGrid'
import QuizMain from '@/features/quiz/QuizMain'
import QuizModifiers from '@/features/quiz/QuizModifiers'
import QuizSummary from '@/features/quiz/QuizSummary'
import QuizTableOperation from '@/features/quiz/QuizTableOperation'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Quiz() {
    const isTakingQuiz = false

    return (
        <>
            {!isTakingQuiz ? (
                <>
                    <Row type="horizontal">
                        <QuizModifiers></QuizModifiers>
                        <QuizTableOperation></QuizTableOperation>
                    </Row>
                    <QuizMain></QuizMain>
                </>
            ) : (
                <>
                    <Row type="horizontal">
                        <Heading as="h1">Taking Quiz ⌛</Heading>
                    </Row>
                </>
            )}
        </>
    )
}

export default Quiz
