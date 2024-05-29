import { Progress } from '@/components/ui/progress'
import Pagination from '@/ui/Pagination'

function QuizGrid() {
    return (
        <>
            <div className="mt-[-3rem] flex justify-start  border-b border-t border-mako-grey-200 bg-picton-blue-50">
                <div className="max-h-[20rem] border-l border-r border-mako-grey-200 px-6 py-6 phone:px-8 phone:py-8 tab-port:px-8 tab-port:py-8 tab-land:w-1/5 tab-land:px-10 tab-land:py-10 particular-small-laptop:px-12 particular-small-laptop:py-12">
                    <p className="text-[1.5rem] font-medium uppercase">
                        Medical
                    </p>
                    <p className="text-[1.4rem] text-mako-grey-500">
                        Short description of what the test should be
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
                    <div className=" flex flex-col gap-6  px-12 text-[1.35rem] uppercase tracking-wide">
                        <label
                            htmlFor="progress"
                            className="text-center text-neon-carrot-900"
                        >
                            Perfection Score: <strong>48/100</strong>
                        </label>
                        <Progress
                            value={44}
                            className="border border-neon-carrot-500 bg-neon-carrot-300"
                        />
                    </div>
                </div>
            </div>
            <Pagination count={3} PAGE_SIZE={1}></Pagination>
        </>
    )
}

export default QuizGrid
