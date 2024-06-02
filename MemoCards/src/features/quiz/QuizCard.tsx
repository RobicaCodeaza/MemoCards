import { Progress } from '@/components/ui/progress'
import { Tables } from '@/types/database.types'
import Button from '@/ui/Button'
import ConfirmDelete from '@/ui/ConfirmDelete'
import Menus from '@/ui/Menus'
import Modal from '@/ui/Modal'
import { CiEdit } from 'react-icons/ci'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useDeleteQuiz } from './useDeleteQuiz'
import Spinner from '@/ui/Spinner'
import CreateQuizForm from './CreateQuizForm'
import { capitalizeHeader } from '@/utils/formatHeaders'

type QuizCardProps = {
    quiz: Tables<'Quizes'>
}

function QuizCard({ quiz }: QuizCardProps) {
    const { deleteQuiz, isDeleting } = useDeleteQuiz()

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.2, y: -50 }}
            transition={{ duration: 0.3 }}
            key={quiz.id}
        >
            <div className=" flex h-[25rem] w-full flex-col gap-6  rounded-lg border border-chateau-green-200   px-6 py-6 shadow-lg   phone:px-8 phone:py-8 tab-port:px-8 tab-port:py-8 tab-land:px-10  tab-land:py-10 particular-small-laptop:px-12 particular-small-laptop:py-12">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col ">
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
                            </Menus.List>
                        </Menus.Menu>
                        <Modal.Window name="deleteQuiz">
                            {isDeleting ? (
                                <Spinner></Spinner>
                            ) : (
                                <ConfirmDelete
                                    resourceName="Quiz"
                                    disabled={isDeleting}
                                    onConfirm={() => deleteQuiz(quiz.id)}
                                ></ConfirmDelete>
                            )}
                        </Modal.Window>
                        <Modal.Window type="quiz" name="editQuiz">
                            <CreateQuizForm quizToEdit={quiz}></CreateQuizForm>
                        </Modal.Window>
                    </Modal>
                </div>

                <div className=" mb-auto mt-auto flex  flex-col gap-6 text-[1.35rem] uppercase tracking-wide">
                    <label
                        htmlFor="progress"
                        className="text-center text-neon-carrot-900"
                    >
                        Perfection Score:{' '}
                        <strong>
                            {quiz.perfectionScore ? quiz.perfectionScore : 0}
                        </strong>
                    </label>
                    <div className="">
                        <Progress
                            value={quiz.perfectionScore}
                            className="mx-16 w-[auto] border border-neon-carrot-500 bg-neon-carrot-300  "
                        />
                    </div>
                </div>

                <Button variation="accentTertiary" size="small">
                    Take Test
                </Button>
            </div>
        </motion.div>
    )
}

export default QuizCard
