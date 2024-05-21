import { type Tables } from '@/types/database.types'
import Table from './TableFlashcards'
import NumberCard from '@/pages/NumberCard'
import Question from './Question'
import CorrectAnswer from './CorrectAnswer'
import NumberAnswer from './NumberAnswer'
import Answer from './Answer'

type CardProps = {
    card: Tables<'Card'>
    index: number
}

function CardRow({ card, index }: CardProps) {
    return (
        <>
            <Table.Row type="question" index={index}>
                <NumberCard>{index + 1}.</NumberCard>
                <Question>{card.question}</Question>
                <CorrectAnswer>{card.correctAnswer}</CorrectAnswer>
            </Table.Row>
            {card.answers.map((answer, index) => (
                <Table.Row key={answer} type="answer" index={index}>
                    <NumberAnswer>{index + 1}</NumberAnswer>
                    <Answer
                        correctAnswer={card.correctAnswer}
                        numberAnswer={index}
                    >
                        {answer}
                    </Answer>
                </Table.Row>
            ))}
        </>
    )
}

export default CardRow
