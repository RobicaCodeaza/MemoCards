import { type Tables } from '@/types/database.types'
import Table from './TableFlashcards'
import Question from './Question'
import CorrectAnswer from './CorrectAnswer'
import NumberAnswer from './NumberAnswer'
import Answer from './Answer'
import NumberQuestion from '@/pages/NumberCard'
import Modal from '@/ui/Modal'
import { RiDeleteBin7Line } from 'react-icons/ri'
import ConfirmDelete from '@/ui/ConfirmDelete'
import { useDeleteCard } from './useDeleteCard'
import FormTriggerFlashcards from './FormTriggerFlashcards'
import { CiEdit } from 'react-icons/ci'
import ButtonIcon from '@/ui/ButtonIcon'

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

                <div className="flex items-center gap-2">
                    <FormTriggerFlashcards cardToEdit={card} width="full">
                        <ButtonIcon
                            as="div"
                            otherClasses="h-9 w-9 text-picton-blue-700"
                        >
                            <CiEdit></CiEdit>
                        </ButtonIcon>
                    </FormTriggerFlashcards>
                    <Modal>
                        <Modal.Open opens="deleteCard">
                            <ButtonIcon otherClasses="h-8 w-8 text-danger-500">
                                <RiDeleteBin7Line></RiDeleteBin7Line>
                            </ButtonIcon>
                        </Modal.Open>

                        <Modal.Window name="deleteCard">
                            <ConfirmDelete
                                resourceName="Card"
                                disabled={isDeleting}
                                onConfirm={() => deleteCard(card.id)}
                            ></ConfirmDelete>
                        </Modal.Window>
                    </Modal>
                </div>
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
                </Table.Row>
            ))}
        </>
    )
}

export default CardRow
