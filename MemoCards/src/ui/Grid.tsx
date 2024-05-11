import { type ReactNode } from 'react'

type GridProps = {
    children: ReactNode
}

function Grid({ children }: GridProps) {
    return (
        <div className="grid-cols-1 grid min-h-max grid-rows-decks gap-16  phone:grid phone:grid-cols-decks">
            {children}
        </div>
    )
}

export default Grid
