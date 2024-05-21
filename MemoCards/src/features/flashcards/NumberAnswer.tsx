import { PropsWithChildren } from 'react'

function NumberAnswer({ children }: PropsWithChildren) {
    return (
        <div className="rounded  bg-picton-blue-400 px-2 py-1 text-center text-picton-blue-50">
            A{children}
        </div>
    )
}

export default NumberAnswer
