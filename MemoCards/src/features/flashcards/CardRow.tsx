import { type Tables } from '@/types/database.types'
import Table from './TableFlashcards'
import Question from './Question'
import CorrectAnswer from './CorrectAnswer'
import NumberAnswer from './NumberAnswer'
import Answer from './Answer'
import NumberQuestion from '@/pages/NumberCard'
import Menus from '@/ui/Menus'
import Modal from '@/ui/Modal'
import { RiDeleteBin7Line } from 'react-icons/ri'
import ConfirmDelete from '@/ui/ConfirmDelete'
import { useDeleteCard } from './useDeleteCard'
import FormTriggerFlashcards from './FormTriggerFlashcards'
import { CiEdit } from 'react-icons/ci'

type CardProps = {
    card: Tables<'Card'>
    index: number
}

function CardRow({ card, index }: CardProps) {
    const { isDeleting, deleteCard } = useDeleteCard()

    return (
        <>
            <Table.Row type="question" index={index}>
                <NumberQuestion>{index + 1}.</NumberQuestion>
                <Question>{card.question}</Question>
                <CorrectAnswer>{card.correctAnswer}</CorrectAnswer>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={card.id}></Menus.Toggle>
                        <Menus.List id={card.id}>
                            <FormTriggerFlashcards width="full">
                                <Menus.Button
                                    as="div"
                                    icon={
                                        <CiEdit className="h-8 w-8 text-picton-blue-600"></CiEdit>
                                    }
                                >
                                    Edit Deck
                                </Menus.Button>
                            </FormTriggerFlashcards>
                            <Modal.Open opens="deleteCard">
                                <Menus.Button
                                    icon={
                                        <RiDeleteBin7Line className="h-7 w-8 text-danger-500"></RiDeleteBin7Line>
                                    }
                                >
                                    Delete Card
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>
                    <Modal.Window name="deleteCard">
                        <ConfirmDelete
                            resourceName="Card"
                            disabled={isDeleting}
                            onConfirm={() => deleteCard(card.id)}
                        ></ConfirmDelete>
                    </Modal.Window>
                </Modal>
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
