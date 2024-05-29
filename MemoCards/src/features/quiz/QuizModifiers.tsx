import Button from '@/ui/Button'
import ButtonIcon from '@/ui/ButtonIcon'
import Modal from '@/ui/Modal'
import { PiPlusThin } from 'react-icons/pi'

function QuizModifiers() {
    return (
        <Modal>
            <Button as="div" variation="simpleTertiary" size="tiny">
                <ButtonIcon
                    otherClasses="w-9 h-9 text-chateau-green-500"
                    hoverNone="true"
                >
                    <PiPlusThin></PiPlusThin>
                </ButtonIcon>
                New Deck
            </Button>
        </Modal>
    )
}

export default QuizModifiers
