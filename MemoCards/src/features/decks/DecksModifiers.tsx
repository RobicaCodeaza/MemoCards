import { PiPlusThin } from 'react-icons/pi'
import { PiStackPlusThin } from 'react-icons/pi'
import { RiDeleteBin7Line } from 'react-icons/ri'
import ButtonIcon from '@/ui/ButtonIcon'
import Modal from '@/ui/Modal'
import Button from '@/ui/Button'
import CreateDeckForm from './CreateDeckForm'
import ConfirmDelete from '@/ui/ConfirmDelete'
import { useDeleteAllDecks } from './useDeleteAllDecks'

function DecksModifiers() {
    const { isDeletingAll, deleteAllDecks } = useDeleteAllDecks()

    return (
        <Modal>
            <div className="flex flex-col gap-4 phone:flex-row">
                <Modal.Open opens="addDeck">
                    <Button as="div" variation="subtleWhite" size="tiny">
                        <ButtonIcon
                            otherClasses="w-9 h-9 text-picton-blue-950"
                            hoverNone="true"
                        >
                            <PiPlusThin></PiPlusThin>
                        </ButtonIcon>
                        New Deck
                    </Button>
                </Modal.Open>

                <Modal.Window windowTitle="Create a deck" name="addDeck">
                    <CreateDeckForm deckToEdit={undefined}></CreateDeckForm>
                </Modal.Window>

                <Button as="div" variation="subtleWhite" size="tiny">
                    <ButtonIcon
                        otherClasses="w-9 h-9 text-picton-blue-950"
                        hoverNone="true"
                    >
                        <PiStackPlusThin></PiStackPlusThin>
                    </ButtonIcon>
                    New Card
                </Button>

                <Modal.Open opens="deleteAllDecks">
                    <Button as="div" variation="danger" size="tiny">
                        <ButtonIcon
                            otherClasses="w-8 h-9 text-mako-grey-50 "
                            hoverNone="true"
                        >
                            <RiDeleteBin7Line></RiDeleteBin7Line>
                        </ButtonIcon>
                        Delete All Decks
                    </Button>
                </Modal.Open>

                <Modal.Window name="deleteAllDecks">
                    <ConfirmDelete
                        resourceName="Complete Series of Decks"
                        disabled={isDeletingAll}
                        onConfirm={deleteAllDecks}
                    ></ConfirmDelete>
                </Modal.Window>
            </div>
        </Modal>
    )
}

export default DecksModifiers
