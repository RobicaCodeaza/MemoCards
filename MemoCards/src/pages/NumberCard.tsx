import { PropsWithChildren } from 'react'

function NumberCard({ children }: PropsWithChildren) {
    return (
        <div className="rounded bg-neon-carrot-400 px-2 py-1 text-center text-neon-carrot-50">
            Q{children}
        </div>
    )
}

export default NumberCard
