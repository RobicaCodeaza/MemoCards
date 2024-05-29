import { Progress } from '@/components/ui/progress'
import Button from '@/ui/Button'

function QuizCard() {
    return (
        <div className="flex h-[25rem] w-full flex-col rounded-lg border border-chateau-green-200   px-6 py-6 shadow-lg   phone:px-8 phone:py-8 tab-port:px-8 tab-port:py-8 tab-land:px-10  tab-land:py-10 particular-small-laptop:px-12 particular-small-laptop:py-12">
            <p className="text-[1.5rem] font-medium uppercase">Medical</p>
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
            <div className=" mb-auto mt-auto flex  flex-col gap-6 text-[1.35rem] uppercase tracking-wide">
                <label
                    htmlFor="progress"
                    className="text-center text-neon-carrot-900"
                >
                    Perfection Score: <strong>48/100</strong>
                </label>
                <div className="">
                    <Progress
                        value={44}
                        className="mx-16 w-[auto] border border-neon-carrot-500 bg-neon-carrot-300  "
                    />
                </div>
            </div>
            <Button variation="accentTertiary" size="small">
                Take Test
            </Button>
        </div>
    )
}

export default QuizCard
