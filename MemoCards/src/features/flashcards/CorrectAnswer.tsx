import { PropsWithChildren } from 'react'

function CorrectAnswer({ children }: PropsWithChildren) {
    return (
        <div className=" justify-self-center rounded bg-chateau-green-500 px-2 py-2 text-center font-medium text-chateau-green-50 phone:w-1/2">
            A{children}
        </div>
    )
}

export default CorrectAnswer
