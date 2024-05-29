import Button from '@/ui/Button'
import ButtonIcon from '@/ui/ButtonIcon'
import Modal from '@/ui/Modal'
import { PiExamLight } from 'react-icons/pi'

function QuizModifiers() {
    return (
        <Modal>
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
            <Modal.Window name="newQuiz"></Modal.Window>
        </Modal>
    )
}

export default QuizModifiers
