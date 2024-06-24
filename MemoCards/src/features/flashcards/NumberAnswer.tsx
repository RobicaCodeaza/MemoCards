import { PropsWithChildren } from 'react'

function NumberAnswer({ children }: PropsWithChildren) {
    return (
        <div className="self-center rounded border-l border-r bg-picton-blue-50   px-2 py-2 text-center text-picton-blue-500 phone:self-start">
            A{children}
        </div>
    )
}

export default NumberAnswer
