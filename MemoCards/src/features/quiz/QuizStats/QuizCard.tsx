import { CiEdit } from 'react-icons/ci'
import { RiDeleteBin7Line } from 'react-icons/ri'
import {
    PiArrowBendUpRightThin,
    PiArrowBendUpLeftThin,
    PiHourglassLowThin,
    PiTimerThin,
} from 'react-icons/pi'
import { GiFinishLine } from 'react-icons/gi'

import { motion } from 'framer-motion'

import { Tables } from '@/types/database.types'
import { useState } from 'react'
import { useDeleteQuiz } from '../useDeleteQuiz'
import { capitalizeHeader } from '@/utils/formatHeaders'

import { Progress } from '@/components/ui/progress'
import Button from '@/ui/Button'
import ConfirmDelete from '@/ui/ConfirmDelete'
import Menus from '@/ui/Menus'
import Modal from '@/ui/Modal'
import Spinner from '@/ui/Spinner'
import { useNavigate } from 'react-router-dom'
import CreateQuizForm from './CreateQuizForm'
import { useAppSelector } from '@/hooks/useAppSelector'
import { getQuizNumQuestions } from '../quizSlice'

type QuizCardProps = {
    quiz: Tables<'Quizes'>
}

function QuizCard({ quiz }: QuizCardProps) {
    const navigate = useNavigate()
    const { deleteQuiz, isDeleting } = useDeleteQuiz()
    const numQuestions = useAppSelector(getQuizNumQuestions)

    const [isOtherDetails, setIsOtherDetails] = useState<boolean>()
    function handleIsOtherDetails() {
        setIsOtherDetails((isOtherDetails) => !isOtherDetails)
    }
    function handleTakeTest() {
        navigate(`${quiz.id}?name=${quiz.quizName}`)
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.2, y: -50 }}
            transition={{ duration: 0.3 }}
            className="perspective"
        >
            <div
                className={` ${isOtherDetails ? 'rotate-y-180' : ''}  relative h-full overflow-hidden rounded-lg border border-chateau-green-200 shadow-lg  transition-transform duration-300`}
            >
                {!isOtherDetails && (
                    <div className="absolute left-0 top-0 flex h-full w-full  flex-col gap-6 px-6 py-6 phone:px-8 phone:py-8 tab-port:px-8  tab-port:py-8 tab-land:px-10 tab-land:py-10 particular-small-laptop:px-12 particular-small-laptop:py-12">
                        <div className="flex items-start justify-between">
                            <div className="flex flex-col gap-2">
                                <p className="text-[1.5rem] font-medium uppercase">
                                    {capitalizeHeader(quiz.quizName)}
                                </p>
                                <p className="text-[1.4rem] text-mako-grey-500">
                                    {quiz.description}
                                </p>
                                {/* <p className="text-[1.4rem] text-mako-grey-500">
                        Time per Question
                    </p>
                    <p className="text-[1.4rem] text-mako-grey-500">
                        Time per Test
                    </p>
                    <p className="text-[1.4rem] text-mako-grey-500">
                        Solved Time
                    </p> */}
                            </div>
                            <Modal>
                                <Menus.Menu>
                                    <Menus.Toggle id={quiz.id}></Menus.Toggle>
                                    <Menus.List id={quiz.id}>
                                        <Modal.Open opens="editQuiz">
                                            <Menus.Button
                                                icon={
                                                    <CiEdit className="h-8 w-8 text-picton-blue-600"></CiEdit>
                                                }
                                            >
                                                Edit Quiz
                                            </Menus.Button>
                                        </Modal.Open>

                                        <Modal.Open opens="deleteQuiz">
                                            <Menus.Button
                                                icon={
                                                    <RiDeleteBin7Line className="h-7 w-8 text-danger-500"></RiDeleteBin7Line>
                                                }
                                            >
                                                Delete Quiz
                                            </Menus.Button>
                                        </Modal.Open>
                                        <Menus.Button
                                            icon={
                                                <PiArrowBendUpRightThin className="h-8 w-8 text-picton-blue-800"></PiArrowBendUpRightThin>
                                            }
                                            onClick={handleIsOtherDetails}
                                        >
                                            More Details
                                        </Menus.Button>
                                    </Menus.List>
                                </Menus.Menu>
                                <Modal.Window name="deleteQuiz">
                                    {isDeleting ? (
                                        <Spinner></Spinner>
                                    ) : (
                                        <ConfirmDelete
                                            resourceName="Quiz"
                                            disabled={isDeleting}
                                            onConfirm={() =>
                                                deleteQuiz(quiz.id)
                                            }
                                        ></ConfirmDelete>
                                    )}
                                </Modal.Window>
                                <Modal.Window type="quiz" name="editQuiz">
                                    <CreateQuizForm
                                        quizToEdit={quiz}
                                    ></CreateQuizForm>
                                </Modal.Window>
                            </Modal>
                        </div>

                        <div className=" mb-auto mt-auto flex  flex-col gap-6 text-[1.35rem] uppercase tracking-wide">
                            <label
                                htmlFor="progress"
                                className="text-center text-neon-carrot-800"
                            >
                                Perfection Score:{' '}
                                <strong>
                                    {quiz.perfectionScore
                                        ? quiz.perfectionScore[
                                              quiz.perfectionScore.length - 1
                                          ]
                                        : 0}
                                </strong>
                            </label>
                            <div className="">
                                <Progress
                                    value={
                                        quiz.perfectionScore !== null &&
                                        typeof quiz.perfectionScore?.at(
                                            quiz.perfectionScore?.length - 1
                                        ) === 'number'
                                            ? quiz.perfectionScore[
                                                  quiz.perfectionScore?.length -
                                                      1
                                              ]
                                            : 0
                                    }
                                    className="mx-16 h-3 w-[auto] border border-neon-carrot-500 bg-neon-carrot-200  "
                                />
                            </div>
                        </div>

                        <Button
                            variation="accentTertiary"
                            size="small"
                            onClick={handleTakeTest}
                        >
                            Take Test
                        </Button>
                    </div>
                )}

                {isOtherDetails && (
                    <div className="rotate-negative-y-180 absolute left-0 top-0 flex h-full w-full transform flex-col  gap-6 px-6 py-6 phone:px-8 phone:py-8 tab-port:px-8 tab-port:py-8  tab-land:px-10 tab-land:py-10 particular-small-laptop:px-12 particular-small-laptop:py-12">
                        <div className="flex items-start justify-between">
                            <span></span>
                            <Modal>
                                <Menus.Menu>
                                    <Menus.Toggle id={quiz.id}></Menus.Toggle>
                                    <Menus.List id={quiz.id}>
                                        <Modal.Open opens="editQuiz">
                                            <Menus.Button
                                                icon={
                                                    <CiEdit className="h-8 w-8 text-picton-blue-600"></CiEdit>
                                                }
                                            >
                                                Edit Quiz
                                            </Menus.Button>
                                        </Modal.Open>

                                        <Modal.Open opens="deleteQuiz">
                                            <Menus.Button
                                                icon={
                                                    <RiDeleteBin7Line className="h-7 w-8 text-danger-500"></RiDeleteBin7Line>
                                                }
                                            >
                                                Delete Quiz
                                            </Menus.Button>
                                        </Modal.Open>
                                        <Menus.Button
                                            icon={
                                                <PiArrowBendUpLeftThin className="h-8 w-8 text-picton-blue-800"></PiArrowBendUpLeftThin>
                                            }
                                            onClick={handleIsOtherDetails}
                                        >
                                            Main Details
                                        </Menus.Button>
                                    </Menus.List>
                                </Menus.Menu>
                                <Modal.Window name="deleteQuiz">
                                    {isDeleting ? (
                                        <Spinner></Spinner>
                                    ) : (
                                        <ConfirmDelete
                                            resourceName="Quiz"
                                            disabled={isDeleting}
                                            onConfirm={() =>
                                                deleteQuiz(quiz.id)
                                            }
                                        ></ConfirmDelete>
                                    )}
                                </Modal.Window>
                                <Modal.Window type="quiz" name="editQuiz">
                                    <CreateQuizForm
                                        quizToEdit={quiz}
                                    ></CreateQuizForm>
                                </Modal.Window>
                            </Modal>
                        </div>

                        <div className="flex flex-col gap-6 px-6">
                            <p className="flex items-center  gap-2 border-b border-mako-grey-200 px-6 py-2 text-[1.5rem]    text-mako-grey-500  ">
                                <PiHourglassLowThin
                                    className="h-8 w-8 text-picton-blue-900  particular-small-laptop:h-9
                                particular-small-laptop:w-9
                                "
                                ></PiHourglassLowThin>
                                Time/Quiz:
                                <span className="ml-2 text-[1.4rem] font-semibold">
                                    {quiz.quizTime
                                        ? quiz.quizTime < 10
                                            ? `0${quiz.quizTime}`
                                            : quiz.quizTime
                                        : '--'}{' '}
                                    (min)
                                </span>
                            </p>
                            <p className="flex items-center  gap-2 border-b border-mako-grey-200 px-6 py-2 text-[1.5rem]    text-mako-grey-500 ">
                                <PiTimerThin
                                    className="h-8 w-8 text-picton-blue-900  particular-small-laptop:h-9
                                particular-small-laptop:w-9
                                "
                                ></PiTimerThin>
                                Time/Question:
                                <span className="ml-2 text-[1.4rem] font-semibold ">
                                    {quiz.questionTime
                                        ? quiz.questionTime < 10
                                            ? `0${quiz.questionTime}`
                                            : quiz.questionTime
                                        : '--'}{' '}
                                    (sec)
                                </span>
                            </p>
                            <p className="flex items-center  gap-2 border-b border-mako-grey-200 px-6 py-2 text-[1.5rem]    text-mako-grey-500 ">
                                <GiFinishLine
                                    className="h-8 w-8 text-picton-blue-900  particular-small-laptop:h-9
                                particular-small-laptop:w-9
                                "
                                ></GiFinishLine>
                                Solved Time:
                                <span className="ml-2 text-[1.4rem] font-semibold">
                                    {quiz.completionTime
                                        ? quiz.completionTime < 10
                                            ? `0${quiz.completionTime}`
                                            : quiz.completionTime
                                        : '--'}{' '}
                                    (min)
                                </span>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default QuizCard
