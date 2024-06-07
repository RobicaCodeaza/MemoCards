import Button from '@/ui/Button'
import ButtonIcon from '@/ui/ButtonIcon'
import Modal from '@/ui/Modal'
import { PiExamLight } from 'react-icons/pi'
import { RiDeleteBin7Line } from 'react-icons/ri'
import ConfirmDelete from '@/ui/ConfirmDelete'
import { useDeleteAllQuizes } from '../useDeleteAllQuizes'
import CreateQuizForm from './CreateQuizForm'

function QuizModifiers() {
    const { isDeletingAll, deleteAllQuizes } = useDeleteAllQuizes()
    return (
        <Modal>
            <div className="flex  flex-col gap-2 phone:flex-row phone:gap-6">
                <Modal.Open opens="newQuiz">
                    <Button as="div" variation="subtleWhite" size="tiny">
                        <ButtonIcon
                            otherClasses="w-9 h-9 text-picton-blue-950"
                            hoverNone="true"
                        >
                            <PiExamLight></PiExamLight>
                        </ButtonIcon>
                        New Quiz
                    </Button>
                </Modal.Open>
                <Modal.Open opens="deleteAllQuizes">
                    <Button as="div" variation="danger" size="tiny">
                        <ButtonIcon
                            otherClasses="w-8 h-9 text-picton-blue-100 "
                            hoverNone="true"
                        >
                            <RiDeleteBin7Line></RiDeleteBin7Line>
                        </ButtonIcon>
                        Delete All
                    </Button>
                </Modal.Open>
                <Modal.Window type="quiz" name="newQuiz">
                    <CreateQuizForm></CreateQuizForm>
                </Modal.Window>
                <Modal.Window name="deleteAllQuizes">
                    <ConfirmDelete
                        resourceName="Complete Series of Quizes"
                        disabled={isDeletingAll}
                        onConfirm={deleteAllQuizes}
                    ></ConfirmDelete>
                </Modal.Window>
            </div>
        </Modal>
    )
}

export default QuizModifiers
