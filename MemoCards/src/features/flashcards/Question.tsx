import { PropsWithChildren } from 'react'

function Question({ children }: PropsWithChildren) {
    return (
        <div className="text-wrap break-words text-center text-[1.5rem]">
            {children}
        </div>
    )
}

export default Question
