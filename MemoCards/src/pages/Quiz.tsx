import QuizMain from '@/features/quiz/QuizStats/QuizMain'
import QuizModifiers from '@/features/quiz/QuizStats/QuizModifiers'
import QuizTableOperation from '@/features/quiz/QuizStats/QuizTableOperation'
import Heading from '@/ui/Heading'
import Row from '@/ui/Row'

function Quiz() {
    return (
        <>
            <Row type="horizontal">
                <QuizModifiers></QuizModifiers>
                <QuizTableOperation></QuizTableOperation>
            </Row>
            <QuizMain></QuizMain>
        </>
    )
}

export default Quiz
