import ButtonIcon from '@/ui/ButtonIcon'
import Modal from '@/ui/Modal'
import { PiInfoThin } from 'react-icons/pi'
import { BiRevision } from 'react-icons/bi'
import { IoStatsChartOutline } from 'react-icons/io5'
function InfoAbout() {
    return (
        <Modal>
            <Modal.Open opens="info">
                <ButtonIcon>
                    <PiInfoThin></PiInfoThin>
                </ButtonIcon>
            </Modal.Open>
            <Modal.Window name="info">
                <div
                    className="flex w-[90vw] flex-col rounded-lg border border-mako-grey-200 px-20 py-10 text-mako-grey-600
              phone:max-w-[75vw]  tab-port:max-w-[60vw] tab-land:max-w-[45vw] particular-small-laptop:max-w-[30vw]"
                >
                    <p className="mb-6 text-center text-[1.5rem] font-medium uppercase  tracking-wide text-chateau-green-600">
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
                    <p className="mb-2">The structure consists of 4 parts:</p>
                    <ul className="flex list-outside list-disc flex-col gap-6 px-10 text-mako-grey-500">
                        <li>
                            <p>
                                <span className="underline">First part</span>{' '}
                                structure:
                            </p>
                            <p className="mt-2 gap-4">
                                <BiRevision className="inline-block h-10  w-10 text-danger-500"></BiRevision>
                                <span className="ml-2">
                                    A revision Recap Plan in order to manage
                                    upcoming quizes based on the last
                                    performances.
                                </span>
                            </p>
                            <p className="mt-2 gap-4">
                                <IoStatsChartOutline className="h-10 w-10  text-chateau-green-400"></IoStatsChartOutline>
                                <span>A general overview of our progress</span>
                            </p>
                            <div></div>
                            <div></div>
                        </li>

                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </Modal.Window>
        </Modal>
    )
}

export default InfoAbout
