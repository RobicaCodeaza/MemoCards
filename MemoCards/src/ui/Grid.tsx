import { type ReactNode } from 'react'

type GridProps = {
    children: ReactNode
}

function Grid({ children }: GridProps) {
    return (
        <div className="phone:grid-cols-decks grid-rows-decks grid grid-cols-1 gap-14 phone:grid">
            {children}
        </div>
    )
}

export default Grid
