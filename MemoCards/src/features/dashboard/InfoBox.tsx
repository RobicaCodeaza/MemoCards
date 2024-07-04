import ButtonIcon from '@/ui/ButtonIcon'
import Modal from '@/ui/Modal'
import { PiInfoThin } from 'react-icons/pi'
import { IoStatsChartOutline } from 'react-icons/io5'
import { PiPuzzlePieceThin } from 'react-icons/pi'
import { PiStackThin } from 'react-icons/pi'
import { PiStackSimpleThin } from 'react-icons/pi'
import { PiStarThin } from 'react-icons/pi'
import { PiRepeatThin } from 'react-icons/pi'
import { PiChartLineThin } from 'react-icons/pi'

function InfoBox() {
    return (
        <Modal>
            <Modal.Open opens="info">
                <ButtonIcon>
                    <PiInfoThin></PiInfoThin>
                </ButtonIcon>
            </Modal.Open>
            <Modal.Window name="info">
                <div
                    className="flex w-[90vw] flex-col rounded-lg border border-mako-grey-200 px-14 py-10 text-mako-grey-600
              phone:max-w-[75vw]  tab-port:max-w-[60vw] tab-land:max-w-[45vw] particular-small-laptop:max-w-[30vw]"
                >
                    <p className="mb-6 text-center text-[1.8rem] font-medium uppercase  tracking-wide text-chateau-green-600">
                        Dashboard Implementation
                    </p>
                    <p className="">
                        All{' '}
                        <strong className="text-chateau-green-600">
                            Dashboard Stats
                        </strong>{' '}
                        are based on tested{' '}
                        <strong className="text-neon-carrot-400">Quizes</strong>{' '}
                        and{' '}
                        <strong className="text-picton-blue-400">Decks</strong>.
                    </p>
                    <p className="mb-4">The structure consists of 4 parts:</p>
                    <ul className="flex list-outside list-disc flex-col gap-8 px-10 text-mako-grey-500">
                        <li>
                            <div className="flex flex-col gap-2">
                                <p>
                                    <span className="underline">
                                        First part
                                    </span>{' '}
                                    structure -{' '}
                                    <strong>Recap Plan & Overall Stats</strong>:
                                </p>
                                <div className="mt-2 flex items-center gap-4">
                                    <PiRepeatThin className="mr-2 h-10 w-11 text-danger-400"></PiRepeatThin>
                                    <span>
                                        A revision Recap Plan in order to manage
                                        upcoming <strong>Quizes</strong> based
                                        on the last performances.
                                    </span>
                                </div>
                                <p className="mt-2 flex items-center gap-4">
                                    <PiChartLineThin className="mr-2 h-10  w-10 text-chateau-green-400"></PiChartLineThin>
                                    <span>
                                        A general overview of our progress and
                                        other stats.
                                    </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col gap-2">
                                <p>
                                    <span className="underline">
                                        Second part
                                    </span>{' '}
                                    structure -{' '}
                                    <strong>
                                        Decks & Quizes - Combined Data
                                    </strong>
                                    :
                                </p>
                                <div className="mt-2 flex items-center gap-4">
                                    <PiStarThin className="mr-2 h-12 w-14 text-neon-carrot-400"></PiStarThin>
                                    <span>
                                        A graph that shows the
                                        significance/insignificance of number of
                                        questions in obtaining a higher
                                        perfection score.
                                    </span>
                                </div>
                                <p className="mt-2 flex items-center gap-4">
                                    <PiPuzzlePieceThin className="mr-2 h-10  w-10 text-chateau-green-400"></PiPuzzlePieceThin>
                                    <span>
                                        A general overview of{' '}
                                        <strong>Decks</strong> contribution in
                                        obtaining the <strong>Quiz</strong>
                                        &apos;s score.
                                    </span>
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-col gap-2">
                                <p>
                                    <span className="underline">
                                        Third part
                                    </span>{' '}
                                    structure -{' '}
                                    <strong>
                                        Decks & Quizes - Individual Evolution
                                    </strong>
                                    :
                                </p>
                                <div className="mt-2 flex items-center gap-4">
                                    <PiStackSimpleThin className="mr-2 h-10 w-11 text-picton-blue-400"></PiStackSimpleThin>
                                    <span>
                                        Individual data that emphasizes the
                                        progress of our testing per day(last
                                        score), both for <strong>Decks</strong>{' '}
                                        and <strong>Quizes</strong>
                                    </span>
                                </div>
                                <p className="mt-2 flex items-center gap-4">
                                    <PiStackThin className="mr-2 h-10  w-10 text-picton-blue-400"></PiStackThin>
                                    <span>
                                        Individual data that emphasizes the
                                        progress of our testing(all scores),
                                        both for <strong>Decks</strong> and{' '}
                                        <strong>Quizes</strong>
                                    </span>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </Modal.Window>
        </Modal>
    )
}

export default InfoBox
