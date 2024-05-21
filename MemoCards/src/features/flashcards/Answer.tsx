import { type ReactNode } from 'react'

type AnswerProps = {
    children: ReactNode
    correctAnswer: number
    numberAnswer: number
}

function Answer({ children, correctAnswer, numberAnswer }: AnswerProps) {
    if (correctAnswer === numberAnswer + 1)
        return (
            <div className="rounded bg-chateau-green-200 px-6 py-1 text-[1.5rem] tracking-wide text-chateau-green-800">
                {children}
            </div>
        )
    else
        return (
            <div className="rounded bg-danger-200 px-6 py-1 text-[1.5rem] tracking-wide text-danger-800">
                {children}
            </div>
        )
}

export default Answer
