import { type Tables } from '@/types/database.types'
import Table, { RowProps } from './TableFlashcards'

type CardProps = {
    card: Tables<'Card'>
    itemsLength: number
    index: number
}

function CardRow({ card, itemsLength, index }: CardProps) {
    return (
        <>
            <Table.Row type="question" index={index} itemsLength={itemsLength}>
                {card.question}
            </Table.Row>
            {card.answers.map((answer, index) => (
                <Table.Row
                    key={answer}
                    type="answer"
                    index={index}
                    itemsLength={itemsLength}
                >
                    {answer}
                </Table.Row>
            ))}
        </>
    )
}

export default CardRow
