type QuizSummaryProps = {
    averageTime: number
    quizesNum: number
    future_exam_in_days: number | null
}

function QuizSummary({
    averageTime,
    quizesNum,
    future_exam_in_days,
}: QuizSummaryProps) {
    const minQuiz = averageTime ? Math.floor(averageTime / 60) : 0
    const secondsQuiz = averageTime ? averageTime % 60 : 0

    return (
        <div className="flex flex-col  gap-8 border-b border-t  border-mako-grey-200 bg-picton-blue-100 px-16 py-6 phone:px-16  phone:py-10 tab-land:px-20 tab-land:py-14 particular-small-laptop:px-24 particular-small-laptop:py-16">
            <p className="text-center text-[2rem] font-semibold tracking-wide">
                Tests Summary
            </p>
            <div className="flex flex-col gap-10 phone:flex-row tab-land:gap-20">
                <div className="flex w-full flex-col gap-4 rounded-md bg-picton-blue-50 px-6 py-6 text-center phone:px-8 phone:py-8 tab-port:px-10 tab-port:py-10 tab-land:px-12 tab-land:py-12">
                    {averageTime && (
                        <p className="text-[1.8rem] font-semibold">
                            {minQuiz < 10 && '0'}
                            {minQuiz}:{secondsQuiz < 10 && '0'}
                            {Math.ceil(secondsQuiz)} min
                        </p>
                    )}
                    {!averageTime && (
                        <p className="text-[1.8rem] font-semibold">--:--</p>
                    )}
                    <p className="text-mako-grey-400">Average Time</p>
                </div>
                <div className="flex w-full flex-col gap-4 rounded-md bg-picton-blue-50 px-6 py-6 text-center phone:px-8 phone:py-8 tab-port:px-10 tab-port:py-10 tab-land:px-12 tab-land:py-12">
                    <p className="text-[1.8rem] font-semibold">{quizesNum}</p>
                    <p className="text-mako-grey-400">Quizes</p>
                </div>
                <div className="flex w-full flex-col gap-4 rounded-md bg-picton-blue-50 px-6 py-6 text-center phone:px-8 phone:py-8 tab-port:px-10 tab-port:py-10 tab-land:px-12 tab-land:py-12">
                    <p className="text-[1.8rem] font-semibold">
                        {future_exam_in_days ?? 0}
                    </p>
                    <p className="text-mako-grey-400">Days until Exam</p>
                </div>
            </div>
        </div>
    )
}

export default QuizSummary
