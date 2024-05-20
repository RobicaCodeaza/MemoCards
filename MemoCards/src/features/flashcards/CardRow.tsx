import { type Tables } from '@/types/database.types'
import Table, { RowProps } from './TableFlashcards'

type CardProps = {
    card: Tables<'Card'>
    index: number
}

function CardRow({ card, index }: CardProps) {
    return (
        <>
            <Table.Row type="question" index={index}>
                {card.question}
            </Table.Row>
            {card.answers.map((answer, index) => (
                <Table.Row key={answer} type="answer" index={index}>
                    {answer}
                </Table.Row>
            ))}
        </>
    )
}

export default CardRow
