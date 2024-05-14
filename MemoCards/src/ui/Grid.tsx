import { type ReactNode } from 'react'

type GridProps = {
    children: ReactNode
}

function Grid({ children }: GridProps) {
    return (
        <div className="grid grid-rows-decks  justify-center gap-16   phone:grid-cols-decks">
            {children}
        </div>
    )
}

export default Grid
