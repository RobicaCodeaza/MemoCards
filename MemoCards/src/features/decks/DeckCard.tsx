import { Progress } from '@/components/ui/progress'
import { IoIosAdd } from 'react-icons/io'
import { AiOutlineDelete } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import Menus from '@/ui/Menus'

function DeckCard() {
    return (
        <div className="flex flex-col   rounded-lg border border-solid  border-picton-blue-200 bg-picton-blue-50  px-10 py-10 shadow-lg">
            <div className="flex items-start justify-between">
                <div className="flex flex-col gap-2">
                    <p
                        className=" rounded-xl border border-picton-blue-200 bg-picton-blue-400 p-2 text-center text-[1.6rem] font-medium uppercase leading-[1.25] tracking-tight text-picton-blue-50 "
                        id="chapter"
                    >
                        Sistemul Muscular
                    </p>
                    <p
                        className="leading[1.5] text-center text-[1.6rem] text-picton-blue-800"
                        id="subchapter "
                    >
                        Membre Inferioare
                    </p>
                    <p
                        className="rounded-xl border border-picton-blue-400  p-1 text-center text-[1.3rem] font-semibold uppercase tracking-wider text-picton-blue-700"
                        id="lesson "
                    >
                        Picior
                    </p>
                </div>
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
                        <Menus.Button
                            icon={
                                <CiEdit className="h-8 w-8 text-picton-blue-600"></CiEdit>
                            }
                        >
                            Edit Deck
                        </Menus.Button>
                        <Menus.Button
                            icon={
                                <CiEdit className="h-8 w-8 text-picton-blue-600"></CiEdit>
                            }
                        >
                            Edit Flashcards
                        </Menus.Button>
                        <Menus.Button
                            icon={
                                <AiOutlineDelete className="h-8 w-8 text-danger-500"></AiOutlineDelete>
                            }
                        >
                            Delete Deck
                        </Menus.Button>
                    </Menus.List>
                </Menus.Menu>
            </div>

            <div className="mt-14 flex flex-col gap-4  px-8 text-[1.3rem] uppercase tracking-wide">
                <label
                    htmlFor="progress"
                    className="text-center text-neon-carrot-900"
                >
                    Perfection Score
                </label>
                <Progress
                    value={32}
                    className="border border-neon-carrot-500 bg-neon-carrot-300"
                />
            </div>
            <p className="mt-12 text-center text-[1.4rem] tracking-wide text-picton-blue-500">
                Last used: <strong>09/08/2001</strong>
            </p>
        </div>
    )
}

export default DeckCard
