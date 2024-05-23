import { type ReactNode } from 'react'

type AnswerProps = {
    children: ReactNode
    correctAnswer: number
    numberAnswer: number
}

function Answer({ children, correctAnswer, numberAnswer }: AnswerProps) {
    if (correctAnswer === numberAnswer + 1)
        return (
            <div className=" h-[10rem] w-[50rem] text-wrap rounded-md border  border-[transparent] bg-chateau-green-200 px-6 py-2 text-[1.5rem] tracking-wide text-chateau-green-800">
                {children}
            </div>
        )
    else
        return (
            <div className=" bg-picton-blue  rounded-md border border-danger-300  bg-picton-blue-50 px-6 py-2 text-[1.5rem]  tracking-wide text-danger-800">
                {children}
            </div>
        )
}

export default Answer
