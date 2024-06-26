import { Progress } from '@/components/ui/progress'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { CiEdit } from 'react-icons/ci'
import Menus from '@/ui/Menus'
import Modal from '@/ui/Modal'
import CreateDeckForm from './CreateDeckForm'
import { Tables } from '../../types/database.types'
import ConfirmDelete from '@/ui/ConfirmDelete'
import { useDeleteDeck } from './useDeleteDeck'
import { capitalizeHeader } from '@/utils/formatHeaders'
import { useNavigate } from 'react-router-dom'

type DeckCardProps = {
    deck: Tables<'Decks'>
}

function DeckCard({ deck }: DeckCardProps) {
    const { isDeleting, deleteDeck } = useDeleteDeck()
    const navigate = useNavigate()
    function handleEditFlashcards() {
        navigate(
            `/flashcards?chapter=${deck.chapter}&subchapter=${deck.subchapter}&lesson=${deck.lesson}`
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.2, y: -50 }}
            transition={{ duration: 0.3 }}
            key={deck.id}
        >
            <div className="flex   flex-col rounded-lg  border border-solid  border-picton-blue-200 bg-picton-blue-50 px-10 py-10 shadow-lg">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-2">
                        <p
                            className=" rounded-xl border border-picton-blue-200 bg-picton-blue-400 p-2 text-center text-[1.6rem] font-medium uppercase leading-[1.25] tracking-tight text-picton-blue-50 "
                            id="chapter"
                        >
                            {capitalizeHeader(deck.chapter)}
                        </p>
                        <p
                            className="leading[1.5] text-center text-[1.6rem] text-picton-blue-800"
                            id="subchapter "
                        >
                            {capitalizeHeader(deck.subchapter)}
                        </p>
                        <p
                            className="rounded-xl border border-picton-blue-400  p-1 text-center text-[1.3rem] font-semibold uppercase tracking-wider text-picton-blue-700"
                            id="lesson "
                        >
                            {capitalizeHeader(deck.lesson)}
                        </p>
                    </div>

                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={deck.id}></Menus.Toggle>
                            <Menus.List id={deck.id}>
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
                                    onClick={handleEditFlashcards}
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
                            <ConfirmDelete
                                resourceName="Deck"
                                disabled={isDeleting}
                                onConfirm={() => deleteDeck(deck.id)}
                            ></ConfirmDelete>
                        </Modal.Window>
                        <Modal.Window windowTitle="Edit a deck" name="editDeck">
                            <CreateDeckForm deckToEdit={deck}></CreateDeckForm>
                        </Modal.Window>
                    </Modal>
                </div>

                <div className="mt-14 flex flex-col gap-6  px-8 text-[1.35rem] uppercase tracking-wide">
                    <label
                        htmlFor="progress"
                        className="text-center text-neon-carrot-800"
                    >
                        Perfection Score:{' '}
                        <strong>
                            {deck.perfectionScore
                                ? deck.perfectionScore[
                                      deck.perfectionScore.length - 1
                                  ]
                                : 0}
                            /100
                        </strong>
                    </label>
                    <Progress
                        value={
                            deck.perfectionScore
                                ? deck.perfectionScore[
                                      deck.perfectionScore.length - 1
                                  ]
                                : 0
                        }
                        className="h-3 border border-neon-carrot-500 bg-neon-carrot-200"
                    />
                </div>
                <p className="mt-8 text-center text-[1.4rem] tracking-wide text-picton-blue-500">
                    Last tested:{' '}
                    <strong>
                        {deck.lastTested
                            ? new Intl.DateTimeFormat(navigator.language, {
                                  day: 'numeric',
                                  month: 'numeric',
                                  year: 'numeric',
                              }).format(
                                  new Date(
                                      deck.lastTested[
                                          deck.lastTested.length - 1
                                      ]
                                  )
                              )
                            : 'Not tested'}
                    </strong>
                </p>
            </div>
        </motion.div>
    )
}

export default DeckCard
