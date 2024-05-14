import { PiPlusThin } from 'react-icons/pi'
import { PiStackPlusThin } from 'react-icons/pi'
import ButtonIcon from '@/ui/ButtonIcon'
import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import CreateDeckForm from './CreateDeckForm'

function DecksModifiers() {
    return (
        <Modal>
            <div className="flex flex-col gap-4 phone:flex-row">
                <Modal.Open opens="addDeck">
                    <Button as="div" variation="subtleWhite" size="small">
                        <ButtonIcon otherClasses="w-9 h-9 text-picton-blue-800">
                            <PiPlusThin></PiPlusThin>
                        </ButtonIcon>
                        New Deck
                    </Button>
                </Modal.Open>

                <Modal.Window windowTitle="Create a deck" name="addDeck">
                    <CreateDeckForm deckToEdit={undefined}></CreateDeckForm>
                </Modal.Window>

                <Button as="div" variation="subtleWhite" size="small">
                    <ButtonIcon otherClasses="w-9 h-9 text-picton-blue-800">
                        <PiStackPlusThin></PiStackPlusThin>
                    </ButtonIcon>
                    New Card
                </Button>

                <Modal.Open opens="addDeck">
                    <Button as="div" variation="subtleWhite" size="small">
                        <ButtonIcon otherClasses="w-9 h-9 text-picton-blue-800">
                            <PiPlusThin></PiPlusThin>
                        </ButtonIcon>
                        Delete All Decks
                    </Button>
                </Modal.Open>

                <Modal.Window name="deleteDeck">
                    <CreateDeckForm deckToEdit={undefined}></CreateDeckForm>
                </Modal.Window>
            </div>
        </Modal>
    )
}

export default DecksModifiers
