import { type Tables } from '@/types/database.types'
import Table from './TableFlashcards'
import Question from './Question'
import CorrectAnswer from './CorrectAnswer'
import NumberAnswer from './NumberAnswer'
import Answer from './Answer'
import NumberQuestion from '@/pages/NumberCard'

type CardProps = {
    card: Tables<'Card'>
    index: number
}

function CardRow({ card, index }: CardProps) {
    return (
        <>
            <Table.Row type="question" index={index}>
                <NumberQuestion>{index + 1}.</NumberQuestion>
                <Question>{card.question}</Question>
                <CorrectAnswer>{card.correctAnswer}</CorrectAnswer>
            </Table.Row>
            {card.answers.map((answer, index) => (
                <Table.Row key={index} type="answer" index={index}>
                    <NumberAnswer>{index + 1}</NumberAnswer>
                    <Answer
                        correctAnswer={card.correctAnswer}
                        numberAnswer={index}
                    >
                        {answer}
                    </Answer>
                    <div></div>
                </Table.Row>
            ))}
        </>
    )
}

export default CardRow
