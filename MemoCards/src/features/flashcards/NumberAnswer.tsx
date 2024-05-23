import { PropsWithChildren } from 'react'

function NumberAnswer({ children }: PropsWithChildren) {
    return (
        <div className="rounded border border-picton-blue-500  bg-picton-blue-50 px-2 py-2 text-center text-picton-blue-500">
            A{children}
        </div>
    )
}

export default NumberAnswer
