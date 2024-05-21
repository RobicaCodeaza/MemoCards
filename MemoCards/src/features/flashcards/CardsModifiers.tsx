import Button from '@/ui/Button'
import ButtonIcon from '@/ui/ButtonIcon'
import Modal from '@/ui/Modal'
import { PiPlusThin, PiStackPlusThin } from 'react-icons/pi'
import FormTriggerFlashcards from './FormTriggerFlashcards'
import { RiDeleteBin7Line } from 'react-icons/ri'
import ConfirmDelete from '@/ui/ConfirmDelete'
import { useDeleteAllCards } from './useDeletAllCards'

function CardsModifiers() {
    const { isDeletingAll, deleteAllCards } = useDeleteAllCards()

    return (
        <Modal>
            <div className="flex flex-col gap-2 phone:flex-row phone:gap-6">
                {/* <Modal.Open opens="addDeck">
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
                </Modal.Window> */}

                <FormTriggerFlashcards>
                    <Button as="div" variation="subtleWhite" size="tiny">
                        <ButtonIcon
                            otherClasses="w-9 h-9 text-picton-blue-950"
                            hoverNone="true"
                            as="div"
                        >
                            <PiStackPlusThin></PiStackPlusThin>
                        </ButtonIcon>
                        New Card
                    </Button>
                </FormTriggerFlashcards>

                <Modal.Open opens="deleteAllCards">
                    <Button as="div" variation="danger" size="tiny">
                        <ButtonIcon
                            otherClasses="w-8 h-9 text-picton-blue-100 "
                            hoverNone="true"
                        >
                            <RiDeleteBin7Line></RiDeleteBin7Line>
                        </ButtonIcon>
                        Delete All Cards
                    </Button>
                </Modal.Open>

                <Modal.Window name="deleteAllCards">
                    <ConfirmDelete
                        resourceName="Complete Series of Cards"
                        disabled={isDeletingAll}
                        onConfirm={deleteAllCards}
                    ></ConfirmDelete>
                </Modal.Window>
            </div>
        </Modal>
    )
}

export default CardsModifiers
