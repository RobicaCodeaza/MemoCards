import { type ReactNode } from 'react'

type AnswerProps = {
    children: ReactNode
    correctAnswer: number
    numberAnswer: number
}

function Answer({ children, correctAnswer, numberAnswer }: AnswerProps) {
    if (correctAnswer === numberAnswer + 1)
        return (
            <div className=" text-wrap break-words rounded-md  border-l-2    border-r-2 border-chateau-green-400  bg-picton-blue-50 px-6 py-2 text-[1.5rem] tracking-wide text-chateau-green-800">
                {children}
            </div>
        )
    else
        return (
            <div className=" bg-picton-blue text-wrap break-words  rounded-md border-l-2 border-r-2 border-danger-700 bg-picton-blue-50 px-6 py-2 text-[1.5rem]  tracking-wide text-danger-800">
                {children}
            </div>
        )
}

export default Answer
