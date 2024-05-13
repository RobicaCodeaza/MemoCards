import { Progress } from '@/components/ui/progress'
import { IoIosAdd } from 'react-icons/io'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { CiEdit } from 'react-icons/ci'
import Menus from '@/ui/Menus'
import Modal from '@/ui/Modal'
import CreateDeckForm from './CreateDeckForm'
import { Tables } from '../../types/database.types'

type DeckCardProps = {
    deck: Tables<'Decks'>
}

function DeckCard({ deck }: DeckCardProps) {
    return (
        <div className="flex flex-col   rounded-lg border border-solid  border-picton-blue-200 bg-picton-blue-50  px-10 py-10 shadow-lg">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                    <p
                        className=" rounded-xl border border-picton-blue-200 bg-picton-blue-400 p-2 text-center text-[1.6rem] font-medium uppercase leading-[1.25] tracking-tight text-picton-blue-50 "
                        id="chapter"
                    >
                        {deck.chapter}
                    </p>
                    <p
                        className="leading[1.5] text-center text-[1.6rem] text-picton-blue-800"
                        id="subchapter "
                    >
                        {deck.subchapter}
                    </p>
                    <p
                        className="rounded-xl border border-picton-blue-400  p-1 text-center text-[1.3rem] font-semibold uppercase tracking-wider text-picton-blue-700"
                        id="lesson "
                    >
                        {deck.lesson}
                    </p>
                </div>

                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={1}></Menus.Toggle>
                        <Menus.List id={1}>
                            <Menus.Button
                                icon={
                                    <IoIosAdd className="h-8 w-8 text-chateau-green-600"></IoIosAdd>
                                }
                            >
                                Add new card
                            </Menus.Button>
                            <Modal.Open opens="editDeck">
                                <Menus.Button
                                    icon={
                                        <CiEdit className="h-8 w-8 text-picton-blue-600"></CiEdit>
                                    }
                                >
                                    Edit Deck
                                </Menus.Button>
                            </Modal.Open>
                            <Menus.Button
                                icon={
                                    <CiEdit className="h-8 w-8 text-picton-blue-600"></CiEdit>
                                }
                            >
                                Edit Flashcards
                            </Menus.Button>
                            <Modal.Open opens="deleteDeck">
                                <Menus.Button
                                    icon={
                                        <RiDeleteBin7Line className="h-7 w-8 text-danger-500"></RiDeleteBin7Line>
                                    }
                                >
                                    Delete Deck
                                </Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>
                    <Modal.Window name="deleteDeck">
                        <div>Delete</div>
                    </Modal.Window>
                    <Modal.Window name="editDeck">
                        <CreateDeckForm></CreateDeckForm>
                    </Modal.Window>
                </Modal>
            </div>

            <div className="mt-14 flex flex-col gap-4  px-8 text-[1.3rem] uppercase tracking-wide">
                <label
                    htmlFor="progress"
                    className="text-center text-neon-carrot-900"
                >
                    Perfection Score
                </label>
                <Progress
                    value={deck.perfectionScore ?? 0}
                    className="border border-neon-carrot-500 bg-neon-carrot-300"
                />
            </div>
            <p className="mt-12 text-center text-[1.4rem] tracking-wide text-picton-blue-500">
                Last tested:{' '}
                <strong>
                    {deck.lastTested?.slice(-1)
                        ? deck.lastTested.slice(-1)
                        : 'Not tested'}
                </strong>
            </p>
        </div>
    )
}

export default DeckCard
