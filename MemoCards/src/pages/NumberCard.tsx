import { PropsWithChildren } from 'react'

function NumberQuestion({ children }: PropsWithChildren) {
    return (
        <div className="rounded bg-neon-carrot-400 px-2 py-2 text-center text-neon-carrot-50">
            Q{children}
        </div>
    )
}

export default NumberQuestion
